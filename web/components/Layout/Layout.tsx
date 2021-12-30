import Head from 'next/head';
import {ReactNode} from 'react';

import {MaxWidthWrapper} from '../../styles/Wrapper';
import SiteHeader from '../SiteHeader';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
}

const Layout = ({children, pageTitle, pageDescription}: LayoutProps) => {
  const title = `${pageTitle} | Olivia Coumans`;
  const description = pageDescription ?? "Olivia Coumans's website";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta name="description" content={description} />
      </Head>
      <SiteHeader />
      <main>
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
    </>
  );
};

export default Layout;
