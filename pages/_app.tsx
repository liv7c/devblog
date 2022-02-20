import 'normalize.css';

import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import GlobalStyles from '../styles/GlobalStyles';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
