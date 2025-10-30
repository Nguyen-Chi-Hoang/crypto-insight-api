# Crypto Insight API
Node.js REST API that fetches cryptocurrency prices from CoinGecko, featuring Redis caching with auto-refresh, scheduled cron jobs, and monitoring via Prometheus and Grafana.

## Features
- Redis cache with auto-refresh
- Cron job for periodic updates
- Prometheus metrics endpoint (`/metrics`)
- Grafana visualization ready
- Rate limiting middleware

## Stack
Node.js, Express, Redis, Prometheus, Grafana

## Run locally
```bash
npm install
npm run dev
