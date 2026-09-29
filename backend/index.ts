import { router, json } from '@appdeploy/sdk';
import { appRoutes } from './routes';
import { workflowRoutes } from './workflows';
import { creativeRoutes } from './creative';
import { adminOpsRoutes } from './admin-ops';
import { rapidPayRoutes } from './rapid-pay';
import { doorDashRoutes } from './doordash';
import { platformV1Routes } from './platform-v1';
import { releaseGovernanceRoutes } from './release-governance';
import { runtimeKernelRoutes } from './runtime-kernel';
import { verificationRoutes } from './verification';
import { homeEngagementRoutes } from './home-engagement';
import { platformBlueprintRoutes } from './platform-blueprint';
import { runRuntimeDispatch, runRuntimeReconciliation, runDeadLetterSweep } from './runtime-workers';
import { runCredentialSweep } from './credential-sweep';

import { notifySubscribers, realtimeSubscriptionRoutes } from "./realtime-subscribers";

export const handler = router({
    'GET /api/_healthcheck': [async () => json({ message: 'Success' })],

    ...appRoutes,
    ...workflowRoutes,
    ...creativeRoutes,
    ...adminOpsRoutes,
    ...rapidPayRoutes,
    ...doorDashRoutes,
    ...platformV1Routes,
    ...releaseGovernanceRoutes,
    ...runtimeKernelRoutes,
    ...verificationRoutes,
    ...homeEngagementRoutes,
    ...platformBlueprintRoutes,

    ...realtimeSubscriptionRoutes,
});

export const credentialSweepHandler = async () => { await runCredentialSweep(); return { statusCode: 200 }; };
export const runtimeDispatchHandler = async () => { await runRuntimeDispatch(); return { statusCode: 200 }; };
export const runtimeReconciliationHandler = async () => { await runRuntimeReconciliation(); return { statusCode: 200 }; };
export const runtimeDeadLetterHandler = async () => { await runDeadLetterSweep(); return { statusCode: 200 }; };