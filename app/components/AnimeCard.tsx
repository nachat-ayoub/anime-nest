import { TAnimeCard } from '~/utils/BaseAnimeScraper';
import { Link } from '@remix-run/react';

const AnimeCard = ({ anime }: { anime: TAnimeCard }) => {
  return (
    <Link to={`/animes/${anime.slug}/${anime.ep?.slug || ''}`}>
      <div
        className={
          'relative group w-44 md:w-56 aspect-[9/14] rounded-md overflow-hidden'
        }
      >
        <img
          src={anime.image}
          alt={anime.title}
          className={'w-full h-full object-cover'}
        />

        <div className='absolute top-0 w-full flex justify-between text-xs whitespace-nowrap font-medium'>
          <p className='bg-purple-500 dark:bg-purple-700 px-1.5 py-0.5 rounded-br'>
            {anime.quality}
          </p>
          <div className='flex overflow-hidden rounded-bl'>
            {anime.dub && <p className='bg-amber-600 px-1.5 py-0.5'>DUB</p>}
            {anime.sub && <p className='bg-green-700 px-1.5 py-0.5'>SUB</p>}
          </div>
        </div>

        <div className='py-2 px-3 absolute -bottom-full group-hover:bottom-0 left-0 w-full h-full flex flex-col justify-end bg-gradient-to-t from-gray-950 via-transparent transition-all duration-300'>
          <div className='text-gray-100 text-center'>
            <h3 className={'font-semibold text-sm truncate'}>{anime.title}</h3>
            {anime.ep && (
              <p className='text-sm text-gray-300 px-1.5 py-0.5'>
                {anime.ep.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
