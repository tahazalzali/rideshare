# 📚 Documentation Hub - Quick Reference

## **View All Service Documentation in One Place**

### **Method 1: Open Documentation Hub (Recommended)**

```bash
# Open the beautiful docs hub in your browser
./open-docs.sh

# OR use pnpm
pnpm docs

# OR open directly
open docs-hub.html
```

The docs hub shows:
- ✅ All service documentation links
- ✅ Service status (Online/Offline)
- ✅ Infrastructure overview
- ✅ Quick command reference
- ✅ Beautiful UI with service cards

### **Method 2: Direct Swagger Links**

Once services are running, access individual Swagger docs:

- **API Gateway**: http://localhost:3000/docs
- **Pricing Service**: http://localhost:3011/docs
- **Trip Service**: (microservice - limited HTTP)
- **Passenger Service**: (microservice - limited HTTP)
- **Driver Service**: (microservice - limited HTTP)
- **Payment Service**: (microservice - limited HTTP)
- **Notification Service**: (microservice - limited HTTP)

### **Method 3: RabbitMQ Management**

View message queues and routing:
- **URL**: http://localhost:15672
- **Username**: `rabbitmq`
- **Password**: `rabbitmq`

## **Service Documentation Features**

### API Gateway Documentation
The main gateway provides complete REST API documentation with:
- Authentication endpoints
- Trip management
- Pricing estimates
- JWT Bearer auth testing

### Individual Service Docs
Each microservice has Swagger docs at `/docs` but most run on dynamic ports. Use the docs hub to access them easily!

## **Quick Start**

1. **Start all services:**
   ```bash
   pnpm start:all
   ```

2. **Open docs hub:**
   ```bash
   pnpm docs
   ```

3. **Access API Gateway docs:**
   - Navigate to http://localhost:3000/docs
   - Try the interactive API endpoints

4. **Monitor queues:**
   - Open http://localhost:15672
   - Login with rabbitmq/rabbitmq
   - View queue activity

## **API Testing from Docs Hub**

The docs hub provides:
1. One-click access to all service documentation
2. Live service status indicators
3. Quick command copy/paste
4. Links to infrastructure management
5. Beautiful, responsive UI

## **Documentation Structure**

```
docs-hub.html           # Main documentation hub (START HERE!)
├── Service Cards       # Links to each service's Swagger docs
├── Infrastructure      # RabbitMQ, PostgreSQL info
├── Commands            # Copy/paste commands
└── Status Indicators   # Real-time service status
```

## **Tips**

- 💡 Keep the docs hub open while developing
- 💡 It auto-refreshes service status every 30 seconds
- 💡 Click commands to copy them to clipboard
- 💡 Use API Gateway docs for end-to-end testing
- 💡 Use RabbitMQ UI to debug message flow

## **Troubleshooting**

**Docs hub not opening?**
```bash
# Open manually in browser
open docs-hub.html

# Or navigate to file path
file:///Users/daniel/Downloads/nest-rideshare/docs-hub.html
```

**Services showing offline?**
```bash
# Start all services
pnpm start:all

# Wait a few seconds, then refresh docs hub
```

**Swagger docs not loading?**
```bash
# Ensure service is running on correct port
# API Gateway should be on port 3000
# Pricing Service should be on port 3011
```

---

## Passenger Service API (Internal)

Even though the passenger service is primarily a microservice behind the scenes, it now exposes a tiny HTTP surface for ops/testing plus mirrored RMQ patterns. All endpoints live under `http://<passenger-host>:3002/internal/passengers` by default.

### HTTP Endpoints
- `POST /internal/passengers` – create a passenger `{ "name": "Alice Example", "email": "alice@example.com" }`
- `GET /internal/passengers` – list the most recent 100 passengers, optional `?search=<name-or-email>`
- `GET /internal/passengers/:id` – fetch a single passenger or 404 if missing

Example:
```bash
curl -X POST http://localhost:3002/internal/passengers \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice Example","email":"alice@example.com"}'

curl "http://localhost:3002/internal/passengers?search=alice"
```

### RMQ Patterns
- `PATTERNS.PASSENGER.CREATE` – payload `{ name, email }`, returns the persisted passenger object
- `PATTERNS.PASSENGER.GET` – payload is the passenger UUID, returns the passenger or `null`

Use these from other services via `ClientProxy#send` the same way the trip service patterns are consumed.

---

## Pricing Service API (Internal)

Pricing exposes a minimal HTTP surface (handy for the gateway’s circuit breaker) and the matching RMQ RPC so the trip service can stay asynchronous.

### HTTP Endpoints (port 3011)
- `GET /internal/estimate` – legacy path kept for compatibility, returns a quote
- `GET /internal/pricing/estimate` – same as above, but namespaced; add `serviceLevel=standard|premium|xl`
- `GET /internal/pricing/config` – introspect the fare tables so operators can verify multipliers

Example:
```bash
curl "http://localhost:3011/internal/pricing/estimate?pickupLat=37.77&pickupLng=-122.42&dropoffLat=37.78&dropoffLng=-122.41&serviceLevel=premium"

curl http://localhost:3011/internal/pricing/config | jq .
```

### RMQ Pattern
- `PATTERNS.PRICING.ESTIMATE` – payload compatible with `EstimatePriceDto`, returns `{ currency, amount, serviceLevel, surgeMultiplier, breakdown }`

Both the API Gateway and Trip Service already use this pattern; richer fields are now populated without breaking consumers that only read `amount`/`currency`.

---

## API Gateway REST (Port 3000)

All public traffic lands on the API Gateway (`http://localhost:3000`). Remember every call is namespaced under `/api` and requires a JWT (`Authorization: Bearer <token>`).

### Passenger Endpoints
- `POST /api/v1/passengers` (Admin) – creates a passenger profile and fans out to the passenger microservice
- `GET /api/v1/passengers?search=<term>` (Admin) – lightweight directory with optional fuzzy search
- `GET /api/v1/passengers/:id` – fetch a passenger; available to Passenger/Driver/Admin roles

### Pricing Endpoint
- `GET /api/v1/pricing/estimate?pickupLat=...&pickupLng=...&dropoffLat=...&dropoffLng=...&serviceLevel=premium`

### Notification Endpoint
- `POST /api/v1/notifications` (Admin) – sends a message `{ "to": "user@email", "message": "..." }` via the notification microservice (currently logs)

Example auth flow:
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"pass"}' | jq -r .access_token)

curl http://localhost:3000/api/v1/passengers \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice Example","email":"alice@example.com"}'
```

---

**Pro Tip:** Bookmark `file:///Users/daniel/Downloads/nest-rideshare/docs-hub.html` in your browser for instant access! 🚀
