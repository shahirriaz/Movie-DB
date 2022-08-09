import { fetchJSON } from "../utils/FetchJSON";
import { createContext } from "react";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export const APIContext = createContext({
  async getMovies(genre = "") {
    return fetchJSON(`/api/movies/?genre=${genre}`);
  },
  async postMovie(movie) {
    return fetch("/api/movies/new", {
      method: "POST",
      body: JSON.stringify(movie),
      headers,
    });
  },
  async updateMovie(movie) {
    return fetch(`/api/movies/update`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers,
    });
  },
  async deleteMovie(movie) {
    return fetch(`/api/movies/delete`, {
      method: "DELETE",
      body: JSON.stringify(movie),
      headers,
    });
  },
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async registerLogin(provider, login) {
    return fetch(`/api/login/${provider}`, {
      method: "POST",
      body: JSON.stringify(login),
      headers,
    });
  },
  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
