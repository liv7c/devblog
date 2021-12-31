import Link from 'next/link';

interface PostListProps {
  posts:
    | { frontmatter: { title: string; date: string }; slug: string }[]
    | undefined;
}

export default function PostList({ posts }: PostListProps) {
  if (posts === undefined) return null;

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href={{ pathname: `/blog/${post.slug}` }}>
                  {post.frontmatter.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
