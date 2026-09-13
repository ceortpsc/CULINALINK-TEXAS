'use client';
import { useEffect, useState } from 'react';
import { api } from '@appdeploy/client';

type Release = { version: string; channel: string; status: string; launchReady?: boolean; blockers?: string[] };
const platforms = [
    { name: 'Web / PWA', state: 'DEPLOYED', detail: 'Canonical production client with responsive layouts, PWA manifest, service worker and shared API contracts.', gates: ['Live deployment', 'HTTPS', 'responsive QA', 'accessibility review'] },
    { name: 'iOS / iPadOS', state: 'SOURCE_READY_EXTERNAL_SIGNING_REQUIRED', detail: 'SwiftUI/WKWebView native shell with native tab navigation and release scripts. App Store signing, privacy manifest review, on-device testing and App Review remain external.', gates: ['Apple Developer team', 'distribution signing', 'privacy manifest final review', '1024px app icon', 'on-device tests', 'App Review approval'] },
    { name: 'Android / Google Play', state: 'SOURCE_READY_EXTERNAL_SIGNING_REQUIRED', detail: 'Kotlin Android shell targets API 36, uses HTTPS-only web content and environment-based release signing. Play Console declarations and review remain external.', gates: ['Android SDK 36', 'release keystore', 'Data Safety form', 'privacy policy URL', 'content rating', 'Play review'] },
    { name: 'Windows', state: 'PACKAGE_SCAFFOLD', detail: 'Electron shell with context isolation and external-link isolation. Code signing and installer publication remain external.', gates: ['code-signing certificate', 'installer QA', 'update channel'] },
    { name: 'Linux', state: 'PACKAGE_SCAFFOLD', detail: 'Electron AppImage/deb packaging scaffold using the same production application contracts.', gates: ['package build', 'desktop QA', 'distribution channel'] },
];

export default function PlatformMatrix() {
    const [releases, setReleases] = useState<Release[]>([]);
    useEffect(() => { api.get('/api/v1/releases').then(r => setReleases(r.data.data.releases || [])).catch(() => undefined); }, []);
    return <>
        <div className='platform-grid'>{platforms.map(p => <article className='platform-card' key={p.name}><div className='eyebrow'>{p.state}</div><h3>{p.name}</h3><p>{p.detail}</p><ul>{p.gates.map(g => <li key={g}>{g}</li>)}</ul></article>)}</div>
        <div className='notice warn'>Native source readiness is not equivalent to signed, submitted, approved or published store binaries.</div>
        <h2>Release channels</h2>
        <div className='release-grid'>{releases.map(r => <article className='release-card' key={r.version}><div className='row between'><b>{r.version}</b><span className={`status ${r.launchReady ? 'ready' : ''}`}>{r.status}</span></div><h3>{r.channel}</h3><p>{r.launchReady ? 'All configured launch gates passed.' : 'External or configuration gates remain.'}</p>{(r.blockers || []).length > 0 && <ul>{(r.blockers || []).map(x => <li key={x}>{x}</li>)}</ul>}</article>)}</div>
    </>;
}
