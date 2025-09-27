import { Router } from "express";
import upload from "../middleware/uploadHandler";
import { validate } from "../middleware/validator";
import AssetValidator from "../validators/asset.validator";

const router = Router();

// Import controllers
import assetsController from "../controllers/assets.controller";

// Define routes
router.post(
  "/",
  upload.single("file"),
  validate(AssetValidator.createAsset()),
  assetsController.createAsset
);
router.get("/", assetsController.getAllAssets);
router.get(
  "/:id",
  validate(AssetValidator.validateAssetId()),
  assetsController.getAssetById
);
router.put(
  "/:id",
  validate(AssetValidator.updateAsset()),
  assetsController.updateAsset
);
router.delete(
  "/:id",
  validate(AssetValidator.validateAssetId()),
  assetsController.deleteAsset
);

export default router;
