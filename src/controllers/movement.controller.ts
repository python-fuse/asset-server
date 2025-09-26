// Import necessary modules and types
import { Request, Response, NextFunction } from "express";

// Import service layer
import movementService from "../services/movement.service";
import assetService from "../services/assets.service";
import logsService from "../services/logs.service";

import { ApiError } from "../middleware/errorHandler";

class MovementController {
  async createMovement(req: Request, res: Response, next: NextFunction) {
    const { assetId, fromLocation, toLocation, reason } = req.body;

    const movedById = req.session.userId;
    if (!movedById) {
      return next(new ApiError(401, "Unauthorized"));
    }

    try {
      const asset = await assetService.getAssetById(assetId);
      if (!asset) {
        next(new ApiError(404, "Asset not found"));
        return;
      }
    } catch (e) {
      next(e);
    }

    try {
      const newMovement = await movementService.createMovement({
        assetId,
        fromLocation,
        toLocation,
        movedById,
        dateMoved: new Date(),
      });

      await logsService.createLog({
        action: "MOVED",
        assetId,
        timestamp: new Date(),
        userId: movedById,
      });
    } catch (e) {
      next(e);
    }
  }

  async getMovementsByAssetId(req: Request, res: Response, next: NextFunction) {
    const assetId = req.params.id;

    try {
      const movements = await movementService.getMovementsByAssetId(assetId);
      res.status(200).json(movements);
    } catch (e) {
      next(e);
    }
  }

  async getAllMovements(req: Request, res: Response, next: NextFunction) {
    try {
      const movements = await movementService.getAllMovements();
      res.status(200).json(movements);
    } catch (e) {
      next(e);
    }
  }

  async getMovementById(req: Request, res: Response, next: NextFunction) {
    const movementId = req.params.id;

    try {
      const movement = await movementService.getMovementById(movementId);
      if (!movement) {
        return next(new ApiError(404, "Movement not found"));
      }
      res.status(200).json(movement);
    } catch (e) {
      next(e);
    }
  }
}

export default new MovementController();
