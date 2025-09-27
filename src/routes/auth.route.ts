import authController from "../controllers/auth.controller";
import { Router } from "express";
import { validate } from "../middleware/validator";
import AuthValidator from "../validators/auth.validator";

const authRouter = Router();

authRouter.get("/me", authController.getUserInfo);
authRouter.post(
  "/register",
  validate(AuthValidator.register()),
  authController.register
);
authRouter.post(
  "/login",
  validate(AuthValidator.login()),
  authController.login
);
authRouter.post("/logout", authController.logout);

export default authRouter;
