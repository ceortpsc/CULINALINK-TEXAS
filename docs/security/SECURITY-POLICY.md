# Security Policy

## Mandatory controls
HTTPS-only production; secure authentication; server-side authorization; least privilege; input validation; output encoding; secure headers; CSP/CSRF controls appropriate to architecture; rate limiting; login protections; encrypted transport; secret management; dependency/secret scanning; verified webhooks; safe uploads; audit logging; session expiration/revocation; privileged-user MFA capability; bounded queues; dead-letter handling; rollback discipline.

## Prohibited storage
Do not store raw passwords, card PAN/CVV, signing secrets, API secrets, full bank credentials or unrestricted sensitive identity values in ordinary application tables or logs.

## External integrations
Every external connector must define authentication, timeout, retry, idempotency, error normalization, webhook verification, sandbox/production separation, audit and circuit-breaker behavior.

## Self-healing
Self-healing is limited to bounded retry, health detection, reconciliation, quarantine, rollback recommendation and remediation tasks. Production code must never rewrite itself autonomously.
