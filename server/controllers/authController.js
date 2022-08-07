import { fetchJSON } from "../utils/fetchJSON.js";

export function setAccessToken() {
  return (req, res, next) => {
    const { access_token } = req.body;
    res.cookie("access_token", access_token, { signed: true });
    res.sendStatus(200);
    next();
  };
}

export function getUserInfo() {
  return async (req, res, next) => {
    const { access_token } = req.signedCookies;

    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const userInfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json({ userInfo });
  };
}
