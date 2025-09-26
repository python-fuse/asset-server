import { Router } from "express";

import movementController from "../controllers/movement.controller";

const router = Router();

router.get("/", movementController.getAllMovements);
router.get("/asset/:id", movementController.getMovementsByAssetId);
router.get("/user/:id", movementController.getMovementsByUserId);

export default router;
