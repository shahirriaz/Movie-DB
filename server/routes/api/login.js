import { Router } from "express";
import {
  getUserInfo,
  setAccessToken,
} from "../../controllers/authController.js";

export function LoginApi() {
  const router = new Router();

  router.get("/", getUserInfo());

  router.post("/:provider", setAccessToken());

  router.delete("/", (req, res) => {
    res.clearCookie("google_access_token");
    res.sendStatus(200);
  });

  return router;
}
