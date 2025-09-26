import { Router } from "express";
import upload from "../middleware/uploadHandler";
const router = Router();

// Import controllers
import assetsController from "../controllers/assets.controller";

// Define routes
router.post("/", upload.single("file"), assetsController.createAsset);
router.get("/", assetsController.getAllAssets);
router.get("/:id", assetsController.getAssetById);
router.put("/:id", assetsController.updateAsset);
router.delete("/:id", assetsController.deleteAsset);

export default router;
