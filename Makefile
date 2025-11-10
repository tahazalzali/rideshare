.PHONY: help dev infra-up infra-down infra-logs clean install

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	pnpm install

infra-up: ## Start infrastructure (RabbitMQ & Databases)
	@echo "🚀 Starting infrastructure..."
	docker-compose up -d rabbitmq postgres-passenger postgres-driver postgres-trip postgres-payment
	@echo "✅ Infrastructure started!"

infra-down: ## Stop infrastructure
	@echo "⏹️  Stopping infrastructure..."
	docker-compose down
	@echo "✅ Infrastructure stopped!"

infra-logs: ## Show infrastructure logs
	docker-compose logs -f

dev: infra-up ## Start all services in development mode
	@echo "⏳ Waiting for infrastructure..."
	@sleep 3
	@echo "🏃 Starting all services..."
	pnpm --parallel --filter './services/*' run start:dev

dev-api: ## Start only API Gateway
	pnpm --filter api-gateway run start:dev

dev-notification: ## Start only Notification Service
	pnpm --filter notification-service run start:dev

dev-passenger: ## Start only Passenger Service
	pnpm --filter passenger-service run start:dev

dev-driver: ## Start only Driver Service
	pnpm --filter driver-service run start:dev

dev-trip: ## Start only Trip Service
	pnpm --filter trip-service run start:dev

dev-payment: ## Start only Payment Service
	pnpm --filter payment-service run start:dev

dev-pricing: ## Start only Pricing Service
	pnpm --filter pricing-service run start:dev

build: ## Build all services
	pnpm build

test: ## Run all tests
	pnpm test

test-unit: ## Run unit tests
	pnpm test:unit

test-e2e: ## Run e2e tests
	pnpm test:e2e

lint: ## Run linter
	pnpm lint

format: ## Format code
	pnpm format

clean: ## Clean node_modules and dist folders
	@echo "🧹 Cleaning..."
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	find . -name "dist" -type d -prune -exec rm -rf '{}' +
	@echo "✅ Cleaned!"
