#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 NestJS Rideshare - Development Startup${NC}"
echo ""

# Function to check if a service is needed
check_service() {
    if [ "$1" = "all" ]; then
        return 0
    fi
    for service in "${@:2}"; do
        if [ "$service" = "$1" ]; then
            return 0
        fi
    done
    return 1
}

# Parse command line arguments
SERVICES_TO_START="${@:-all}"

echo -e "${BLUE}Starting infrastructure...${NC}"
docker-compose up -d rabbitmq postgres-passenger postgres-driver postgres-trip postgres-payment

echo ""
echo -e "${BLUE}Waiting for infrastructure...${NC}"
sleep 3

echo ""
echo -e "${GREEN}Starting services...${NC}"

# Start services based on arguments
if [ "$SERVICES_TO_START" = "all" ]; then
    echo "Starting all services..."
    pnpm --filter notification-service run start:dev &
    pnpm --filter passenger-service run start:dev &
    pnpm --filter driver-service run start:dev &
    pnpm --filter trip-service run start:dev &
    pnpm --filter payment-service run start:dev &
    pnpm --filter pricing-service run start:dev &
    pnpm --filter api-gateway run start:dev &
else
    for service in $SERVICES_TO_START; do
        echo "Starting $service..."
        pnpm --filter $service run start:dev &
    done
fi

echo ""
echo -e "${GREEN}✅ All services are starting up!${NC}"
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"
echo ""

# Wait for all background processes
wait
