import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import Footer from './components/Footer';
import Header from './components/Header';

import styles from './tailwind.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [{rel: 'stylesheet', href: styles}];

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>

      <body className="h-full">
        <div className="h-full flex flex-col max-w-none prose">
          <Header />
          <main className="bg-beige py-8 container">
            <div className="prose lg:prose-lg">
              <Outlet />
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
