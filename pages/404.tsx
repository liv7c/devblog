import type {NextPage} from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';

const NotFoundPage: NextPage = () => {
  return (
    <Layout pageTitle="Page not found">
      <h1>Page not found</h1>
      <p>
        Sorry, this page could not be found. Go to the{' '}
        <Link href="/">home page</Link>.
      </p>
    </Layout>
  );
};

export default NotFoundPage;
