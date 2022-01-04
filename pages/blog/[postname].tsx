import matter from 'gray-matter';
import type { NextPage } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import type { Post } from '../../types/Post';
import { getFormattedDate } from '../../utils/date';

const BackLink = styled.a`
  margin-bottom: 20px;
  display: inline-block;
`;

const PostTitle = styled.h1`
  margin-bottom: 3px;
`;

const PostDate = styled.time`
  display: block;
  margin-bottom: 15px;
`;

const PostContainer = styled.article`
  padding-bottom: 50px;
`;

interface PostProps {
  frontmatter: Post['frontmatter'];
  markdownBody: Post['markdownBody'];
}

const Post: NextPage<PostProps> = ({ frontmatter, markdownBody }) => {
  if (!frontmatter) return null;

  return (
    <Layout
      pageTitle={frontmatter.title}
      pageDescription={frontmatter.description}
    >
      <Link href="/" passHref>
        <BackLink>&larr; Back to the blog</BackLink>
      </Link>
      <PostContainer>
        <PostTitle>{frontmatter.title}</PostTitle>
        <PostDate dateTime={frontmatter.date}>
          {getFormattedDate(frontmatter.date, 'medium')}
        </PostDate>
        <div>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter style={dark} language={match[1]}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdownBody}
          </ReactMarkdown>
        </div>
      </PostContainer>
    </Layout>
  );
};

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;

  const content = await import(`../../posts/${postname}.md`);
  const data = matter(content.default);

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key: string, index: number) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);

      return slug;
    });
    return data;
  })(require.context('../../posts', true, /\.md$/));

  const paths = blogSlugs.map((slug: string) => `/blog/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export default Post;
