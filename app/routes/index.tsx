import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className=''>
      <h1 className='text-4xl font-bold text-center pt-10'>
        Welcome to AnimeWorld
      </h1>
      <h3 className='text-2xl font-semibold text-center pt-10 text-blue-500 hover:text-blue-600 hover:underline'>
        <Link to={'/animes'} prefetch='intent'>
          See Animes
        </Link>
      </h3>
    </div>
  );
}
