import { Link, useParams } from "react-router-dom";
import { useLoading } from "../utils/UseLoading";
import { fetchJSON } from "../utils/FetchJSON";

function MiniMovieCard({ id, poster, title }) {
  return (
    <Link to={`/movies/${id}`}>
      <a>
        <img className="max-h-32 object-contain mb-1" src={poster} alt="" />
        <h5>{title}</h5>
      </a>
    </Link>
  );
}

export function MovieDetails() {
  const { id } = useParams();
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/movies")
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

  const {
    title,
    year,
    poster,
    fullPlot,
    genre: currentGenre,
  } = data?.find((d, index) => d._id === id);

  //find movies with same genre
  let similarMovies = data?.filter(
    ({ _id, genre }) => genre === currentGenre && _id !== id
  );

  return (
    <>
      <div className="mt-3 flex flex-col gap-2 border-b-2">
        <h2 className="text-4xl">{title}</h2>
        <h5>{year}</h5>
        <div>
          <img
            className=" border max-h-80 object-contain"
            src={poster}
            alt=""
          />
        </div>
        <p className="max-w-3xl">{fullPlot}</p>
        <div>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            # {currentGenre}
          </span>
        </div>
      </div>

      <div className="mt-2 mb-10">
        <h3 className="text-2xl mb-3">Similar Movies</h3>
        <p className="font-thin italic">
          {similarMovies.length === 0 && "No similar movies"}
        </p>
        <div className="flex gap-10">
          {similarMovies?.map(({ _id, title, poster }) => (
            <MiniMovieCard id={_id} key={_id} title={title} poster={poster} />
          ))}
        </div>
      </div>
    </>
  );
}
