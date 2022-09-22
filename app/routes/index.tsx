import {LoaderFunction} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import {getAllPosts} from '~/utils/mdx';

export const loader: LoaderFunction = () => {
  return getAllPosts({limit: 3});
};

function Index() {
  const posts = useLoaderData();

  return (
    <div>
      <h1>Hi, I'm Olivia.</h1>
      <p>
        I'm a front-end developer based in Paris. Areas of interest include web
        accessibility, JavaScript, React.js, vim, and a bit of Go on the side.
      </p>

      <h2>Latest blog posts</h2>
      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
