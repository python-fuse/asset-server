import prisma from "../utils/prisma";
import { Log } from "@prisma/client";

class LogService {
  async createLog(
    data: Omit<Log, "id" | "createdAt" | "updatedAt">
  ): Promise<Log> {
    return prisma.log.create({ data });
  }
  async getLogById(id: Log["id"]): Promise<Log | null> {
    return prisma.log.findUnique({
      where: { id },
      include: { user: true, asset: true },
    });
  }
  async getAllLogs(): Promise<Log[]> {
    return prisma.log.findMany({
      include: { user: true, asset: true },
    });
  }

  async getLogsByAssetId(assetId: Log["assetId"]): Promise<Log[]> {
    return prisma.log.findMany({
      where: { assetId },
      include: { user: true, asset: true },
    });
  }

  async getLogsByUserId(userId: Log["userId"]): Promise<Log[]> {
    return prisma.log.findMany({
      where: { userId },
      include: { user: true, asset: true },
    });
  }

  async updateLog(
    id: Log["id"],
    data: Partial<Omit<Log, "id" | "createdAt" | "updatedAt">>
  ): Promise<Log> {
    return prisma.log.update({ where: { id }, data });
  }

  async deleteLog(id: Log["id"]): Promise<Log> {
    return prisma.log.delete({ where: { id } });
  }
}

export default new LogService();
