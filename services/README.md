# Service extraction boundaries

The launch system begins as one Go deployable with modular packages. These directories define future extraction boundaries only after measured need:

- `dispatch-service`: delivery quotes, driver dispatch adapter orchestration, tracking normalization.
- `notification-service`: email/SMS/push delivery, preference enforcement, retries and provider health.
- `payment-service`: authorization, capture, refund, webhook reconciliation and payment audit.

Each extracted service must own a stable contract, independent SLO, failure-isolation case, idempotency rules, data ownership, observability and rollback strategy before production use.
