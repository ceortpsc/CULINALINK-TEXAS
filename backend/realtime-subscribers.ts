import { db, ws, json, error, requireAuth } from '@appdeploy/sdk';

const SUBSCRIPTIONS_TABLE = 'entity_subscriptions';
const PUBLIC_MARKET_ENTITY_TYPE = 'market';
const PUBLIC_MARKET_ENTITY_ID = 'texas-live';

export type SubscriptionRecord = {
    id: string;
    entity_type: string;
    entity_id: string;
    connection_id: string;
    owner_user_id?: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    created_at: number;
};

async function listSubscriptions(): Promise<SubscriptionRecord[]> {
    const { items } = await db.list<SubscriptionRecord>(SUBSCRIPTIONS_TABLE, { limit: 1000 });
    return items;
}

function validConnectionId(connectionId: string) {
    return connectionId.length >= 8 && connectionId.length <= 512;
}

async function ownsDelivery(userId: string, externalDeliveryId: string) {
    const { items } = await db.list<{ externalDeliveryId: string }>(`doordash_deliveries:${userId}`, { limit: 50 });
    return items.some(item => item.externalDeliveryId === externalDeliveryId);
}

export async function removeSubscriptionsByConnection(connectionId: string) {
    const items = await listSubscriptions();
    const matchIds = items
        .filter(item => item.connection_id === connectionId)
        .map(item => item.id);
    if (matchIds.length > 0) {
        await db.delete(SUBSCRIPTIONS_TABLE, matchIds);
    }
}

async function addSubscription(
    entityType: string,
    entityId: string,
    connectionId: string,
    visibility: 'PUBLIC' | 'PRIVATE',
    ownerUserId?: string,
) {
    const items = await listSubscriptions();
    const existing = items.find(item =>
        item.entity_type === entityType &&
        item.entity_id === entityId &&
        item.connection_id === connectionId &&
        item.owner_user_id === ownerUserId,
    );
    if (existing) return existing.id;
    const [id] = await db.add(SUBSCRIPTIONS_TABLE, [{
        entity_type: entityType,
        entity_id: entityId,
        connection_id: connectionId,
        owner_user_id: ownerUserId,
        visibility,
        created_at: Date.now(),
    }]);
    return id;
}

async function removeSubscriptions(
    entityType: string,
    entityId: string,
    connectionId: string,
    ownerUserId?: string,
) {
    const items = await listSubscriptions();
    const matchIds = items
        .filter(item =>
            item.entity_type === entityType &&
            item.entity_id === entityId &&
            item.connection_id === connectionId &&
            item.owner_user_id === ownerUserId,
        )
        .map(item => item.id);
    if (matchIds.length > 0) {
        await db.delete(SUBSCRIPTIONS_TABLE, matchIds);
    }
}

export async function notifySubscribers(
    entityType: string,
    entityId: string,
    payload: unknown,
    excludeConnectionId?: string,
) {
    const items = await listSubscriptions();
    const targets = items
        .filter(item => item.entity_type === entityType && item.entity_id === entityId)
        .map(item => item.connection_id)
        .filter(id => id !== excludeConnectionId);
    const targetConnectionIds = Array.from(new Set(targets));

    if (targetConnectionIds.length === 0) return;

    await ws.send(targetConnectionIds, {
        v: 1,
        type: 'entity.update',
        payload: {
            entity_type: entityType,
            entity_id: entityId,
            data: payload,
        },
    });
}

export const realtimeSubscriptionRoutes = {
    'POST /api/subscriptions/public': [
        async ({ body }) => {
            const { entity_type, entity_id, connection_id } = (body || {}) as Record<string, string>;
            if (!entity_type || !entity_id || !connection_id) {
                return error('entity_type, entity_id, connection_id are required');
            }
            if (!validConnectionId(connection_id)) return error('invalid_connection_id', 400);
            if (entity_type !== PUBLIC_MARKET_ENTITY_TYPE || entity_id !== PUBLIC_MARKET_ENTITY_ID) {
                return error('public_subscription_not_allowed', 403);
            }
            await addSubscription(entity_type, entity_id, connection_id, 'PUBLIC');
            return json({ ok: true, visibility: 'PUBLIC' });
        },
    ],
    'POST /api/subscriptions/public/remove': [
        async ({ body }) => {
            const { entity_type, entity_id, connection_id } = (body || {}) as Record<string, string>;
            if (!entity_type || !entity_id || !connection_id) {
                return error('entity_type, entity_id, connection_id are required');
            }
            if (entity_type !== PUBLIC_MARKET_ENTITY_TYPE || entity_id !== PUBLIC_MARKET_ENTITY_ID) {
                return error('public_subscription_not_allowed', 403);
            }
            await removeSubscriptions(entity_type, entity_id, connection_id);
            return json({ ok: true });
        },
    ],
    'POST /api/subscriptions': [
        requireAuth(),
        async ctx => {
            const { entity_type, entity_id, connection_id } = (ctx.body || {}) as Record<string, string>;
            if (!entity_type || !entity_id || !connection_id) {
                return error('entity_type, entity_id, connection_id are required');
            }
            if (!validConnectionId(connection_id)) return error('invalid_connection_id', 400);
            if (entity_type !== 'delivery') return error('private_subscription_type_not_allowed', 403);
            if (!(await ownsDelivery(ctx.user!.userId, entity_id))) return error('private_subscription_entity_not_owned', 403);
            await addSubscription(entity_type, entity_id, connection_id, 'PRIVATE', ctx.user!.userId);
            return json({ ok: true, visibility: 'PRIVATE' });
        },
    ],
    'POST /api/subscriptions/remove': [
        requireAuth(),
        async ctx => {
            const { entity_type, entity_id, connection_id } = (ctx.body || {}) as Record<string, string>;
            if (!entity_type || !entity_id || !connection_id) {
                return error('entity_type, entity_id, connection_id are required');
            }
            if (entity_type !== 'delivery') return error('private_subscription_type_not_allowed', 403);
            if (!(await ownsDelivery(ctx.user!.userId, entity_id))) return error('private_subscription_entity_not_owned', 403);
            await removeSubscriptions(entity_type, entity_id, connection_id, ctx.user!.userId);
            return json({ ok: true });
        },
    ],
};
