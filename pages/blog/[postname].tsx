import matter from 'gray-matter';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

import Layout from '../../components/Layout';

interface PostProps {
  frontmatter: {
    title: string;
    date: string;
    image: string;
  };
  markdownBody: string;
}

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

function Post({ frontmatter, markdownBody }: PostProps) {
  if (!frontmatter) return null;
  const imageUrl = `/images/${frontmatter.image}`;

  return (
    <Layout pageTitle={frontmatter.title}>
      <Link href="/" passHref>
        <BackLink>&larr; Back to the blog</BackLink>
      </Link>
      <PostContainer>
        <PostTitle>{frontmatter.title}</PostTitle>
        <PostDate dateTime={frontmatter.date}>
          {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
            new Date(frontmatter.date)
          )}
        </PostDate>
        <Image
          src={imageUrl}
          alt=""
          layout="responsive"
          width={700}
          height={475}
        />
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
}

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
