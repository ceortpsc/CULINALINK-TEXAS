import { db, error, json, requireAuth } from '@appdeploy/sdk';

type DataMap = Record<string, unknown>;
type PrivacyRequest = { type: string; details: string; status: string; createdAt: string; updatedAt: string };
type Consent = { consentType: string; accepted: boolean; policyVersion: string; source: string; recordedAt: string };

const requestTypes = ['ACCESS', 'CORRECTION', 'DELETION', 'PORTABILITY', 'OPT_OUT', 'APPEAL'];
const now = () => new Date().toISOString();

const registry = {
    policyVersion: '2026-09-12',
    controller: 'CulinaLinkTX / Ross Tax Pro Software Co.',
    homeMarket: 'Killeen, Texas',
    principles: [
        'Collect only data adequate, relevant and reasonably necessary for disclosed purposes.',
        'Separate public marketplace data from private account, compliance and financial records.',
        'Do not store raw card data, passwords, signing secrets, or full SSN/TIN values in ordinary marketplace records.',
        'Use encrypted transport and platform-managed storage controls.',
        'Retain data according to operational, tax, dispute, fraud-prevention, audit and legal requirements.',
        'Delete or deidentify eligible data after approved deletion/retention review.',
        'Treat external processors as adapters; CulinaLinkTX remains system of record for marketplace lifecycle data.',
    ],
    categories: [
        { id: 'ACCOUNT', examples: ['name', 'email', 'account identifier'], purpose: 'authentication, account administration and support', sensitivity: 'PERSONAL' },
        { id: 'CONTACT', examples: ['phone', 'service address'], purpose: 'booking, delivery and support', sensitivity: 'PERSONAL' },
        { id: 'PROVIDER', examples: ['business profile', 'services', 'portfolio', 'compliance metadata'], purpose: 'provider marketplace operations', sensitivity: 'MIXED_PUBLIC_PRIVATE' },
        { id: 'COMMERCE', examples: ['orders', 'bookings', 'fees', 'refund metadata'], purpose: 'marketplace transactions and records', sensitivity: 'PRIVATE' },
        { id: 'FULFILLMENT', examples: ['pickup/dropoff address', 'delivery status'], purpose: 'fulfillment and delivery', sensitivity: 'PRIVATE' },
        { id: 'SUPPORT', examples: ['tickets', 'messages', 'attachments'], purpose: 'customer/provider support', sensitivity: 'PRIVATE' },
        { id: 'SECURITY', examples: ['request IDs', 'audit events', 'security events'], purpose: 'fraud prevention, security and audit', sensitivity: 'RESTRICTED' },
        { id: 'AI_CONTENT', examples: ['prompts', 'generated campaign drafts', 'generated images'], purpose: 'requested AI-assisted features', sensitivity: 'USER_CONTROLLED' },
    ],
    rights: requestTypes,
    retentionClasses: [
        { id: 'ACCOUNT_ACTIVE', rule: 'Retain while the account is active and as needed for legitimate operations.' },
        { id: 'FINANCIAL_AUDIT', rule: 'Retain according to applicable tax, accounting, dispute and audit obligations.' },
        { id: 'SUPPORT', rule: 'Retain long enough to resolve and audit support outcomes, then archive/delete under policy.' },
        { id: 'SECURITY', rule: 'Retain security/audit evidence according to incident, fraud-prevention and legal needs.' },
        { id: 'AI_DRAFT', rule: 'User-created AI drafts remain user-scoped until deleted or retention policy applies.' },
    ],
    productionSeedRule: 'REFERENCE_CONFIGURATION_ONLY',
    syntheticOperationalDataAllowed: false,
};

export const dataGovernanceRoutes = {
    'GET /api/v1/privacy/registry': [async () => json({ data: registry, meta: { legalReviewRequired: true }, error: null })],
    'GET /api/v1/privacy/requests': [requireAuth(), async ctx => json({ data: (await db.list<PrivacyRequest>(`privacy_requests:${ctx.user!.userId}`, { limit: 50 })).items, meta: {}, error: null })],
    'POST /api/v1/privacy/requests': [requireAuth(), async ctx => {
        const body = (ctx.body || {}) as DataMap;
        const type = String(body.type || '').toUpperCase();
        const details = String(body.details || '').trim();
        if (!requestTypes.includes(type)) return error('privacy_request_type_invalid', 400);
        if (details.length > 2000) return error('privacy_request_details_too_long', 413);
        const record: PrivacyRequest = { type, details, status: 'OPEN_REVIEW', createdAt: now(), updatedAt: now() };
        const [id] = await db.add(`privacy_requests:${ctx.user!.userId}`, [record]);
        if (!id) return error('privacy_request_create_failed', 500);
        return json({ data: { ...record, id }, meta: { automaticDeletionPerformed: false }, error: null }, 201);
    }],
    'GET /api/v1/privacy/consents': [requireAuth(), async ctx => json({ data: (await db.list<Consent>(`consents:${ctx.user!.userId}`, { limit: 100 })).items, meta: {}, error: null })],
    'POST /api/v1/privacy/consents': [requireAuth(), async ctx => {
        const body = (ctx.body || {}) as DataMap;
        const consentType = String(body.consentType || '').trim().toUpperCase();
        const policyVersion = String(body.policyVersion || registry.policyVersion).trim();
        if (!consentType) return error('consent_type_required', 400);
        const record: Consent = { consentType, accepted: body.accepted === true, policyVersion, source: 'CULINALINKTX_ACCOUNT', recordedAt: now() };
        const [id] = await db.add(`consents:${ctx.user!.userId}`, [record]);
        if (!id) return error('consent_record_failed', 500);
        return json({ data: { ...record, id }, meta: {}, error: null }, 201);
    }],
};
