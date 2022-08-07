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
import { fetchJSON } from "./utils/FetchJSON";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export const APIContext = createContext({
  async getMovies() {
    return fetchJSON("/api/movies");
  },
  async postMovie(movie) {
    return fetch("/api/movies/new", {
      method: "POST",
      body: JSON.stringify(movie),
      headers,
    });
  },
  update: "",
  delete: "",
});

export function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  //Todo: create paywall

  return (
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
  );
}
