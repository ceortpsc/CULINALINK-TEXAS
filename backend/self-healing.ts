import { db, json } from '@appdeploy/sdk';

type Job = { ownerUserId: string; kind: string; status: string; attempts: number; createdAt: string; nextAttemptAt?: string; lastError?: string };
type Recovery = { runAt: string; inspected: number; retryNudges: number; quarantined: number; blocked: number; state: string };
const now = () => new Date().toISOString();

export async function runSelfHealingSweep(): Promise<Recovery> {
    const { items } = await db.list<Job>('runtime_job_queue', { limit: 50 });
    let retryNudges = 0;
    let quarantined = 0;
    let blocked = 0;
    const current = Date.now();
    for (const job of items.slice(0, 40)) {
        if (job.status === 'QUEUED' && job.attempts < 3) {
            const next = job.nextAttemptAt ? new Date(job.nextAttemptAt).getTime() : 0;
            const age = current - new Date(job.createdAt).getTime();
            if (age > 6 * 60 * 60 * 1000 && (!next || next > current + 60 * 60 * 1000)) {
                await db.update('runtime_job_queue', [{ id: job.id, record: { ...job, nextAttemptAt: now(), lastError: job.lastError || 'Self-healing retry window reopened after stalled queue detection.' } }]);
                retryNudges++;
            }
        }
        if (job.status === 'DEAD_LETTER') quarantined++;
        if (job.status === 'BLOCKED_HANDLER_REQUIRED') blocked++;
    }
    const state = quarantined || blocked ? 'DEGRADED_REVIEW_REQUIRED' : 'HEALTHY';
    const record: Recovery = { runAt: now(), inspected: items.length, retryNudges, quarantined, blocked, state };
    await db.add('self_healing_runs', [record]);
    if (quarantined || blocked) await db.add('system_recovery_events', [{ ...record, action: 'REVIEW_REQUIRED', source: 'SELF_HEALING_SWEEP' }]);
    return record;
}

export const selfHealingRoutes = {
    'GET /api/v1/operations/self-healing': [async () => {
        const latest = (await db.list<Recovery>('self_healing_runs', { limit: 10 })).items.sort((a, b) => String(b.runAt).localeCompare(String(a.runAt)))[0] || null;
        return json({ data: { latest, policy: { sourceRewriteAllowed: false, automaticExternalExecutionAllowed: false, boundedRetryAllowed: true, deadLetterAutoReplayAllowed: false, rollbackRequiresReleasePolicy: true } }, meta: { mode: 'PRODUCTION_LIVE' }, error: null });
    }],
};
