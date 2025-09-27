import { body, param, ValidationChain } from "express-validator";

class AssetValidator {
  // Validate asset creation
  createAsset(): ValidationChain[] {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Asset name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Asset name must be between 2 and 100 characters"),

      body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),

      body("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        .isUUID()
        .withMessage("Category ID must be a valid UUID"),

      body("acquisitionDate")
        .notEmpty()
        .withMessage("Acquisition date is required")
        .isISO8601()
        .withMessage("Acquisition date must be a valid ISO 8601 date")
        .custom((value) => {
          const date = new Date(value);
          const now = new Date();
          if (date > now) {
            throw new Error("Acquisition date cannot be in the future");
          }
          return true;
        }),

      body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required")
        .isLength({ min: 2, max: 200 })
        .withMessage("Location must be between 2 and 200 characters"),

      body("image_url")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    ];
  }

  // Validate asset update
  updateAsset(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Asset ID must be a valid UUID"),

      body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Asset name must be between 2 and 100 characters"),

      body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),

      body("categoryId")
        .optional()
        .isUUID()
        .withMessage("Category ID must be a valid UUID"),

      body("status")
        .optional()
        .isIn(["AVAILABLE", "ASSIGNED", "MAINTENANCE", "DISPOSED"])
        .withMessage(
          "Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, DISPOSED"
        ),

      body("acquisitionDate")
        .optional()
        .isISO8601()
        .withMessage("Acquisition date must be a valid ISO 8601 date")
        .custom((value) => {
          if (value) {
            const date = new Date(value);
            const now = new Date();
            if (date > now) {
              throw new Error("Acquisition date cannot be in the future");
            }
          }
          return true;
        }),

      body("location")
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage("Location must be between 2 and 200 characters"),

      body("image_url")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    ];
  }

  // Validate asset ID parameter
  validateAssetId(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Asset ID must be a valid UUID")];
  }
}

export default new AssetValidator();
