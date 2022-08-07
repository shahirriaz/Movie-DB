import { useForm } from "react-hook-form";
import { useLoading } from "../../utils/UseLoading";
import { useContext, useState } from "react";
import { ActionHeader } from "./ActionHeader";

import { APIContext } from "../../App";

export function UpdateMovie() {
  const { getMovies, updateMovie } = useContext(APIContext);
  const { register, handleSubmit, watch } = useForm();

  const [loadingData, setLoadingData] = useState(false);

  const { data } = useLoading(async () => getMovies(), []);

  let filter = data?.filter(({ title }) => title === watch("movie"));
  let isArray = filter?.length > 0;

  const onSubmit = async ({
    title,
    year,
    poster,
    fullPlot,
    plot,
    genre,
    featured,
  }) => {
    if (featured === "Yes") {
      featured = Boolean(true);
    } else {
      featured = Boolean(false);
    }
    const { _id: id } = filter?.find(
      ({ title: titleFromDb }) => titleFromDb === watch("movie")
    );

    try {
      setLoadingData(true);
      await updateMovie({
        id,
        title,
        year,
        poster,
        fullPlot,
        plot,
        genre,
        featured,
      }).then((response) => {
        if (response.status === 209) {
          alert(`No movie with id ${id} found`);
        }
        alert("Your movie was successfully updated");
        setLoadingData(false);
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <ActionHeader actionTxt="Update movie" />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full   px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="genre"
            >
              Choose Movie
            </label>
            <div className="relative">
              <select
                {...register("movie")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="genre"
              >
                <option value="" disabled selected>
                  Choose movie
                </option>
                {data?.map(({ title }) => {
                  return <option>{title}</option>;
                })}
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
            <p className="text-gray-600 text-xs italic py-1">
              Movie showed in the list is posted by you
            </p>
          </div>
        </div>

        {watch("movie") && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  {...register("title")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="text"
                  placeholder={isArray && filter[0].title}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="year"
                >
                  Year
                </label>
                <input
                  {...register("year")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="year"
                  type="text"
                  placeholder={isArray && filter[0].year}
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
                  placeholder={isArray && filter[0].poster}
                />
                <p className="text-gray-600 text-xs italic mb-2">
                  Cover image perhaps?
                </p>
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="fullplot"
                >
                  Full Plot
                </label>
                <textarea
                  {...register("fullPlot")}
                  className=" h-32 resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fullplot"
                  placeholder={isArray && filter[0].fullPlot}
                />
                <p className="text-gray-600 text-xs italic mb-2">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shortPlot"
                >
                  Short plot
                </label>
                <input
                  {...register("plot")}
                  className=" resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="shortPlot"
                  type="text"
                  placeholder={isArray && filter[0].plot}
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
                    <option>{isArray && filter[0].genre}</option>
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
                  htmlFor="featured"
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
                  Update movie
                </label>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight hover:bg-blue-700"
                >
                  {loadingData ? "Updating movie" : "Update"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
