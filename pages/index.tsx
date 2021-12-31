import matter from 'gray-matter';
import type { NextPage } from 'next';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { PageTitleWrapper } from '../styles/Wrapper';

interface HomeProps {
  posts: any[];
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
          include: web accessibility, semantic HTML, JavaScript, React.js, and a
          bit of Rust on the side.
        </p>
      </PageTitleWrapper>

      <h2>Latest blog posts</h2>
      <PostList posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key: string, index: number) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });
    return data;
    // @ts-ignore
  })(require.context('../posts', true, /\.md$/));

  return {
    props: {
      posts,
    },
  };
}

export default Home;
