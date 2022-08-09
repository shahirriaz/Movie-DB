import { useParams } from "react-router-dom";
import { APIContext } from "../context/APIContext";
import { useLoading } from "../utils/UseLoading";
import { useContext } from "react";
import { MovieCard } from "./MovieCard";

export function ListMoviesByCategory() {
  const { genre } = useParams();
  const { getMovies } = useContext(APIContext);
  const { loading, error, data } = useLoading(
    async () => getMovies(genre),
    [genre]
  );

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div>
        <h1 className="font-medium mt-3">Sorry</h1>
        <p className="text-2xl">No movies found by this genre</p>
      </div>
    );
  }
  return (
    <>
      <h2 className="block uppercase tracking-wide text-gray-700 text-x font-bold mt-3 mb-2">
        {genre.charAt(0).toUpperCase() + genre.slice(1)}
      </h2>
      <div className="grid grid-cols-3 gap-10 mt-2">
        {data?.map(({ _id, title, plot, genre, poster }) => (
          <MovieCard
            id={_id}
            title={title}
            plot={plot}
            genre={genre}
            poster={poster}
          />
        ))}
      </div>
    </>
  );
}
