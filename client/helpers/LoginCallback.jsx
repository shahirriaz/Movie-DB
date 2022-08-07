import { useEffect } from "react";

export function LoginCallback() {
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    window.location.href = "/";
  }, []);

  return <h1>Please wait</h1>;
}
