import { useParams } from '@remix-run/react';

export default function SearchMovies() {
  const { id } = useParams();

  return (
    <>
      <h1>Watch Movie id:{id} Page!!</h1>
    </>
  );
}
