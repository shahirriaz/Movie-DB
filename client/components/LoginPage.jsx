import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { LoginCallback } from "../helpers/LoginCallback";
import { APIContext } from "../context/APIContext";
import { useContext, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

export function LoginPage() {
  const { googleData: config } = useAuth();

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<StartLogin config={config} />} />
        <Route path={"*"} element={<StartLogin config={config} />} />
      </Routes>
    </div>
  );
}

function StartLogin({ config }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton
        label={"Login with Google"}
        config={config}
        provider={"google"}
      />
      <LoginButton
        label={"Login with ID-porten"}
        config={config}
        provider={"idporten"}
      />
    </div>
  );
}

function LoginButton({ config, label, provider }) {
  async function handleLogin() {
    const { authorization_endpoint, response_type, scope, client_id } =
      config[provider];

    const parameters = {
      response_type,
      client_id,
      scope,
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  return (
    <div>
      <button onClick={handleLogin}>{label}</button>
    </div>
  );
}
