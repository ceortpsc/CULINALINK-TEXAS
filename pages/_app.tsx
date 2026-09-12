import type { AppProps } from 'next/app';
import PwaRegister from '../components/PwaRegister';
import GlobalFooter from '../components/GlobalFooter';
import '../styles/global.css';
import '../styles/runtime.css';
import '../styles/verification.css';
import '../styles/home-experience.css';
import '../styles/platform-blueprint.css';

export default function App({ Component, pageProps }: AppProps) {
    return <><PwaRegister /><a className='skip-link' href='#main-content'>Skip to main content</a><Component {...pageProps} /><GlobalFooter /></>;
}
