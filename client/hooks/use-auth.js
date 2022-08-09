// Provider hook that creates auth object and handles state
import { createContext, useContext, useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "../authConfig/authConfig";
import { APIContext } from "../context/APIContext";
import { useLoading } from "../utils/UseLoading";
import jwt_decode from "jwt-decode";

const authContext = createContext({});

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const [user, setUser] = useState({});
  const { fetchLogin, endSession: endGoogleSession } = useContext(APIContext);
  const { data: googleData, reload } = useLoading(fetchLogin);

  useEffect(() => {
    setUser(googleData?.user);
  }, [googleData]);

  const msalInstance = new PublicClientApplication(msalConfig);

  async function handleMicrosoftLogin(msalInstance) {
    await msalInstance
      .loginPopup(loginRequest)
      .then((item) => {
        localStorage.setItem("microsoft", item.accessToken);
      })
      .catch((e) => {
        console.error(e);
      });

    await endGoogleSession();
    await reload();

    window.location.href = "/admin";
  }

  async function handleMicrosoftLogout(instance) {
    localStorage.removeItem("microsoft");
    // await instance.logoutPopup().catch((e) => {
    //   console.error(e);
    // });
    window.location.href = "/";
  }

  async function handleGoogleLogin(provider) {
    const { authorization_endpoint, response_type, scope, client_id } =
      googleData?.config[provider];
    const parameters = {
      response_type,
      client_id,
      scope,
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  async function handleGoogleLogout() {
    await endGoogleSession();
    await reload();
    window.location.href = "/";
  }

  return {
    user,
    handleMicrosoftLogin,
    handleMicrosoftLogout,
    handleGoogleLogin,
    handleGoogleLogout,
    msalInstance,
    googleData,
    reload,
  };
}
