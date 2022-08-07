export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to load");
  }
  return await res.json();
}
