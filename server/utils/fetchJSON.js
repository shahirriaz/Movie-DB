import fetch from "node-fetch";

export async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to load");
  }
  return await res.json();
}
