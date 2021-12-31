import matter from 'gray-matter';
import type { NextPage } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '../../components/Layout';

interface PostProps {
  frontmatter: {
    title: string;
    date: string;
  };
  markdownBody: string;
}

function Post({ frontmatter, markdownBody }: PostProps) {
  if (!frontmatter) return null;

  return (
    <Layout pageTitle={frontmatter.title}>
      <Link href="/">Back to post list</Link>
      <article>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
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
      </article>
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
    /* @ts-ignore */
  })(require.context('../../posts', true, /\.md$/));

  const paths = blogSlugs.map((slug: string) => `/blog/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export default Post;
