#!/bin/bash

# Start all infrastructure
echo "Starting infrastructure (RabbitMQ & Databases)..."
docker-compose up -d rabbitmq postgres-passenger postgres-driver postgres-trip postgres-payment

echo "Waiting for infrastructure to be ready..."
sleep 5

# Start all services in parallel using pnpm
echo "Starting all services..."
pnpm --parallel --filter './services/*' run start:dev
