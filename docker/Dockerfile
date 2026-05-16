FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9
WORKDIR /app

# ─── Dependencies ───────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ─── Dev (hot-reload) ───────────────────────────────────────────────────────────
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
CMD ["pnpm", "dev"]

# ─── Builder ────────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
# Stubs only used during `next build` prerender (when Payload initialises but
# never actually connects). Render overrides them at runtime with the real
# values. Do not hard-code real secrets here.
ENV PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime
ENV DATABASE_URI=postgres://build:build@localhost:5432/build
ENV NEXT_PUBLIC_SITE_URL=https://newindiagovernment.com
ENV PAYLOAD_PUBLIC_SERVER_URL=https://newindiagovernment.com
RUN pnpm build

# ─── Production runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
# Bind to all interfaces — Next.js standalone defaults HOSTNAME to
# "localhost" which leaves the container unreachable from Render's
# proxy (different network namespace).
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
