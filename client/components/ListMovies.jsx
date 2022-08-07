import { useLoading } from "../utils/UseLoading";
import { fetchJSON } from "../utils/FetchJSON";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { APIContext } from "../App";

function MovieCard({ id, title, plot, genre, fullPlot, poster }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full max-h-32 object-contain"
        src={poster}
        alt="No img was returned"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 ">{title}</div>
        <p className="text-gray-700 text-base">{plot}...</p>
        <div>
          <Link to={`/movies/${id}`}>
            <a className="text-blue-500">Read more</a>
          </Link>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          # {genre}
        </span>
      </div>
    </div>
  );
}

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
        {filter?.map(({ _id, title, plot, genre, fullPlot, poster }) => (
          <MovieCard
            id={_id}
            title={title}
            plot={plot}
            fullPlot={fullPlot}
            genre={genre}
            poster={poster}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Movies in the database</h1>
      {data?.map(({ id, movie, plot, genre, fullPlot }) => (
        <MovieCard
          key={id}
          movie={movie}
          plot={plot}
          fullPlot={fullPlot}
          genre={genre}
        />
      ))}
    </div>
  );
}
