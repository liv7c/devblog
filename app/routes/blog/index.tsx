import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import PostList from '~/components/PostList';
import type {PostMetaData} from '~/types/post';
import {getAllPosts} from '~/utils/post';

type LoaderData = {posts: PostMetaData[]};

export async function loader() {
  const posts = getAllPosts();

  return json<LoaderData>({posts});
}

export const meta: MetaFunction = () => {
  return {
    title: 'Blog | Olivia Coumans',
  };
};

export default function BlogIndex() {
  const {posts} = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Blog</h1>
      <PostList posts={posts} withTag />
    </div>
  );
}
