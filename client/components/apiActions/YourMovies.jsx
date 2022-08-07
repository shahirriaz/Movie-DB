import { ActionHeader } from "./ActionHeader";
import { APIContext } from "../../App";
import { useLoading } from "../../utils/UseLoading";
import { useContext } from "react";
import { getTimeStamps } from "../../utils/getTimeStamps";

export function YourMovies() {
  const { getMovies } = useContext(APIContext);
  const { loading, error, data } = useLoading(async () => getMovies(), []);

  let filter = data?.filter(({ author }) => author === "Shahir Riaz");

  let map = filter?.map((item) => {
    let updatedAt = new Date(item["updatedAt"]);
    let createdAt = new Date(item["createdAt"]);
    const { updatedAtTime, createdAtTime } = getTimeStamps(
      updatedAt,
      createdAt
    );

    return {
      title: item["title"],
      author: item["author"],
      updatedAtTime,
      createdAtTime,
    };
  });

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  function getTr() {
    return (
      <tr>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Title
        </th>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Author
        </th>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Last updated
        </th>{" "}
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Created
        </th>
      </tr>
    );
  }

  return (
    <div>
      <ActionHeader actionTxt="Your movies" />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">{getTr()}</thead>
                <tbody>
                  {map.map((item) => {
                    return (
                      <tr>
                        {Object.values(item).map((value) => (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                            {value}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
