import { db } from '@appdeploy/sdk';
import { runVerificationSweep } from './verification';
import { runSelfHealingSweep } from './self-healing';

export async function runCredentialSweep() {
    const { items } = await db.list<{ status: string; expiresAt?: string | null; expirationDate?: string | null }>('credential_registry', { limit: 100 });
    const timestamp = Date.now();
    for (const item of items) {
        const expiry = item.expiresAt || item.expirationDate;
        if (item.status === 'VERIFIED' && expiry && new Date(expiry).getTime() < timestamp) {
            await db.update('credential_registry', [{ id: item.id, record: { ...item, status: 'EXPIRED', expiredAt: new Date().toISOString() } }]);
        }
    }
    await runVerificationSweep();
    await runSelfHealingSweep();
}
