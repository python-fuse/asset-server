import { Router } from "express";
import { validate } from "../middleware/validator";
import UserValidator from "../validators/user.validator";
import userController from "../controllers/user.controller";

const router = Router();
router.get("/", userController.getUsers);
router.get(
  "/:id",
  validate(UserValidator.validateUserId()),
  userController.getUser
);
router.post(
  "/",
  validate(UserValidator.createUser()),
  userController.createUser
);
router.delete(
  "/:id",
  validate(UserValidator.validateUserId()),
  userController.deleteUser
);

export default router;
