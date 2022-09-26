import type {LoaderFunction} from '@remix-run/node';
import {generateRssFeed} from '~/utils/rss';

export const loader: LoaderFunction = async ({request}) => {
  const rssString = generateRssFeed().atomFeed;

  return new Response(rssString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(rssString)),
    },
  });
};
