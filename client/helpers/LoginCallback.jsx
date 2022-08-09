import { useEffect, useContext } from "react";
import { APIContext } from "../context/APIContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export function LoginCallback() {
  const { reload } = useAuth();
  const { registerLogin } = useContext(APIContext);
  const { provider } = useParams();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    await registerLogin(provider, { access_token });
    reload();
    window.location.href = "/";
  }, []);

  return <h1>Please wait</h1>;
}
