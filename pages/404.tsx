import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';
import { PageTitleWrapper } from '../styles/Wrapper';

const NotFoundPage: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <PageTitleWrapper>
        <h1>Page not found</h1>
        <p>
          Sorry, this page could not be found. Go to the{' '}
          <Link href="/">home page</Link>.
        </p>
      </PageTitleWrapper>
    </Layout>
  );
};

export default NotFoundPage;
