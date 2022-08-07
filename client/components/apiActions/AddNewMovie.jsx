import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ActionHeader } from "./ActionHeader";
import { APIContext } from "../../App";

export function AddNewMovie() {
  const { postMovie } = useContext(APIContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({
    title,
    year,
    poster,
    fullPlot,
    plot,
    genre,
    featured,
    author,
  }) => {
    if (featured === "Yes") {
      featured = Boolean(true);
    } else {
      featured = Boolean(false);
    }
    try {
      setLoading(true);
      await postMovie({
        title,
        year,
        poster,
        fullPlot,
        plot,
        genre,
        featured,
        author,
      }).then((response) => {
        if (response.status === 409) {
          alert("A movie with this data already exixsts");
        }
        alert("Your movie was successfully added");
        setLoading(false);
      });
    } catch (e) {
      console.log(e.message);
    }
    // ws?.send(JSON.stringify({ data }));
  };
  return (
    <div>
      <ActionHeader actionTxt="Add new movie" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="flex -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
              placeholder="Batman"
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">Title is required</p>
            )}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="year"
            >
              Year
            </label>
            <input
              {...register("year", {
                required: true,
                maxLength: 1,
                valueAsNumber: true,
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="year"
              type="number"
              min="1700"
              max="2099"
              placeholder="1987"
            />
            {errors.year && (
              <p className="text-red-500 text-xs italic">Year is required</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="author"
            >
              Author
            </label>
            <input
              {...register("author", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="author"
              type="text"
              placeholder="Author"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="coverPhoto"
            >
              Cover photo
            </label>
            <input
              {...register("poster", { required: true })}
              className=" resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="coverPhoto"
              type="text"
              placeholder="https//somethin/.com/img.jpg"
            />
            {errors.poster && (
              <p className="text-red-500 text-xs italic">Poster is required</p>
            )}
            <p className="text-gray-600 text-xs italic mb-2">
              Cover image perhaps?
            </p>
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="fullplot"
            >
              Full Plot
            </label>
            <textarea
              {...register("fullPlot", { required: true })}
              className=" h-32 resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="fullplot"
              placeholder="Full Plot"
            />
            {errors.fullPlot && (
              <p className="text-red-500 text-xs italic">
                Fullplot is required
              </p>
            )}
            <p className="text-gray-600 text-xs italic mb-2">
              Make it as long and as crazy as you'd like
            </p>
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="shortPlot"
            >
              Short plot
            </label>
            <input
              {...register("plot")}
              className=" resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="shortPlot"
              type="text"
              placeholder="Plot"
            />
            <p className="text-gray-600 text-xs italic">
              Short version of the plot .. An intro maybe?
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="genre"
            >
              Genre
            </label>
            <div className="relative">
              <select
                {...register("genre", { required: true })}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="genre"
              >
                <option value="" disabled selected>
                  Genre
                </option>
                <option>Fantasy</option>
                <option>Horror</option>
                <option>Action</option>
              </select>
              {errors.genre && (
                <p className="text-red-500 text-xs italic">Genre is required</p>
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="featured"
            >
              Featured
            </label>
            <div className="relative">
              <select
                {...register("featured")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="featured"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Post Movie
            </label>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight hover:bg-blue-700"
            >
              {loading ? "Posting...." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// <button onClick={handleNewMovie}>Create new movie</button>

// const [ws, setWs] = useState();

// useEffect(() => {
//   const ws = new WebSocket("ws://" + window.location.host);
//   ws.onopen = (event) => {
//     console.log("Opened", event);
//   };
//   ws.onmessage = async (event) => {
//     // gets data back from server
//     const data = await JSON.parse(event.data);
//     setMovieData(data);
//   };
//   setWs(ws);
// }, []);
//
