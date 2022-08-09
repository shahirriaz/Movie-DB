import { Header } from "./Header";
import { genres } from "../data/genres";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-1/2 max-w-xs border height bg-gray-300 ">
      <div className="ml-5 mt-3">
        <h2 className="block uppercase tracking-wide text-gray-700 text-x font-bold mt-3 mb-2">
          Top movies rated by Genres
        </h2>
        <div className="mt-2 flex flex-col">
          {genres.map((genre) => {
            return (
              <Link to={`/${genre.toLowerCase()}`}>
                <a className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {genre}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="flex min-h-screen ">
        <Sidebar />
        <div className="ml-2 mr-2 w-full">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
