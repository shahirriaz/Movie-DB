import { Router } from "express";
import {
  getUserInfo,
  setAccessToken,
} from "../../controllers/authController.js";

export function LoginApi() {
  const router = new Router();

  router.route("/").get(getUserInfo()).post(setAccessToken());

  return router;
}
