import Link from 'next/link';

import type { Post } from '../../types/Post';
import { getFormattedDate } from '../../utils/date';
import Tag from '../Tag';
import * as S from './PostList.styles';

interface PostListProps {
  posts: Post[] | undefined;
  withTag?: boolean;
}

export default function PostList({ posts, withTag = false }: PostListProps) {
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
                <div>
                  {withTag && <Tag>{post.frontmatter.tags[0]}</Tag>}
                  <S.PostDate>
                    {getFormattedDate(post.frontmatter.date)}
                  </S.PostDate>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
