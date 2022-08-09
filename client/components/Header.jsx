import { SignInButton } from "./SigninButton";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignOutButton } from "./SignOutButton";
import { useAuth } from "../hooks/use-auth";
import { decodeMSToken } from "../auth/requireAuth";

export function Header() {
  const auth = useAuth();
  const userIsPresent = auth.user && Object.keys(auth.user).length > 0;
  const res = decodeMSToken();

  const adminIsLoggedIn = res !== null;

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <a>
            <span className="font-semibold text-xl tracking-tight">
              Movie application
            </span>
          </a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/movies">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              List Movies
            </a>
          </Link>
          <Link to="/admin">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Admin
            </a>
          </Link>
        </div>
        {/*<Link to="/profile">*/}
        {/*  <a>Profile</a>*/}
        {/*</Link>*/}
        <div className="flex items-center">
          <div className="mr-2">
            {adminIsLoggedIn ? (
              <SignOutButton provider="microsoft" btnTxt="Sign out as admin" />
            ) : userIsPresent ? (
              <SignOutButton provider="google" btnTxt="Sign out as user" />
            ) : (
              <SignInButton btnTxt="Sign in as user" provider="google" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
