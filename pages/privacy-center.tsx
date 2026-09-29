import Head from 'next/head';
import SiteHeader from '../components/SiteHeader';
import DataGovernanceCenter from '../components/DataGovernanceCenter';

export default function PrivacyCenter() {
    return <><Head><title>Privacy & Data Protection Center | CulinaLinkTX</title><meta name='description' content='CulinaLinkTX data categories, privacy rights, retention, consent discipline, verified-only production seeding and bounded self-healing controls.'/></Head><SiteHeader/><main id='main-content' className='page'><div className='eyebrow'>Privacy · security · data governance</div><h1>Privacy & Data Protection Center</h1><p className='page-intro'>CulinaLinkTX separates public marketplace information from private account, compliance, support and financial records. This center documents data categories, purposes, retention classes, privacy-request workflows and production recovery controls. Legal applicability can vary by jurisdiction and business role, so published policies remain subject to legal review.</p><DataGovernanceCenter/></main></>;
}
