-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'An Asset',
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "categoryId" TEXT NOT NULL,
    "acquisitionDate" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "image_url" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Asset_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asset_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("acquisitionDate", "categoryId", "createdAt", "createdById", "id", "image_url", "location", "name", "status", "updatedAt") SELECT "acquisitionDate", "categoryId", "createdAt", "createdById", "id", "image_url", "location", "name", "status", "updatedAt" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_id_key" ON "Asset"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
