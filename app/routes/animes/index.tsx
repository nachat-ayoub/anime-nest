import { Link, useLoaderData } from '@remix-run/react';
import { load as cheerioLoad } from 'cheerio';
import { json } from '@remix-run/node';
import axios from 'axios';
import BaseAnimeScraper from 'utils/BaseAnimeScraper';

export async function loader() {
  try {
    const res = await axios.get('https://9animetv.to/home');
    const $ = cheerioLoad(res.data);

    const title = $('title').text();

    const animes = $('.film_list-wrap .flw-item')
      .toArray()
      .map((anime) => ({
        title: $(anime).find('.film-detail > .film-name > a').text().trim(),
        quality: $(anime).find('.tick-quality').text().trim(),
        sub: $(anime).find('.tick-item.tick-sub').text().trim(),
        dub: $(anime).find('.tick-item.tick-dub').text().trim(),
        episode: $(anime).find('.tick-item.tick-eps').text().trim(),
        image: $(anime).find('.film-poster-img').attr('data-src'),
        link: $(anime).find('.film-poster-ahref').attr('href'),
      }));

    const nineAnime = new BaseAnimeScraper({
      baseUrl: 'https://9animetv.to',
      endpoints: {
        home: '/home',
      },
      selectors: {
        home: {
          featured: {
            card: '.film_list-wrap .flw-item',
            title: '.film-detail > .film-name > a',
            quality: '.tick-quality',
            sub: '.tick-item.tick-sub',
            dub: '.tick-item.tick-dub',
            image: '.film-poster-img',
            slug: 'a.film-poster-ahref',
            ep: {
              name: '.tick-item.tick-eps',
              slug: '',
            },
          },
        },
      },
    });

    return json({
      title,
      animes,
      data: { HomePageData: await nineAnime.scrapeHomePage() },
    });
  } catch (error) {
    console.log(error);
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data.data);

  return (
    <main className='p-6 md:p-12'>
      <h1>Animes Index Page!!</h1>
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10'>
        {data.animes.map((anime, i) => (
          <AnimeCard key={i + '-' + anime.link} anime={anime as TAnime} />
        ))}
      </div>
    </main>
  );
}

type TAnime = {
  title: string;
  quality: string;
  sub: string;
  dub: string;
  episode: string;
  image: string;
  link: string;
};

const AnimeCard = ({ anime }: { anime: TAnime }) => {
  return (
    <Link to={`/animes${anime.link}`}>
      <div
        className={
          'relative w-44 md:w-56 aspect-[9/14] rounded-md overflow-hidden'
        }
      >
        <img
          src={anime.image}
          alt={anime.title}
          className={'w-full h-full object-cover'}
        />

        <div className='p-2 absolute bottom-0 left-0 w-full h-full flex flex-col justify-between bg-gradient-to-t from-gray-950 via-transparent'>
          <div className='flex justify-center flex-wrap gap-2 text-xs whitespace-nowrap font-medium'>
            <p className='bg-amber-500 px-1.5 py-0.5 rounded-md'>
              {anime.quality}
            </p>
            {anime.sub && (
              <p className='bg-amber-500 px-1.5 py-0.5 rounded-md'>Sub</p>
            )}
            {anime.dub && (
              <p className='bg-amber-500 px-1.5 py-0.5 rounded-md'>Dub</p>
            )}
          </div>

          <div className='text-gray-100 text-center'>
            <h3 className={'font-bold text-base'}>{anime.title}</h3>
            <p className='text-sm text-gray-300 px-1.5 py-0.5'>
              {anime.episode}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
