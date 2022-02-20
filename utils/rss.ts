import {Feed} from 'feed';
import fs from 'fs';

import {getAllPosts} from './posts';

export const generateRssFeed = async () => {
  const posts = await getAllPosts();
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
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.frontmatter.summary ?? '',
      author: [author],
      contributor: [author],
      date: new Date(post.frontmatter.date),
    });
  });

  // create rss files in public/rss folder
  fs.mkdirSync('./public/rss', {recursive: true});
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
};
