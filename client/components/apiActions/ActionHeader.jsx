import { Link, useParams } from "react-router-dom";

const ACTIONS = {
  yourMovies: "Your movies",
  addMovie: "Add new movie",
  updateMovie: "Update movie",
  deleteMovie: "Delete movie",
};

export function ActionHeader({ actionTxt }) {
  const { action } = useParams();

  const output = Object.entries(ACTIONS).map(([key, value]) => ({
    key,
    value,
  }));

  const renderActionBtns = () => {
    let filter = output.filter(({ key, value }) => value !== ACTIONS[action]);
    return filter.map(({ key, value }) => {
      return (
        <Link to={`/admin/${key}`}>
          <span
            className={`hover:bg-gray-300 shadow mt-3 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
          >
            {value}
          </span>
        </Link>
      );
    });
  };

  return (
    <div className="flex justify-between mb-2 border-b-2">
      <h3 className="block uppercase tracking-wide text-gray-700 text-x font-bold mt-3">
        {actionTxt}
      </h3>
      <div>{renderActionBtns()}</div>
    </div>
  );
}
