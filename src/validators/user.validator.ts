import { body, param, ValidationChain } from "express-validator";

class UserValidator {
  // Validate user creation
  createUser(): ValidationChain[] {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
          "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),

      body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["ADMIN", "AUDITOR", "ASSET_MANAGER"])
        .withMessage("Role must be one of: ADMIN, AUDITOR, ASSET_MANAGER"),
    ];
  }

  // Validate user update
  updateUser(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("User ID must be a valid UUID"),

      body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

      body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

      body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
          "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),

      body("role")
        .optional()
        .isIn(["ADMIN", "AUDITOR", "ASSET_MANAGER"])
        .withMessage("Role must be one of: ADMIN, AUDITOR, ASSET_MANAGER"),
    ];
  }

  // Validate user ID parameter
  validateUserId(): ValidationChain[] {
    return [param("id").isUUID().withMessage("User ID must be a valid UUID")];
  }
}

export default new UserValidator();
