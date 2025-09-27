import { Response, Request, NextFunction } from "express";

import categoriesService from "../services/categories.service";

import { ApiError } from "../middleware/errorHandler";

class CategoriesController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoriesService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(new ApiError(500, "Failed to fetch categories"));
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.id;
      const category = await categoriesService.getCategoryById(categoryId);
      if (!category) {
        return next(new ApiError(404, "Category not found"));
      }
      res.status(200).json(category);
    } catch (error) {
      next(new ApiError(500, "Failed to fetch category"));
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryData = req.body;
      const newCategory = await categoriesService.createCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      next(new ApiError(500, "Failed to create category"));
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.id;
      const categoryData = req.body;
      const updatedCategory = await categoriesService.updateCategory(
        categoryId,
        categoryData
      );
      if (!updatedCategory) {
        return next(new ApiError(404, "Category not found"));
      }
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(new ApiError(500, "Failed to update category"));
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.id;
      const deleted = await categoriesService.deleteCategory(categoryId);
      if (!deleted) {
        return next(new ApiError(404, "Category not found"));
      }
      res.status(204).send();
    } catch (error) {
      next(new ApiError(500, "Failed to delete category"));
    }
  }
}

export default new CategoriesController();
