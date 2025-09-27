import { body, param, ValidationChain } from "express-validator";

class MovementValidator {
  // Validate movement creation
  createMovement(): ValidationChain[] {
    return [
      body("assetId")
        .notEmpty()
        .withMessage("Asset ID is required")
        .isUUID()
        .withMessage("Asset ID must be a valid UUID"),

      body("fromLocation")
        .trim()
        .notEmpty()
        .withMessage("From location is required")
        .isLength({ min: 2, max: 200 })
        .withMessage("From location must be between 2 and 200 characters"),

      body("toLocation")
        .trim()
        .notEmpty()
        .withMessage("To location is required")
        .isLength({ min: 2, max: 200 })
        .withMessage("To location must be between 2 and 200 characters")
        .custom((value, { req }) => {
          if (value === req.body.fromLocation) {
            throw new Error("To location must be different from from location");
          }
          return true;
        }),

      body("dateMoved")
        .optional()
        .isISO8601()
        .withMessage("Date moved must be a valid ISO 8601 date")
        .custom((value) => {
          if (value) {
            const date = new Date(value);
            const now = new Date();
            if (date > now) {
              throw new Error("Date moved cannot be in the future");
            }
          }
          return true;
        }),

      body("reason")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Reason must not exceed 500 characters"),
    ];
  }

  // Validate movement ID parameter
  validateMovementId(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Movement ID must be a valid UUID"),
    ];
  }

  // Validate asset ID parameter for movements by asset
  validateAssetId(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Asset ID must be a valid UUID")];
  }

  // Validate user ID parameter for movements by user
  validateUserId(): ValidationChain[] {
    return [param("id").isUUID().withMessage("User ID must be a valid UUID")];
  }
}

export default new MovementValidator();
