import { NextPage } from 'next';

import Layout from '../../components/Layout';
import PostList from '../../components/PostList';
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
        <PostList posts={posts} withTag={true} />
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
