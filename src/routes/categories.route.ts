import { Router } from "express";

const router = Router();

// Import controllers
import categoriesController from "../controllers/categories.controller";

// Routes
router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post("/", categoriesController.createCategory);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

export default router;
