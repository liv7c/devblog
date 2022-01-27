import 'normalize.css';

import * as Fathom from 'fathom-client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load('RPEVBUFY', {
      includedDomains: ['oliviac.dev', 'www.oliviac.dev'],
      url: 'https://encouraging-descriptive.oliviac.dev/script.js',
      honorDNT: true,
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
