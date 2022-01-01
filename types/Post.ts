export interface Post {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    image: string;
    description: string;
    keywords: string[];
  };
  markdownBody: string;
  slug?: string;
}
