import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { LoginCallback } from "./helpers/LoginCallback";
import { ListMovies } from "./components/ListMovies";
import { FrontPage } from "./components/FrontPage";
import { LoginPage } from "./components/LoginPage";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig/authConfig";
import Layout from "./components/Layout";
import { MovieDetails } from "./components/MovieDetails";
import { Admin } from "./components/Admin";
import { DynamicComponent } from "./components/DynamicComponent";
import { createContext, useEffect, useState } from "react";

export const MovieDataContext = createContext({});

export function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  const [movieData, setMovieData] = useState([]);

  //Todo: create paywall

  return (
    <MovieDataContext.Provider value={{ movieData, setMovieData }}>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <Layout>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/callback" element={<LoginCallback />} />
              <Route path="/movies" element={<ListMovies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/:action" element={<DynamicComponent />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </MsalProvider>
      </BrowserRouter>
    </MovieDataContext.Provider>
  );
}
