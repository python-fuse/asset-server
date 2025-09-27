import { Router } from "express";
import { validate } from "../middleware/validator";
import MovementValidator from "../validators/movement.validator";
import movementController from "../controllers/movement.controller";

const router = Router();

router.post(
  "/",
  validate(MovementValidator.createMovement()),
  movementController.createMovement
);
router.get("/", movementController.getAllMovements);
router.get(
  "/:id",
  validate(MovementValidator.validateMovementId()),
  movementController.getMovementById
);
router.get(
  "/asset/:id",
  validate(MovementValidator.validateAssetId()),
  movementController.getMovementsByAssetId
);
router.get(
  "/user/:id",
  validate(MovementValidator.validateUserId()),
  movementController.getMovementsByUserId
);

export default router;
