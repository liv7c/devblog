import Head from 'next/head';
import { ReactNode } from 'react';

import { server } from '../../config';
import blogImg from '../../public/blog-img.png';
import {
  MaxWidthPageContentWrapper,
  MaxWidthWrapper,
} from '../../styles/Wrapper';
import SiteFooter from '../SiteFooter';
import SiteHeader from '../SiteHeader';
import * as S from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  pageURL?: string;
  withLargeBottomSpace?: boolean;
}

const Layout = ({
  children,
  pageTitle,
  pageDescription,
  pageURL,
  withLargeBottomSpace = false,
}: LayoutProps) => {
  const title = `${pageTitle} | Olivia Coumans`;
  const description = pageDescription ?? "Olivia Coumans's site";
  const currentURL = pageURL ?? server;
  const siteImage = `${server}${blogImg.src}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:image" content={siteImage} key="ogimage" />
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta
          property="og:site_name"
          content="Olivia Coumans"
          key="ogsitename"
        />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@liv_codes" key="twhandle" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={siteImage} />
      </Head>
      <S.ContentWrapper>
        <SiteHeader />
        <main>
          <MaxWidthPageContentWrapper
            withLargeBottomSpace={withLargeBottomSpace}
          >
            {children}
          </MaxWidthPageContentWrapper>
        </main>
        <SiteFooter />
      </S.ContentWrapper>
    </>
  );
};

export default Layout;
