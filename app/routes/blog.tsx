import type {LinksFunction} from '@remix-run/node';
import {Outlet} from '@remix-run/react';

import styles from 'highlight.js/styles/a11y-dark.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

function BlogLayout() {
  return <Outlet />;
}

export default BlogLayout;
