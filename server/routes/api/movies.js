import { Router } from "express";
import getAllMovies, {
  createNewMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "../../controllers/moviesController.js";

export function MoviesApi() {
  const router = new Router();

  router.get("/", getAllMovies());
  router.post("/new", createNewMovie());
  router.put("/update", updateMovie());
  router.delete("/delete", deleteMovie());

  router.get("/:id", getMovie());

  return router;
}
