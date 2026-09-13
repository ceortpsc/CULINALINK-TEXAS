# Self-Healing Operations Runbook

## Allowed automated recovery
- Re-open the retry window for a bounded stalled queue item that has not exhausted attempts.
- Record health/recovery evidence.
- Detect blocked handlers and dead letters.
- Create remediation/reconciliation events.

## Forbidden automated recovery
- Rewriting source code.
- Replaying dead-letter external financial or delivery operations without review.
- Changing permissions or secrets.
- Deleting audit/financial history.
- Marking an external operation complete without provider evidence.

## Incident path
Detect → classify → contain/circuit-break → bounded retry if safe → reconcile → quarantine if unresolved → create review item → restore known-good release if approved → validate health → document outcome.
