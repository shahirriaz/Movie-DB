import { Header } from "./Header";
import { genres } from "../data/genres";

function Sidebar() {
  return (
    <div className="w-1/2 max-w-xs border height bg-gray-300">
      <div className="ml-5 mt-3">
        <h2 className="font-semibold">Top movies rated by Genres</h2>
        <div className="mt-2">
          <ul>{genres.map((genre) => genre)}</ul>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-2 mr-2 w-full">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
