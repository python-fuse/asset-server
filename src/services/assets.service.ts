import prisma from "../utils/prisma";
import { Asset } from "@prisma/client";

class AssetService {
  async createAsset(
    data: Omit<Asset, "id" | "createdAt" | "updatedAt">
  ): Promise<Asset> {
    return prisma.asset.create({ data });
  }

  async getAssetById(id: Asset["id"]): Promise<Asset | null> {
    return prisma.asset.findUnique({
      where: { id },
      include: { Category: true, createdBy: true },
    });
  }

  async getAllAssets(): Promise<Asset[]> {
    return prisma.asset.findMany({
      include: { Category: true, createdBy: true },
    });
  }

  async updateAsset(
    id: Asset["id"],
    data: Partial<Omit<Asset, "id" | "createdAt" | "updatedAt">>
  ): Promise<Asset> {
    return prisma.asset.update({ where: { id }, data });
  }

  async deleteAsset(id: Asset["id"]): Promise<Asset> {
    return prisma.asset.delete({ where: { id } });
  }
}

export default new AssetService();
