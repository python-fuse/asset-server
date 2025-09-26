// Import necessary modules and types
import { Request, Response, NextFunction } from "express";
import { Log } from "@prisma/client";

// Import service layer
import logsService from "../services/logs.service";

class LogsController {
  async getAllLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const logs: Log[] = await logsService.getAllLogs();
      res.status(200).json(logs);
    } catch (e) {
      next(e);
    }
  }

  async getLogsByAssetId(req: Request, res: Response, next: NextFunction) {
    const assetId = req.params.id;

    try {
      const logs = await logsService.getLogsByAssetId(assetId);
      res.status(200).json(logs);
    } catch (e) {
      next(e);
    }
  }

  async getLogsByUserId(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    try {
      const logs = await logsService.getLogsByUserId(userId);
      res.status(200).json(logs);
    } catch (e) {
      next(e);
    }
  }
}

export default new LogsController();
