import { TAnimeCard } from '~/utils/BaseAnimeScraper';
import nineAnime from '~/utils/Scrapers/NineAnime';
import { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from '@remix-run/react';
import AnimeCard from '~/components/AnimeCard';
import { json } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const queries = new URL(request.url).searchParams;
    return json(await nineAnime.scrapeSearchPage(queries.get('q')));
  } catch (error) {
    console.log(error);
  }
}

export default function SearchMovies() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <main className='p-6 md:p-12'>
      <h1 className='text-xl my-4'>Search For Your Anime:</h1>
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10'>
        {data.animes.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime as TAnimeCard} />
        ))}
      </div>
    </main>
  );
}
