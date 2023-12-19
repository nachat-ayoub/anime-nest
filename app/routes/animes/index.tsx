import { TAnimeCard } from '~/utils/BaseAnimeScraper';
import nineAnime from '~/utils/Scrapers/NineAnime';
import { useLoaderData } from '@remix-run/react';
import AnimeCard from '~/components/AnimeCard';
import { json } from '@remix-run/node';

export async function loader() {
  try {
    return json(await nineAnime.scrapeHomePage());
  } catch (error) {
    console.log(error);
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className='p-6 md:p-12'>
      <h1 className='text-xl my-4'>Watch latest episodes:</h1>

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10'>
        {data.featured.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime as TAnimeCard} />
        ))}
      </div>
    </main>
  );
}
