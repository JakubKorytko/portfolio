# --- BUILD STAGE ---
FROM node:24-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

RUN mkdir -p .next/cache

# --- PRODUCTION STAGE ---
FROM gcr.io/distroless/nodejs24-debian13 AS runner
WORKDIR /app

USER nonroot

ARG NODE_ENV="production"
ARG PORT="3000"

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nodejs /app/.next/cache ./.next/cache

CMD ["server.js"]