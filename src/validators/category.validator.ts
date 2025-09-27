import { body, param, ValidationChain } from "express-validator";

class CategoryValidator {
  // Validate category creation
  createCategory(): ValidationChain[] {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Category name must be between 2 and 100 characters"),

      body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    ];
  }

  // Validate category update
  updateCategory(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Category ID must be a valid UUID"),

      body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Category name must be between 2 and 100 characters"),

      body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    ];
  }

  // Validate category ID parameter
  validateCategoryId(): ValidationChain[] {
    return [
      param("id").isUUID().withMessage("Category ID must be a valid UUID"),
    ];
  }
}

export default new CategoryValidator();
