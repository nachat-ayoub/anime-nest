import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import stylesheet from '~/tailwind.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className='py-3'>
      <ul className='flex justify-center items-center gap-x-4'>
        <li className=''>
          <Link
            className='text-2xl font-semibold text-center pt-10 text-blue-500 hover:text-blue-600 hover:underline'
            to={'/'}
            prefetch='intent'
          >
            Home
          </Link>
        </li>

        <div className='text-4xl text-gray-400'>|</div>

        <li className=''>
          <Link
            className='text-2xl font-semibold text-center pt-10 text-blue-500 hover:text-blue-600 hover:underline'
            to={'/animes'}
            prefetch='intent'
          >
            Animes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
