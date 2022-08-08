import { useForm } from "react-hook-form";
import { useLoading } from "../../utils/UseLoading";
import { fetchJSON } from "../../utils/FetchJSON";
import { ActionHeader } from "./ActionHeader";

export function DeleteMovie() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/movies")
  );

  return (
    <>
      <ActionHeader actionTxt="Delete movie" />

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full  px-3 mb-6 md:mb-0">
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
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="genre"
          >
            Delete movie
          </label>
          <button
            type="submit"
            className="w-full bg-red-400 text-white border border-gray-200 rounded py-3 px-4  hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
