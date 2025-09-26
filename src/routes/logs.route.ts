import { Router } from "express";

const router = Router();

// Import controllers
import logsController from "../controllers/logs.controller";

// Define routes
router.get("/", logsController.getAllLogs);
router.get("/asset/:id", logsController.getLogsByAssetId);
router.get("/user/:id", logsController.getLogsByUserId);

export default router;
