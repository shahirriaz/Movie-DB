import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionHeader } from "./ActionHeader";

export function AddNewMovie() {
  // const { setMovieData } = useContext(MovieDataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ws, setWs] = useState();

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
  const onSubmit = (data) => {
    // ws?.send(JSON.stringify({ data }));
  };

  return (
    <div>
      <ActionHeader actionTxt="Add new movie" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              {...register("title")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
              placeholder="Batman"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="year"
            >
              Year
            </label>
            <input
              {...register("year")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="year"
              type="text"
              placeholder="1987"
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
              {...register("poster")}
              className=" resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="coverPhoto"
              type="text"
              placeholder="https//somethin/.com/img.jpg"
            />
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
              {...register("fullPlot")}
              className=" h-32 resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="fullplot"
              placeholder="Full Plot"
            />
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
                {...register("genre")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="genre"
              >
                <option>Fantasy</option>
                <option>Horror</option>
                <option>Action</option>
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
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// <button onClick={handleNewMovie}>Create new movie</button>
