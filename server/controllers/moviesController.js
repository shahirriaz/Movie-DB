import Movie from "../models/Movie.js";

export default function getAllMovies() {
  return async (req, res) => {
    const allMovies = await Movie.find({}).exec();
    res.json(allMovies);
  };
}

export function createNewMovie() {
  return async (req, res) => {
    const { title, year, genre, plot, fullPlot, featured, poster, author } =
      req.body;
    if (!title || !year || !genre || !plot || !fullPlot || !poster)
      return res.status(400).json({
        message: `Title,year, genre and plot is required, please add introduction plot also`,
      });

    const duplicate = await Movie.findOne({
      title: title,
      year: year,
      genre: genre,
      plot: plot,
      fullPlot: fullPlot,
    }).exec();

    if (duplicate) return res.sendStatus(409); // conflict

    try {
      await Movie.create({
        title: title,
        year: year,
        genre: genre,
        plot: plot,
        fullPlot: fullPlot,
        featured: featured,
        poster: poster,
        author: author,
      });
      res
        .status(201)
        .json({ success: `New movie with title: ${title} is created` });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

export function updateMovie() {
  return async (req, res) => {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter required" });
    }

    const movie = await Movie.findOne({ _id: req.body.id }).exec();

    if (!movie) {
      return res
        .status(204)
        .json({ message: `No movie with id ${req.body.id} found` });
    }

    if (req.body?.title) movie.title = req.body.title;
    if (req.body?.year) movie.year = req.body.year;
    if (req.body?.poster) movie.poster = req.body.poster;
    if (req.body?.poster) movie.poster = req.body.poster;
    if (req.body?.fullPlot) movie.fullPlot = req.body.fullPlot;
    if (req.body?.plot) movie.plot = req.body.plot;
    if (req.body?.genre) movie.genre = req.body.genre;
    if (req.body?.featured) movie.featured = req.body.featured;

    const result = await movie.save();

    res.json(result);
  };
}

export function deleteMovie() {
  return async (req, res) => {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter required" });
    }

    const movie = await Movie.findOne({ _id: req.body.id }).exec();

    if (!movie) {
      return res
        .status(204)
        .json({ message: `No movie with id ${req.body.id} found` });
    }

    const result = await movie.deleteOne({ _id: req.body.id });
    res.json(result);
  };
}

export function getMovie() {
  return async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter required" });
    }

    const movie = await Movie.findOne({ _id: req.params.id }).exec();

    if (!movie) {
      return res
        .status(204)
        .json({ message: `No movie with id ${req.params.id} found` });
    }

    res.json(movie);
  };
}
