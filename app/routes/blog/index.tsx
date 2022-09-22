import type {LoaderFunction} from '@remix-run/node';
import {useLoaderData, Link} from '@remix-run/react';
import {getAllPosts} from '~/utils/mdx';

export const loader: LoaderFunction = () => {
  return getAllPosts();
};

export default function BlogIndex() {
  const posts = useLoaderData();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
