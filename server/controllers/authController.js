import { fetchJSON } from "../utils/fetchJSON.js";
import fetch from "node-fetch";

async function googleConfig() {
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const { userinfo_endpoint, authorization_endpoint } = await fetchJSON(
    discovery_endpoint
  );
  return {
    response_type: "token",
    authorization_endpoint,
    scope: "profile email",
    userinfo_endpoint,
    client_id,
  };
}

async function fetchUser(access_token, config) {
  const userinfo = await fetch(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (userinfo.ok) {
    return await userinfo.json();
  } else {
    console.log(`Failed to fetch token: ${userinfo.status}`);
    return undefined;
  }
}

export function getUserInfo() {
  return async (req, res) => {
    const config = {
      google: await googleConfig(),
    };

    const response = { config, user: {} };

    const { google_access_token } = req.signedCookies;

    if (google_access_token) {
      response.user.roles = "VIEWER";
      response.user.google = await fetchUser(
        google_access_token,
        config.google
      );
    }

    res.json(response);
  };
}

export function setAccessToken() {
  return (req, res, next) => {
    const { provider } = req.params;
    const { access_token } = req.body;
    console.log(access_token);
    res.cookie(`${provider}_access_token`, access_token, { signed: true });
    res.sendStatus(200);
    next();
  };
}
