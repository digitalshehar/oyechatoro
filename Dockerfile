# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Copy source and build
COPY . .
# Use dummy URL for build-time prisma generation so it doesn't try to connect to Neon
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate && npx next build --webpack

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js ./server.js
# COPY --from=builder /app/auth.ts ./auth.ts # auth.ts is usually compiled into .next or used by server.js if it's ESM
COPY --from=builder /app/prisma ./prisma

# Expose port and start
EXPOSE 3000

# Railway will inject the DATABASE_URL and PORT
CMD ["node", "server.js"]
