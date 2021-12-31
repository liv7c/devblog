import Head from 'next/head';
import {ReactNode} from 'react';

import {MaxWidthWrapper} from '../../styles/Wrapper';
import SiteFooter from '../SiteFooter';
import SiteHeader from '../SiteHeader';
import * as S from './Layout.styles';

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
