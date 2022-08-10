import { Header } from "./Header";
import { genres } from "../data/genres";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { decodeMSToken } from "../auth/requireAuth";

function Sidebar() {
  const auth = useAuth();
  const res = decodeMSToken();

  const userIsPresent = auth.user && Object.keys(auth.user).length > 0;

  const adminIsLoggedIn = res !== null;

  return (
    <div className="relative w-64 h-full">
      <div className="fixed h-screen flex flex-col w-64 border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/">
              <a>
                <img
                  className="h-16 w-auto"
                  src="https://img.freepik.com/premium-vector/clapper-film-movie-icon-design_24877-23150.jpg"
                  alt="Workflow"
                />
              </a>
            </Link>
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {genres.map((genre) => {
              return (
                <Link onClick={handleCLick} to={`/${genre.toLowerCase()}`}>
                  <a
                    className={`hover:bg-gray-50 hover:text-gray-900  text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {genre}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          {userIsPresent ? (
            <div className="flex flex-1 items-center">
              <img
                className="w-10 h-10 rounded mr-2"
                src={auth?.user?.google?.picture}
                alt="Default avatar"
              />
              <div className="flex flex-col">
                <span className="text-gray-900  px-2 py-2 text-sm font-medium rounded-md">
                  {auth?.user?.google?.name}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}

          {res && (
            <div className="flex flex-1 items-center">
              <img
                className="w-10 h-10 rounded mr-2"
                src="https://img.freepik.com/free-vector/mysterious-mafia-man-wearing-hat_52683-34829.jpg?w=1380&t=st=1660092875~exp=1660093475~hmac=04385db68773ee7b3b68658e04edeef340215d3716536ba354a07901a7213704"
                alt="Default avatar"
              />
              <div className="flex flex-col">
                <span className="text-gray-900  px-2 text-sm font-medium rounded-md">
                  {res?.name}
                </span>
                <span className="text-gray-900  px-2 text-sm font-medium rounded-md">
                  {res?.email}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="flex min-h-screen overflow-y-auto">
      <div className="flex-shrink">
        <Sidebar />
      </div>
      <div className="flex-shrink w-full">
        <main>
          <header className="">
            <Header />
          </header>
          <div className="p-8 min-h-screen">{children}</div>
          <footer className="bg-red-400 p-8">footer</footer>
        </main>
      </div>
    </div>
  );
}

export default Layout;
