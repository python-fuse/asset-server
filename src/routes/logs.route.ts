import { Router } from "express";
import { validate } from "../middleware/validator";
import LogValidator from "../validators/log.validator";

const router = Router();

// Import controllers
import logsController from "../controllers/logs.controller";

// Define routes
router.get("/", logsController.getAllLogs);
router.get(
  "/asset/:id",
  validate(LogValidator.validateAssetId()),
  logsController.getLogsByAssetId
);
router.get(
  "/user/:id",
  validate(LogValidator.validateUserId()),
  logsController.getLogsByUserId
);

export default router;
