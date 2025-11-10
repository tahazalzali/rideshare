# Copilot / AI assistant instructions for this repo

This file contains concise, actionable guidance to help an AI coding agent be immediately productive in this NestJS microservices repository.

**Big Picture:**
- **Architecture:** A set of small NestJS services (API Gateway, passenger, driver, pricing, payment, trip, notification) organized as pnpm workspaces under `services/` and shared code in `libs/common/`.
- **Communication:** Services communicate via RabbitMQ (RPC/events) using shared message patterns in `libs/common/src/patterns.ts`.
- **Saga & Resilience:** The `trip-service` contains a Saga orchestrator coordinating pricing/payment/driver assignment; API Gateway uses a circuit breaker (pricing HTTP sync fallback).

**Where to look first (key files):**
- `README.md` — project overview, local dev steps, and endpoints (quick orientation).
- `Makefile` & top-level `package.json` — canonical developer commands (`make dev`, `pnpm run start:all`, `pnpm --filter ... run start:dev`).
- `libs/common/` — DTOs, RMQ helpers, patterns, observability & shared guards (`libs/common/src/patterns.ts`, `libs/common/src/observability/tracing.ts`).
- `services/*/src/app.module.ts` and `services/*/src/main.ts` — service wiring, config, and transport setup.

**Development workflows (explicit commands):**
- Install deps: `corepack enable && pnpm install --frozen-lockfile` (Node >= 20).  
- Start infra: `make infra-up` or `pnpm run infra:up` (starts RabbitMQ + Postgres containers defined in `docker-compose`).
- Start all services in dev mode: `make dev` or `pnpm run start:all`.  
- Start a single service (example): `pnpm --filter pricing-service run start:dev` or `make dev-pricing`.
- Run unit tests across workspace: `npm run test:unit -w` or for a single service: `npm --prefix services/trip-service run test:unit`.
- Run e2e tests: bring up RabbitMQ (`docker compose up -d rabbitmq`) then `npm run test:e2e -w services/<service>`.

**Project conventions and patterns (repo-specific):**
- DDD-like layout: each service separates `domain/`, `application` (services/use-cases) and `infra/` (repositories, transport). Follow existing folders when adding features.
- Centralized message patterns: add/modify RMQ patterns in `libs/common/src/patterns.ts` so all services share the same contract.
- DTOs and validation: use `libs/common/src/dto` shared DTOs and `class-validator`/`ValidationPipe` for request sanitization.
- Observability: use `libs/common/src/observability/tracing.ts` for OTEL initialization; metrics exposed on `/metrics` (API Gateway).
- Circuit-breaker endpoints: Pricing is exposed both via RPC and HTTP; API Gateway calls `/internal/pricing/estimate` (and `/internal/estimate` exists for compatibility). Prefer the internal route for sync calls.

**Adding a new service:**
1. Add a new folder under `services/` with a `package.json` and NestJS app.  
2. Ensure `workspaces` config includes `services/*` (already present).  
3. Expose any RMQ handlers and register message patterns from `libs/common`.  
4. Add docker-compose and k8s manifests when ready (`docker-compose`, `k8s/`).

**Editing cross-service contracts:**
- When changing message shapes, update the `libs/common` DTOs and `patterns.ts` first, then update consumers/producers in each service.
- Avoid breaking changes in patterns; if necessary, version patterns or add new pattern keys.

**Integration points & environment:**
- RabbitMQ URI and queues configured via env (see `docker-compose.yml` and `README.md` for defaults).  
- JWT auth is implemented at the Gateway — modifying auth requires updating gateway guards and possibly DTOs in `libs/common`.

**Examples to reference in PRs / fixes:**
- To trace an RMQ handler example: open `services/trip-service/src/transport/` and compare to patterns in `libs/common/src/patterns.ts`.  
- To add metrics or traces: copy OTEL bootstrap from `libs/common/src/observability/tracing.ts` into the new service `main.ts`.

**Testing & CI tips:**
- Unit tests are run per-workspace; use `-w` flags in scripts (see top-level `package.json`).  
- E2E tests rely on RabbitMQ; start only the broker in CI or local dev for faster e2e runs.

If anything above is unclear or you'd like a short example PR that demonstrates adding a new RMQ pattern + handler, tell me which service to modify and I'll draft the changes.
