import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { LoginCallback } from "./helpers/LoginCallback";
import { ListMovies } from "./components/ListMovies";
import { FrontPage } from "./components/FrontPage";
import Layout from "./components/Layout";
import { MovieDetails } from "./components/MovieDetails";
import { Admin } from "./components/Admin";
import { DynamicComponent } from "./components/DynamicComponent";
import { ListMoviesByCategory } from "./components/ListMoviesByCategory";
import { ProvideAuth } from "./hooks/use-auth";
import { LoginDirect } from "./modals/LoginDirect";
import { RequireAuth } from "./auth/requireAuth";
import { SCOPES } from "./auth/permissions";

//Todo: create profile
//Todo: create tests

export function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<LoginDirect />} />
            <Route path="/movies" element={<ListMovies />} />
            <Route
              path={"/login/:provider/callback"}
              element={<LoginCallback />}
            />
            <Route path="/:genre" element={<ListMoviesByCategory />} />
            <Route
              path="/movies/:id"
              element={
                <RequireAuth scopes={[SCOPES.canView]}>
                  <MovieDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth
                  scopes={[SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete]}
                >
                  <Admin />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/:action"
              element={
                <RequireAuth
                  scopes={[SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete]}
                >
                  <DynamicComponent />
                </RequireAuth>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProvideAuth>
  );
}
