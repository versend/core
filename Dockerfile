FROM oven/bun:1.4.2
WORKDIR /app

COPY . .
RUN bun install --frozen-lockfile

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/health'); if (!r.ok) process.exit(1)"

WORKDIR /app/apps/api
CMD ["bun", "--bun", "varlock", "run", "--", "bun", "src/index.ts"]
