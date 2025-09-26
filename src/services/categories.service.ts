import prisma from "../utils/prisma";

class CategoriesService {
  async getAllCategories() {
    return prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async createCategory(data: any) {
    return prisma.category.create({
      data,
    });
  }

  async updateCategory(id: string, data: any) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
export default new CategoriesService();
