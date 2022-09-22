import * as post1 from '~/routes/blog/vim-with-vscode.mdx';
import * as post2 from '~/routes/blog/search-for-string-with-git-log.mdx';
import * as post3 from '~/routes/blog/an-overview-of-unknown-typescript.mdx';
import * as post4 from '~/routes/blog/exploring-generics-and-generic-constraints.mdx';
import * as post5 from '~/routes/blog/getting-started-with-tmux.mdx';

function postFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    date: mod.attributes.date,
    ...mod.attributes.meta,
  };
}

function sortByDate(data: any, orderBy: 'asc' | 'desc') {
  const sortedData = data.sort((firstPost: any, secondPost: any) => {
    const firstPostDate = Date.parse(firstPost.date);
    const secondPostDate = Date.parse(secondPost.date);

    return orderBy === 'desc'
      ? secondPostDate - firstPostDate
      : firstPostDate - secondPostDate;
  });

  return sortedData;
}

export function getAllPosts({
  orderBy = 'desc',
  limit = Infinity,
}: {
  orderBy?: 'asc' | 'desc';
  limit?: number;
} = {}) {
  const posts = [
    postFromModule(post1),
    postFromModule(post2),
    postFromModule(post3),
    postFromModule(post4),
    postFromModule(post5),
  ];

  const sortedPosts = sortByDate(posts, orderBy);

  return sortedPosts.slice(0, limit);
}
