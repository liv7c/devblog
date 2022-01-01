import { NextPage } from 'next';

import Layout from '../../components/Layout';
import PostGrid from '../../components/PostGrid';
import { PageTitleWrapper } from '../../styles/Wrapper';
import { Post } from '../../types/Post';
import { getAllPosts } from '../../utils/posts';

interface BlogProps {
  posts: Post[];
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <Layout pageTitle="Blog">
      <PageTitleWrapper>
        <h1>Blog</h1>
        <PostGrid posts={posts} />
      </PageTitleWrapper>
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

export default Blog;
