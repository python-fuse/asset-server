import { Router } from "express";
import { validate } from "../middleware/validator";
import CategoryValidator from "../validators/category.validator";

const router = Router();

// Import controllers
import categoriesController from "../controllers/categories.controller";

// Routes
router.get("/", categoriesController.getAllCategories);
router.get(
  "/:id",
  validate(CategoryValidator.validateCategoryId()),
  categoriesController.getCategoryById
);
router.post(
  "/",
  validate(CategoryValidator.createCategory()),
  categoriesController.createCategory
);
router.put(
  "/:id",
  validate(CategoryValidator.updateCategory()),
  categoriesController.updateCategory
);
router.delete(
  "/:id",
  validate(CategoryValidator.validateCategoryId()),
  categoriesController.deleteCategory
);

export default router;
