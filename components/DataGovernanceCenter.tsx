'use client';
import { useEffect, useState } from 'react';
import { api } from '@appdeploy/client';

type Registry = { policyVersion: string; controller: string; principles: string[]; categories: Array<{ id: string; examples: string[]; purpose: string; sensitivity: string }>; rights: string[]; retentionClasses: Array<{ id: string; rule: string }>; productionSeedRule: string; syntheticOperationalDataAllowed: boolean };
type Healing = { latest: null | { runAt: string; inspected: number; retryNudges: number; quarantined: number; blocked: number; state: string }; policy: Record<string, boolean> };

export default function DataGovernanceCenter() {
    const [registry, setRegistry] = useState<Registry | null>(null);
    const [healing, setHealing] = useState<Healing | null>(null);
    const [type, setType] = useState('ACCESS');
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        api.get('/api/v1/privacy/registry').then(r => setRegistry(r.data.data)).catch(() => undefined);
        api.get('/api/v1/operations/self-healing').then(r => setHealing(r.data.data)).catch(() => undefined);
    }, []);
    async function submitRequest() {
        setMessage('');
        try {
            const r = await api.post('/api/v1/privacy/requests', { type, details });
            setMessage(`${r.data.data.type} request created as ${r.data.data.status}. No automatic deletion was performed.`);
            setDetails('');
        } catch { setMessage('Sign in to submit an account-scoped privacy request.'); }
    }
    if (!registry) return <div className='empty'>Loading data-governance registry…</div>;
    return <>
        <section className='split'>
            <article className='card'><div className='eyebrow'>Policy version {registry.policyVersion}</div><h2>Data protection principles</h2><ul>{registry.principles.map(x => <li key={x}>{x}</li>)}</ul></article>
            <article className='card'><div className='eyebrow'>Production data discipline</div><h2>{registry.productionSeedRule}</h2><p>Synthetic operational data allowed: <b>{String(registry.syntheticOperationalDataAllowed)}</b></p><p>Production may seed reference taxonomies and configuration. It must not seed invented users, providers, orders, reviews, ratings, payments or outcomes.</p></article>
        </section>
        <section style={{ marginTop: 28 }}><div className='eyebrow'>Data inventory</div><h2>What the application stores and why</h2><div className='split'>{registry.categories.map(c => <article className='card' key={c.id}><div className='row between'><b>{c.id}</b><span className='status'>{c.sensitivity}</span></div><p>{c.purpose}</p><small>{c.examples.join(' · ')}</small></article>)}</div></section>
        <section className='split' style={{ marginTop: 28 }}>
            <article className='card'><div className='eyebrow'>Privacy request center</div><h2>Access, correct, delete, export, opt out or appeal</h2><div className='field'><label>Request type</label><select className='select' value={type} onChange={e => setType(e.target.value)}>{registry.rights.map(r => <option key={r}>{r}</option>)}</select></div><div className='field'><label>Details</label><textarea className='textarea' rows={4} value={details} onChange={e => setDetails(e.target.value)} placeholder='Do not enter passwords, card numbers or full SSN/TIN values.'/></div><button className='btn btn-primary' onClick={submitRequest}>Submit privacy request</button>{message && <div className='notice' role='status'>{message}</div>}</article>
            <article className='card'><div className='eyebrow'>Self-healing operations</div><h2>Bounded recovery, never silent code mutation</h2><p>{healing?.latest ? `Latest sweep: ${healing.latest.state}. Inspected ${healing.latest.inspected}; retry nudges ${healing.latest.retryNudges}; quarantined ${healing.latest.quarantined}; blocked ${healing.latest.blocked}.` : 'No completed self-healing sweep is recorded yet.'}</p><ul><li>Eligible stalled jobs may be reopened for bounded retry.</li><li>Dead-letter work is quarantined for review.</li><li>Source rewriting and unapproved external execution are disabled.</li><li>Rollback remains controlled by release policy.</li></ul></article>
        </section>
        <section style={{ marginTop: 28 }}><div className='eyebrow'>Retention classes</div><h2>Storage and retention</h2><div className='route-map'>{registry.retentionClasses.map(x => <div key={x.id}><code>{x.id}</code><span>{x.rule}</span></div>)}</div></section>
    </>;
}
