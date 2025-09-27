import { param, ValidationChain } from "express-validator";

class LogValidator {
  // Validate asset ID parameter for logs by asset
  validateAssetId(): ValidationChain[] {
    return [param("id").isUUID().withMessage("Asset ID must be a valid UUID")];
  }

  // Validate user ID parameter for logs by user
  validateUserId(): ValidationChain[] {
    return [param("id").isUUID().withMessage("User ID must be a valid UUID")];
  }
}

export default new LogValidator();
