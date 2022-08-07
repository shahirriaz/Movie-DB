import { useParams } from "react-router-dom";
import { AddNewMovie } from "./apiActions/AddNewMovie";
import { YourMovies } from "./apiActions/YourMovies";
import { UpdateMovie } from "./apiActions/UpdateMovie";
import { DeleteMovie } from "./apiActions/DeleteMovie";

export const COMPONENTS = {
  yourMovies: <YourMovies />,
  addMovie: <AddNewMovie />,
  updateMovie: <UpdateMovie />,
  deleteMovie: <DeleteMovie />,
};

function DefaultComponent() {
  return null;
}

export function DynamicComponent() {
  const { action } = useParams();

  return COMPONENTS[action] || <DefaultComponent />;
}
