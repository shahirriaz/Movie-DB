import { Link } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SigninButton";
import { SignOutButton } from "./SignOutButton";
import { ListMovies } from "./ListMovies";

export function FrontPage() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="flex min-h-screen">
      <div className="mt-3.5 mb-10">
        <h3 className="border-b-2 border-y-gray-100 text-3xl mb-4">
          Featured films
        </h3>
        <ListMovies featuredMovies />
      </div>
    </div>
  );
}

// <ul>
//   <li>
//     <Link to="/movies">List movies</Link>
//   </li>
//   <li>
//     <Link to="/movies/new">Add new movie</Link>
//   </li>
//   <li>
//     <Link to="/login">Log in with Google</Link>
//   </li>
//   <li>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</li>
//   <li>
//     <Link to="/profile">Profile</Link>
//   </li>
// </ul>
//
