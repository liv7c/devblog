import {Link} from '@remix-run/react';

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
    <div className="prose-ul:pl-0 prose-ul:list-none lg:prose-ul:pl-0 prose-li:pl-0 lg:prose-li:pl-0">
      <ul>
        {posts.map((post) => {
          const postDate = new Date(post.date);

          return (
            <li key={post.slug} className="pb-4 last-of-type:pb-0">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              <div>
                {withTag ? <TagList keywords={post.keywords} /> : null}
                <DateTime className="text-sm" date={postDate} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostList;
