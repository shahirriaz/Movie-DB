import { Link } from "react-router-dom";

export function MovieCard({ id, title, plot, genre, fullPlot, poster }) {
  return (
    <Link to={`/movies/${id}`}>
      <div className="max-w-sm h-max rounded overflow-hidden shadow-lg ">
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
    </Link>
  );
}
