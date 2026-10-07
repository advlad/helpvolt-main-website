# Multi-Stage Dockerfile for VoltPulse Energy Trading Platform
# Includes Node.js 20 runtime and Python 3 for secure backend mathematical execution.

# --- 1. Base Image with Node.js and Python 3 ---
FROM node:20-alpine AS base
RUN apk add --no-cache python3 libc6-compat

# --- 2. Dependencies Stage ---
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./
RUN npm install

# --- 3. Build Stage ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# --- 4. Production Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

# Install Python 3 in runtime environment for child_process calculations
RUN apk add --no-cache python3 bash

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root system user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build and public assets
COPY --from=builder /app/public ./public

# Next.js standalone folder output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Python calculation scripts strictly for server-side execution
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
RUN chmod +x ./scripts/calculate_sum.py

USER nextjs

EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]
