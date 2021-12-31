import {NextPage} from 'next';

import Layout from '../components/Layout';
import {PageTitleWrapper} from '../styles/Wrapper';

const Blog: NextPage = () => {
  return (
    <Layout pageTitle="Blog">
      <PageTitleWrapper>
        <h1>Blog</h1>
      </PageTitleWrapper>
    </Layout>
  );
};

export default Blog;
