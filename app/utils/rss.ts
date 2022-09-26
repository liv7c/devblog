import {Feed} from 'feed';

import {getAllPosts} from './post';

export const generateRssFeed = () => {
  const posts = getAllPosts();
  const siteURL = 'https://oliviac.dev';
  const date = new Date();

  const author = {
    name: 'Olivia Coumans',
    email: 'olivialngc1@gmail.com',
    link: 'https://twitter.com/liv_codes',
  };

  const feed = new Feed({
    title: "Olivia's dev blog",
    description: "Olivia Coumans' site",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/blog-img.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Olivia Coumans`,
    updated: date,
    generator: "Feed for Olivia's dev blog",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: '',
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  return {
    rssFeed: feed.rss2(),
    atomFeed: feed.atom1(),
    jsonFeed: feed.json1(),
  };
};
