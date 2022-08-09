import { useLoading } from "../utils/UseLoading";
import { useContext } from "react";
import { APIContext } from "../context/APIContext";
import { MovieCard } from "./MovieCard";
import { Filter } from "./Filter";
import { Redirect } from "react-router-dom";

export function ListMovies({ featuredMovies }) {
  const { getMovies } = useContext(APIContext);
  const { loading, error, data } = useLoading(async () => getMovies(), []);

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

  if (featuredMovies) {
    const filter = data?.filter(({ featured }) => Boolean(featured));
    return (
      <div className="flex gap-4 flex-wrap">
        {filter?.map(({ _id, title, plot, genre, poster }) => (
          <MovieCard
            id={_id}
            title={title}
            plot={plot}
            genre={genre}
            poster={poster}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <h1 className="block uppercase tracking-wide text-gray-700 text-x font-bold mt-3 mb-2">
        All movies
      </h1>
      <Filter />
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
