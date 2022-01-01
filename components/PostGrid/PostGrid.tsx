import { Post } from '../../types/Post';
import { getFormattedDate } from '../../utils/date';
import Tag from '../Tag';
import * as S from './PostGrid.styles';

interface PostGridProps {
  posts: Post[] | undefined;
}

const PostGrid = ({ posts }: PostGridProps) => {
  console.log('posts', posts);
  if (!posts) return null;

  return (
    <S.PostGrid>
      {posts.map((post) => {
        return (
          <S.PostCard key={post.slug}>
            <S.ImageWrapper>
              <img src={`/images/${post.frontmatter.image}`} alt="" />
            </S.ImageWrapper>
            <S.PostTitle>{post.frontmatter.title}</S.PostTitle>
            <S.PostInfo>
              <Tag>{post.frontmatter.tags.join(',')}</Tag>
              <S.PostDate dateTime={post.frontmatter.date}>
                {getFormattedDate(post.frontmatter.date, 'medium')}
              </S.PostDate>
            </S.PostInfo>
          </S.PostCard>
        );
      })}
    </S.PostGrid>
  );
};

export default PostGrid;
