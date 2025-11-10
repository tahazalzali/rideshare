# NestJS Ride‑Sharing Microservices (DDD + RMQ + JWT + OpenTelemetry)

This repository is a production‑quality starter for a real‑time ride‑sharing platform using **NestJS**, **TypeScript**, **RabbitMQ**, and **PostgreSQL**. It implements microservice boundaries, DDD layers, saga orchestration, circuit breaker for synchronous calls, comprehensive validation & security, Swagger docs per service, Docker/Kubernetes deploy artifacts, and CI/CD.

---

## Architecture Overview

**Services (bounded contexts):**
- **API Gateway** – JWT auth, RBAC, rate limiting, request validation, OpenAPI aggregation and synchronous pricing endpoint via a circuit breaker.
- **Passenger Service** – Passenger aggregate.
- **Driver Service** – Driver availability and assignment.
- **Pricing Service** – Price estimation (distance based).
- **Payment Service** – Payment authorization / capture / release.
- **Trip Service** – Trip aggregate + **Saga orchestrator** for booking flow.
- **Notification Service** – Event consumer (e.g., email/push placeholder).

**Inter‑service communication:** RMQ RPC/event via `@nestjs/microservices`. Message patterns are centralized under `libs/common/src/patterns.ts`.

**Resilience:**
- **Saga:** Trip booking orchestrates `Pricing -> Payment.authorize -> Driver.assign`; compensates by `Payment.release` if driver unavailable.
- **Circuit Breaker:** API Gateway uses `opossum` wrapping an HTTP call to Pricing (`/internal/pricing/estimate`, with `/internal/estimate` kept for backwards compatibility) as a sync fallback.

**Security:** JWT auth at the gateway, RBAC guard (`RolesGuard`), input validation and sanitization via `class-validator` + global whitelist `ValidationPipe`, basic rate limiting via `@nestjs/throttler`.

**Observability:** OpenTelemetry bootstrap (`libs/common/src/observability/tracing.ts`) and Prometheus metrics endpoint (`/metrics`) on the gateway. Extend to other services as required.

**DDD layering:** Each service separates **domain** (entities), **application/services** and **infrastructure** (repositories, transport). For brevity some layers are compacted but the boundaries are clear.

---

## Getting Started (Local Dev)

1. **Prereqs:** Node 20+, Docker, Docker Compose.
2. **Install deps (pnpm):**
   ```bash
   corepack enable
   pnpm install --frozen-lockfile
   ```
3. **Run locally with Docker Compose (requires Docker Desktop):**
   ```bash
   docker compose up --build
   ```
   - Gateway Swagger: http://localhost:3000/docs
   - Pricing Swagger: http://localhost:3011/docs
   - RabbitMQ UI: http://localhost:15672 (user/pass: rabbitmq / rabbitmq)

4. **Create a user and obtain a token:**
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/register      -H 'Content-Type: application/json'      -d '{"email":"alice@example.com","password":"pass","roles":["Passenger"]}'

   TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login      -H 'Content-Type: application/json'      -d '{"email":"alice@example.com","password":"pass"}' | jq -r .access_token)
   ```

5. **Estimate price (sync, HTTP with circuit breaker):**
   ```bash
   curl "http://localhost:3000/api/v1/pricing/estimate?pickupLat=37.77&pickupLng=-122.42&dropoffLat=37.78&dropoffLng=-122.41"
   ```

6. **Book a trip (Saga via RMQ):**
   ```bash
   curl -X POST http://localhost:3000/api/v1/trips      -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json"      -d '{"passengerId":"<UUID FROM REGISTER>", "pickupLat":37.77,"pickupLng":-122.42,"dropoffLat":37.78,"dropoffLng":-122.41}'
   ```

---

## Testing

- **Unit tests:** `npm run test:unit -w services/<service>`
- **Integration tests:** sample e2e tests are wired to use RabbitMQ; bring up the broker with `docker compose up -d rabbitmq` and then run `npm run test:e2e -w services/<service>`.

CI runs lint, build and unit tests on PRs. Extend with more e2e suites and coverage thresholds as needed.

---

## Configuration

All services consume environment variables via `@nestjs/config`. See `docker-compose.yml` for defaults. Key variables:
- `RABBITMQ_URI` (defaults to `amqp://rabbitmq:rabbitmq@localhost:5672` in dev; override when pointing at another broker)
- `QUEUE_*` per service
- `JWT_SECRET` (gateway)
- `DB_*` per service (PostgreSQL)
- `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` (optional)

---

## Kubernetes (manifests)

Sample manifests are placed under `k8s/` (Deployment/Service per component plus Ingress). Adjust images (GHCR) and secrets before applying.

---

## Notes on Production Hardening

- Replace `synchronize: true` with migrations.
- Add proper password hashing (argon2/bcrypt) and a dedicated Identity service.
- Extend OpenTelemetry (Metrics/Logs) and add an OTEL Collector + Prometheus + Tempo/Grafana.
- Replace demo Pricing with dynamic surge logic, and enrich Driver matching with geospatial queries.
- Add idempotency keys and an Outbox pattern for event publishing from DB transactions.
- Implement retries and DLQs for RMQ consumers.

---

## Project Layout

```
libs/common/                  # Shared building blocks (RMQ module, guards, DTOs, patterns)
services/
  api-gateway/                # JWT/RBAC, rate limiting, Swagger, circuit breaker for pricing HTTP
  passenger-service/          # Passenger domain + RMQ handlers
  driver-service/             # Driver availability + RMQ handlers
  pricing-service/            # Pricing (RPC + HTTP)
  payment-service/            # Payment authorization/capture/release
  trip-service/               # Trip aggregate + Saga orchestrator
  notification-service/       # Notification consumer
```

---

## License

MIT (for example usage). Production use requires your own review & compliance.
