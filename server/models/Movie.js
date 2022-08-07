import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
  },
  plot: {
    type: String,
  },
  fullPlot: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  poster: {
    type: String,
  },
});

export default mongoose.model("Movie", movieSchema);
