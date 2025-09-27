import { body, ValidationChain } from "express-validator";

class AuthValidator {
  // Validate user registration
  register(): ValidationChain[] {
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
        .withMessage("Password must be at least 8 characters long"),
      body("role")
        .optional()
        .isIn(["ADMIN", "AUDITOR", "ASSET_MANAGER"])
        .withMessage("Role must be one of: ADMIN, AUDITOR, ASSET_MANAGER"),
    ];
  }

  // Validate user login
  login(): ValidationChain[] {
    return [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

      body("password").notEmpty().withMessage("Password is required"),
    ];
  }
}

export default new AuthValidator();
