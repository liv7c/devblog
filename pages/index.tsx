import type {NextPage} from 'next';
import styled from 'styled-components';

import Layout from '../components/Layout';
import {PageTitleWrapper} from '../styles/Wrapper';

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <PageTitleWrapper>
        <h1>
          Hi{' '}
          <span role="img" aria-label="Wave">
            👋
          </span>{' '}
          I&apos;m Olivia
        </h1>
        <p>
          I&apos;m a front-end developer based in Paris. Areas of interest
          include: web accessibility, semantic HTML, JavaScript, React.js, and a
          bit of Rust on the side.
        </p>
      </PageTitleWrapper>

      <h2>Latest blog posts</h2>
      <p>No blog post yet...</p>
    </Layout>
  );
};

export default Home;
