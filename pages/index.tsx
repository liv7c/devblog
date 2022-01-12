import type { NextPage } from 'next';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { PageTitleWrapper } from '../styles/Wrapper';
import { Post } from '../types/Post';
import { getAllPosts } from '../utils/posts';
import { generateRssFeed } from '../utils/rss';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Layout pageTitle="Home">
      <h1>Hi, I&apos;m Olivia.</h1>
      <p>
        I&apos;m a front-end developer based in Paris. Areas of interest include
        web accessibility, JavaScript, React.js, vim, and a bit of Rust on the
        side.
      </p>

      <h2>Latest blog posts</h2>
      <PostList posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  await generateRssFeed();
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts.slice(0, 3),
    },
  };
}

export default Home;
