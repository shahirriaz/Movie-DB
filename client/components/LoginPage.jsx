import { useEffect } from "react";
import { fetchJSON } from "../utils/FetchJSON";

export function LoginPage() {
  // const { discovery_endpoint, client_id, response_type } =
  //   useContext(LoginContext);

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const parameters = {
      response_type: "token",
      client_id:
        "946080345339-uhfncmu533tmardmeiiauepicqe3prlo.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <div>
      <h1>Please wait...</h1>
    </div>
  );
}
