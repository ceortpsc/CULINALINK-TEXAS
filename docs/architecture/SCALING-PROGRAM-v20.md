# CulinaLinkTX Architecture Program v20

## Objective
Launch with a modular monolith, add durable workflow orchestration, then extract services and event infrastructure only when measured scale or fault-isolation needs justify it.

## Stage 1 — Launch
Stack: Next.js + Go modular backend + PostgreSQL/PostGIS + Redis.

- Next.js Pages Router remains the web client.
- One Go API binary owns modular domains: identity, provider, customer, catalog, search, booking, order, payment, payout, delivery, support, compliance, analytics and audit.
- PostgreSQL is authoritative for durable marketplace state.
- PostGIS owns service zones, radius search, geofencing and distance queries.
- Redis is limited to ephemeral caching, rate limits, locks, idempotency windows and queue coordination.

## Stage 2 — Operational maturity
Add Temporal for booking, payout, fulfillment and refund/reconciliation workflows. Temporal orchestrates; PostgreSQL remains the business record. Every activity must be idempotent or have a compensating action.

## Stage 3 — Growing traffic
Extract dispatch, notifications and payments into independently deployable Go services only after stable contracts, service-level objectives, schema ownership and a documented failure-isolation reason exist.

## Stage 4 — Major scale
Add Redpanda for domain-event fanout, Kubernetes for independent scaling and rollout control, and Rust only for measured CPU/latency hotspots such as route optimization, geospatial ranking or high-volume transforms.

## Promotion gates
Promotion requires evidence such as sustained CPU/memory pressure, p95/p99 latency breach, queue lag, database contention, independent scaling need, fault-domain isolation requirement, deployment bottleneck or measured cost benefit.
