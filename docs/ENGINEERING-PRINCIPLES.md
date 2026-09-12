# CulinaLinkTX Engineering Principles

1. CulinaLinkTX is the system of record for core marketplace identity and lifecycle data.
2. Use modular domain boundaries and adapter interfaces for external services.
3. External providers never become the only authoritative copy of marketplace records.
4. Server-side authorization is mandatory; hidden UI controls are not security.
5. Explicit state machines govern onboarding, booking, orders, delivery, verification, support and release promotion.
6. `SUBMITTED` never means `VERIFIED`; `QUEUED` never means `COMPLETED`.
7. No fake payment, payout, delivery, filing, credential or government-approval states.
8. Sensitive secrets remain outside source code and browser storage.
9. Financial calculations use deterministic authoritative values and preserve transaction-time components.
10. External/financial writes require idempotency and provider-reference discipline.
11. High-impact actions require authorization, reason, auditability and confirmation where appropriate.
12. Workers are bounded, observable, retry-aware and dead-letter capable.
13. Defined workers, scheduled workers and successful worker runs are separate truth states.
14. Migrations are explicit, backward-compatible where practical, and never silently destroy production data.
15. Privacy-by-default: private addresses, identity data and credentials are not exposed publicly.
16. Accessibility is an engineering requirement: semantic HTML, keyboard support, focus visibility, labels, contrast and reduced-motion support.
17. Responsive behavior is designed per form factor instead of merely shrinking desktop layouts.
18. Errors must be actionable without exposing secrets or raw production stack traces.
19. Release states remain distinct: drafted, coded, configured, staged, deployed, verified and externally approved.
20. Rollback of application code does not silently rewind production data.
21. Testing evidence must identify what actually executed; an unexecuted suite cannot be labeled passed.
22. Production readiness is evidence-based, not inferred from a green deployment alone.
