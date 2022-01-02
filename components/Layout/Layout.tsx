import Head from 'next/head';
import { ReactNode } from 'react';

import { server } from '../../config';
import { MaxWidthWrapper } from '../../styles/Wrapper';
import SiteFooter from '../SiteFooter';
import SiteHeader from '../SiteHeader';
import * as S from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  pageURL?: string;
}

const Layout = ({
  children,
  pageTitle,
  pageDescription,
  pageURL,
}: LayoutProps) => {
  const title = `${pageTitle} | Olivia Coumans`;
  const description = pageDescription ?? "Olivia Coumans's website";
  const currentURL = pageURL ?? server;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@liv_codes" key="twhandle" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/blog-img.png" />
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content="/blog-img.png" key="ogimage" />
        <meta
          property="og:site_name"
          content="Olivia Coumans"
          key="ogsitename"
        />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <S.ContentWrapper>
        <SiteHeader />
        <main>
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </main>
        <SiteFooter />
      </S.ContentWrapper>
    </>
  );
};

export default Layout;
