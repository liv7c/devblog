import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';

import styles from './tailwind.css';
import {getSEOMeta} from './utils/seo';

export const meta: MetaFunction = ({location}) => {
  return {
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
    ...getSEOMeta({currentPath: location.pathname}),
  };
};

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: styles},
  {rel: 'icon', href: '/img/favicon.ico'},
];

function Document({
  children,
  title = 'Olivia Coumans',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>

      <body className="h-full">
        <div className="h-full flex flex-col max-w-none prose">
          <Header />
          <main className="bg-beige py-8 container" id="main-content">
            <div className="prose lg:prose-lg prose-ul:pl-0 prose-ul:list-none lg:prose-ul:pl-0 prose-li:pl-0 lg:prose-li:pl-0">
              {children}
            </div>
          </main>
          <Footer />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <Document title="Page not found | Olivia Coumans">
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link to="/">Back to the home page</Link>
    </Document>
  );
}

export default function App() {
  return (
    <Document title="Olivia Coumans">
      <Outlet />
    </Document>
  );
}
