import { ActionHeader } from "./ActionHeader";
import { APIContext } from "../../App";
import { useLoading } from "../../utils/UseLoading";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function YourMovies() {
  const { getMovies } = useContext(APIContext);
  const { loading, error, data } = useLoading(async () => getMovies(), []);

  let filter = data?.filter(({ author }) => author === "Shahir Riaz");

  let map = filter?.map((item) => {
    let date = new Date(item["updatedAt"]);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let fullYear = date.getFullYear();
    let month = months[date.getMonth()];
    let day = days[date.getDay()];
    let dayNr = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    console.log(dayNr);

    const time =
      day +
      " " +
      dayNr +
      " " +
      month +
      " / " +
      fullYear +
      " " +
      hours +
      ":" +
      minutes;

    return {
      title: item["title"],
      author: item["author"],
      updatedAt: time,
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
