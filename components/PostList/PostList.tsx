import Link from 'next/link';

import type { Post } from '../../types/Post';
import { getFormattedDate } from '../../utils/date';
import * as S from './PostList.styles';

interface PostListProps {
  posts: Post[] | undefined;
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
                <S.PostDate>
                  {getFormattedDate(post.frontmatter.date)}
                </S.PostDate>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
