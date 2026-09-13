export type RouteItem = { id: string; label: string; href: string; group: 'marketplace' | 'customer' | 'provider' | 'operations' | 'company'; description: string };
export const primaryRoutes: RouteItem[] = [
    { id: 'discover', label: 'Discover', href: 'discover/', group: 'marketplace', description: 'Search culinary professionals by distance, availability and specialty.' },
    { id: 'chefs', label: 'Chefs', href: 'chefs/', group: 'marketplace', description: 'Browse personal chefs and culinary professionals.' },
    { id: 'food', label: 'Food', href: 'food/', group: 'marketplace', description: 'Browse prepared meals, meal prep, baking and catering.' },
    { id: 'services', label: 'Services', href: 'services/', group: 'marketplace', description: 'Book culinary services and custom work.' },
    { id: 'orders', label: 'Orders', href: 'orders/', group: 'customer', description: 'Track bookings, orders and delivery activity.' },
    { id: 'business', label: 'Business', href: 'business/', group: 'company', description: 'Culinary staffing, catering and business requests.' },
];
export const moreRoutes: RouteItem[] = [
    { id: 'favorites', label: 'Favorites', href: 'favorites/', group: 'customer', description: 'Saved culinary professionals.' },
    { id: 'verified', label: 'Verified Professionals', href: 'verified-professionals/', group: 'marketplace', description: 'Verification membership, badge meaning, current status and renewal.' },
    { id: 'delivery', label: 'Pickup & Delivery', href: 'delivery/', group: 'customer', description: 'Pickup, provider delivery and DoorDash Drive where available.' },
    { id: 'gigs', label: 'Post a Gig', href: 'gigs/', group: 'customer', description: 'Create or browse culinary gigs.' },
    { id: 'provider', label: 'Provider Onboarding', href: 'onboarding/', group: 'provider', description: 'Apply and configure a culinary provider profile.' },
    { id: 'rapid-pay', label: 'Rapid Pay', href: 'rapid-pay/', group: 'provider', description: 'Contractor payout-card enrollment and status.' },
    { id: 'admin', label: 'Admin Ops', href: 'admin-support/', group: 'operations', description: 'Contractor, AP, tax and administrative oversight.' },
    { id: 'workflows', label: 'Workflows', href: 'workflows/', group: 'operations', description: 'Operational tasks and workflow state.' },
    { id: 'studio', label: 'Creative Studio', href: 'creative-studio/', group: 'provider', description: 'AI-assisted culinary marketing and media tools.' },
    { id: 'campaign-studio', label: 'Campaign Studio', href: 'campaign-studio/', group: 'provider', description: 'Generate governed multi-channel advertising and campaign imagery.' },
    { id: 'killeen', label: 'Killeen', href: 'killeen/', group: 'company', description: 'CulinaLinkTX home market and jurisdiction controls.' },
    { id: 'pricing', label: 'Pricing', href: 'pricing/', group: 'company', description: 'Marketplace pricing framework and fee transparency.' },
    { id: 'platforms', label: 'Apps', href: 'platforms/', group: 'company', description: 'Web, PWA, iOS, Android, Windows and Linux delivery channels.' },
    { id: 'release-center', label: 'Release Center', href: 'release-center/', group: 'operations', description: 'Versions, environments, branches, patches, rollback and API execution governance.' },
    { id: 'system-center', label: 'System Center', href: 'system-center/', group: 'operations', description: 'Runtime engines, system fabric, integrations, workflows, tasks, workers and readiness.' },
    { id: 'platform-blueprint', label: 'Platform Blueprint', href: 'platform-blueprint/', group: 'operations', description: 'Pages, modules, controls, engineering principles, workflows and task triggers.' },
    { id: 'help', label: 'Help', href: 'help/', group: 'company', description: 'Customer and provider support center.' },
    { id: 'contact', label: 'Contact Us', href: 'contact/', group: 'company', description: 'Create an account-scoped CulinaLinkTX support request.' },
    { id: 'andreaa', label: 'Andreaa', href: 'andreaa/', group: 'company', description: 'CulinaLinkTX navigation, support and account-scoped operational analysis.' },
    { id: 'about', label: 'About', href: 'about/', group: 'company', description: 'Mission and operating model.' },
    { id: 'privacy-center', label: 'Privacy Center', href: 'privacy-center/', group: 'company', description: 'Data categories, privacy requests, retention, consent and recovery controls.' },
    { id: 'legal', label: 'Legal', href: 'legal/', group: 'company', description: 'Terms, privacy and marketplace policies.' },
];
export const allRoutes = [...primaryRoutes, ...moreRoutes];
export function hrefFor(path: string, home: boolean) { return (home ? '' : '../') + path; }
