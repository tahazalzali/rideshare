# 🚀 NestJS Rideshare - Quick Start Guide

## Methods to Run All Services

### **Method 1: Using Makefile (Recommended)**

```bash
# Start infrastructure and all services
make dev

# Start only infrastructure
make infra-up

# Start individual services
make dev-api
make dev-notification
make dev-passenger
make dev-driver
make dev-trip
make dev-payment
make dev-pricing

# View all available commands
make help

# Stop infrastructure
make infra-down
```

### **Method 2: Using Shell Script**

```bash
# Start all services
./dev.sh

# Or use the simpler version
./start-all.sh

# Start specific services
./dev.sh api-gateway trip-service pricing-service
```

### **Method 3: Using pnpm directly**

```bash
# Start infrastructure first
docker-compose up -d rabbitmq postgres-passenger postgres-driver postgres-trip postgres-payment

# Start all services in parallel
pnpm --parallel --filter './services/*' run start:dev

# Start specific service
pnpm --filter api-gateway run start:dev
pnpm --filter trip-service run start:dev
```

### **Method 4: Using Docker Compose**

```bash
# Start everything (infrastructure + services)
docker-compose up

# Start in background
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f
```

## 📋 Services Overview

| Service | Port | Database Port | Queue |
|---------|------|---------------|-------|
| API Gateway | Dynamic | - | - |
| Notification Service | Dynamic | - | notification_queue |
| Passenger Service | Dynamic | 5433 | passenger_queue |
| Driver Service | Dynamic | 5434 | driver_queue |
| Trip Service | Dynamic | 5435 | trip_queue |
| Payment Service | Dynamic | 5436 | payment_queue |
| Pricing Service | Dynamic | - | pricing_queue |
| RabbitMQ | 5672 | - | - |
| RabbitMQ Management | 15672 | - | - |

## 🎯 API Endpoints (via API Gateway)

### Authentication
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Register

### Trips
- `POST /api/v1/trips` - Create a trip
- `GET /api/v1/trips/:id` - Get trip details

### Pricing
- `GET /api/pricing/estimate` - Get pricing estimate

## 🔍 Monitoring

### RabbitMQ Management UI
- URL: http://localhost:15672
- Username: `rabbitmq`
- Password: `rabbitmq`

### Service Documentation (Swagger)
Each service has Swagger docs at `/docs` endpoint (when HTTP server is enabled)

## 🛠️ Development Commands

```bash
# Install dependencies
pnpm install
# or
make install

# Build all services
pnpm build
# or
make build

# Run tests
pnpm test
# or
make test

# Lint code
pnpm lint
# or
make lint

# Format code
pnpm format
# or
make format

# Clean project
make clean
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if databases are running
docker ps | grep postgres

# Start specific database
docker start nest-rideshare-postgres-passenger-1
docker start nest-rideshare-postgres-driver-1
docker start nest-rideshare-postgres-trip-1
docker start nest-rideshare-postgres-payment-1
```

### RabbitMQ Connection Issues
```bash
# Check if RabbitMQ is running
docker ps | grep rabbitmq

# Restart RabbitMQ
docker restart rabbitmq
```

### Port Conflicts
```bash
# Check what's using a port
lsof -i :5672
lsof -i :5433

# Kill process on a port
kill -9 <PID>
```

## 📝 Environment Variables

Each service has its own `.env` file in its directory:
- `services/passenger-service/.env`
- `services/driver-service/.env`
- `services/trip-service/.env`
- etc.

Main environment variables:
- `RABBITMQ_URI` - RabbitMQ connection string
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USER` - Database username
- `DB_PASS` - Database password
- `DB_NAME` - Database name
- `QUEUE_*` - Queue names for each service

## 🎉 Quick Start Example

```bash
# 1. Clone and install
pnpm install

# 2. Start everything
make dev

# 3. Test the API
curl http://localhost:3000/api/v1/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 4. Stop when done (Ctrl+C, then):
make infra-down
```
