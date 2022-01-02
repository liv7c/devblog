import type { NextPage } from 'next';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { PageTitleWrapper } from '../styles/Wrapper';
import { Post } from '../types/Post';
import { getAllPosts } from '../utils/posts';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
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
          include: web accessibility, vim, JavaScript, React.js, and a bit of
          Rust on the side.
        </p>
      </PageTitleWrapper>

      <h2>Latest blog posts</h2>
      <PostList posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts.slice(0, 3),
    },
  };
}

export default Home;
