import { Link } from "react-router-dom";

export function Admin() {
  return (
    <div>
      <div className="mt-3">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Admin
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Link to="/admin/yourMovies">
          <div className="p-20 shadow-lg flex justify-center">
            <h1 className="whitespace-nowrap">Your published movies</h1>
          </div>
        </Link>
        <Link to="/admin/addMovie">
          <div className=" p-20 shadow-lg  flex justify-center">
            <h1 className="whitespace-nowrap">Add new movie</h1>
          </div>
        </Link>
        <Link to="/admin/updateMovie">
          <div className=" p-20 shadow-lg  flex justify-center">
            <h1 className="whitespace-nowrap">Update movie</h1>
          </div>
        </Link>
        <Link to="/admin/deleteMovie">
          <div className=" p-20 shadow-lg  flex justify-center">
            <h1 className="whitespace-nowrap">DeleteMovie</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
