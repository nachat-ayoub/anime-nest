import { Form, Link } from '@remix-run/react';

export default function Navbar() {
  return (
    <nav className='py-3 flex flex-col items-center gap-4'>
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

      <Form className='w-full max-w-xs' action='/animes/search'>
        <input
          className='p-2 w-full rounded text-gray-800'
          placeholder='search'
          type='search'
          name='q'
        />
      </Form>
    </nav>
  );
}
