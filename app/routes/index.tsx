import {json, LoaderFunction} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import PostList from '~/components/PostList';
import {PostMetaData} from '~/types/post';
import {getAllPosts} from '~/utils/post';

type LoaderData = {
  posts: PostMetaData[];
};

export async function loader() {
  const posts = getAllPosts({limit: 3});

  return json<LoaderData>({posts});
}

function Index() {
  const {posts} = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Hi, I'm Olivia.</h1>
      <p>
        I'm a front-end developer based in Paris. Areas of interest include web
        accessibility, JavaScript, React.js, vim, and a bit of Go on the side.
      </p>

      <h2>Latest blog posts</h2>
      <PostList posts={posts} />
    </div>
  );
}

export default Index;
