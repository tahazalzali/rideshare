# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY libs ./libs
COPY services ./services
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm run build -w services/pricing-service

# Runtime stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/services/pricing-service/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3011
CMD ["node", "dist/main.js"]
