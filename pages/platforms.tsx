import Head from 'next/head';
import SiteHeader from '../components/SiteHeader';
import PlatformMatrix from '../components/PlatformMatrix';

export default function Platforms() {
    return <><Head><title>Apps & Native Release Channels | CulinaLinkTX</title><meta name='description' content='CulinaLinkTX web, PWA, iOS, Android, Windows and Linux release architecture and production gates.'/></Head><SiteHeader/><main className='page'><div className='eyebrow'>Cross-platform delivery</div><h1>One product contract across web, mobile and desktop.</h1><p className='page-intro'>The deployed Web/PWA client is operational now. iOS, Android, Windows and Linux source packages share CulinaLinkTX APIs, lifecycle rules, brand identity and security boundaries while retaining platform-specific signing, privacy and review gates.</p><div className='hero-actions'><a className='btn btn-soft' href='../release-center/'>Open Release & Execution Center</a><a className='btn btn-primary' href='../privacy-center/'>Privacy & Data Protection</a><a className='btn btn-gold' href='../system-center/'>System Fabric</a></div><PlatformMatrix/></main></>;
}
