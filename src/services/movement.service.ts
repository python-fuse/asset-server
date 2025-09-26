import prisma from "../utils/prisma";
import { Movement } from "@prisma/client";

class MovementService {
  async createMovement(
    data: Omit<Movement, "id" | "createdAt" | "updatedAt">
  ): Promise<Movement> {
    return prisma.movement.create({ data });
  }

  async getMovementById(id: Movement["id"]): Promise<Movement | null> {
    return prisma.movement.findUnique({ where: { id } });
  }

  async getAllMovements(): Promise<Movement[]> {
    return prisma.movement.findMany();
  }

  async updateMovement(
    id: Movement["id"],
    data: Partial<Omit<Movement, "id" | "createdAt" | "updatedAt">>
  ): Promise<Movement> {
    return prisma.movement.update({ where: { id }, data });
  }

  async deleteMovement(id: Movement["id"]): Promise<Movement> {
    return prisma.movement.delete({ where: { id } });
  }
}
export default new MovementService();
