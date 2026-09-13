# Engineering Directives v20

1. Drafted, queued, submitted, acknowledged, processing, completed, failed and reversed remain distinct states.
2. Roles, money, verification, workflow transitions and external dispatch are authorized server-side.
3. PostgreSQL remains the durable system of record; external providers are adapters.
4. Start modular; extract services only with evidence.
5. All write commands use idempotency keys and correlation IDs where applicable.
6. Use a transactional outbox for domain events; prohibit unsafe dual writes.
7. Version HTTP, Temporal and event contracts for rolling compatibility.
8. Enforce least privilege across databases, topics, secrets and service identities.
9. Keep secrets out of source, logs, screenshots, fixtures and client bundles.
10. Financial history is immutable; corrections use compensating ledger entries.
11. Minimize PII and enforce retention/deletion policy.
12. Every request, workflow and job carries correlation and observable result state.
13. Remote dependencies require timeouts, classified retries, jitter, circuit breakers and bulkheads.
14. Dead letters are reviewable and never silently discarded.
15. Schema changes use expand/contract migration discipline.
16. Release evidence includes unit, integration, contract, E2E, accessibility, security and performance evidence as applicable.
17. Progressive delivery follows preview/staging, canary and production gates.
18. High-risk actions require authority, reason, audit and confirmation.
