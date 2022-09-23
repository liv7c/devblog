import {Link} from '@remix-run/react';

import {getISODate, getPostDate} from '~/utils/date';
import type {PostMetaData} from '~/types/post';
import DateTime from '../DateTime';

function TagList({keywords}: {keywords: string[]}) {
  return (
    <>
      {keywords.map((keyword) => {
        return (
          <span
            key={keyword}
            className="text-sm text-blue-800 bg-blue-200 px-3 py-0.5 rounded-lg mr-3"
          >
            {keyword}
          </span>
        );
      })}
    </>
  );
}

type SerializedPostMetaData = Omit<PostMetaData, 'date'> & {date: string};
interface PostListProps {
  posts: SerializedPostMetaData[];
  withTag?: boolean;
}

function PostList({posts, withTag = false}: PostListProps) {
  return (
    <ul>
      {posts.map((post) => {
        const postDate = new Date(post.date);

        return (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            <div>
              {withTag ? <TagList keywords={post.keywords} /> : null}
              <DateTime className="text-sm" date={postDate} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PostList;
