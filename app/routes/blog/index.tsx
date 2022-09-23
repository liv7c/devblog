import {json, LoaderFunction} from '@remix-run/node';
import {useLoaderData, Link} from '@remix-run/react';
import {PostMetaData} from '~/types/post';
import {getAllPosts} from '~/utils/post';

type LoaderData = {posts: PostMetaData[]};

export async function loader() {
  const posts = getAllPosts();

  return json<LoaderData>({posts});
}

export default function BlogIndex() {
  const {posts} = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => {
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
