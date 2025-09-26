// Import necessary modules and types
import { Request, Response, NextFunction } from "express";
import { Asset } from "@prisma/client";

// Import service layer
import assetService from "../services/assets.service";
import logsService from "../services/logs.service";

import { ApiError } from "../middleware/errorHandler";

class AssetController {
  async createAsset(req: Request, res: Response, next: NextFunction) {
    const { name, description, categoryId, acquisitionDate, location }: Asset =
      req.body;
    const createdById = req.session.userId;

    if (!createdById) {
      return next(new ApiError(401, "Unauthorized"));
    }

    try {
      const newAsset = await assetService.createAsset({
        name,
        description,
        categoryId,
        createdById,
        acquisitionDate,
        location,
      });

      await logsService.createLog({
        action: "REGISTERED",
        assetId: newAsset.id,
        timestamp: new Date(),
        userId: createdById,
      });

      res.status(201).json(newAsset);
      return;
    } catch (e) {
      next(e);
      return;
    }
  }

  async getAssetById(req: Request, res: Response, next: NextFunction) {
    const assetId = req.params.id;

    try {
      const asset = await assetService.getAssetById(assetId);
      if (!asset) {
        return next(new ApiError(404, "Asset not found"));
      }
      res.status(200).json(asset);
    } catch (e) {
      next(e);
    }
  }

  async getAllAssets(req: Request, res: Response, next: NextFunction) {
    try {
      const assets = await assetService.getAllAssets();
      res.status(200).json(assets);
    } catch (e) {
      next(e);
    }
  }

  async updateAsset(req: Request, res: Response, next: NextFunction) {
    const assetId = req.params.id;
    const {
      name,
      description,
      categoryId,
      status,
      acquisitionDate,
      location,
    }: Partial<Asset> = req.body;

    try {
      const updatedAsset = await assetService.updateAsset(assetId, {
        name,
        description,
        categoryId,
        status,
        acquisitionDate,
        location,
      });

      if (!updatedAsset) {
        return next(new ApiError(404, "Asset not found"));
      }

      await logsService.createLog({
        action: "UPDATED",
        assetId: updatedAsset.id,
        timestamp: new Date(),
        userId: req.session.userId!,
      });

      res.status(200).json(updatedAsset);
    } catch (e) {
      next(e);
    }
  }

  async deleteAsset(req: Request, res: Response, next: NextFunction) {
    const assetId = req.params.id;

    try {
      const deletedAsset = await assetService.deleteAsset(assetId);
      res.status(200).json(deletedAsset);
    } catch (e) {
      next(e);
    }
  }
}

export default new AssetController();
