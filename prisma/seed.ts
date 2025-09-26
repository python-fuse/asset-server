const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.log.deleteMany();
  await prisma.movement.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleared existing data");

  // Create Users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "John Admin",
      email: "admin@company.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const assetManager = await prisma.user.create({
    data: {
      name: "Sarah Manager",
      email: "manager@company.com",
      password: hashedPassword,
      role: "ASSET_MANAGER",
    },
  });

  const auditor = await prisma.user.create({
    data: {
      name: "Mike Auditor",
      email: "auditor@company.com",
      password: hashedPassword,
      role: "AUDITOR",
    },
  });

  console.log("✅ Created users");

  // Create Categories
  const laptopCategory = await prisma.category.create({
    data: {
      name: "Laptops",
      description: "Portable computing devices for employees",
    },
  });

  const furnitureCategory = await prisma.category.create({
    data: {
      name: "Office Furniture",
      description: "Desks, chairs, and other office furniture",
    },
  });

  const networkCategory = await prisma.category.create({
    data: {
      name: "Network Equipment",
      description: "Routers, switches, and networking hardware",
    },
  });

  const vehicleCategory = await prisma.category.create({
    data: {
      name: "Vehicles",
      description: "Company cars and delivery vehicles",
    },
  });

  console.log("✅ Created categories");

  // Create Assets
  const assets = await Promise.all([
    // Laptops
    prisma.asset.create({
      data: {
        name: 'MacBook Pro 16"',
        status: "ASSIGNED",
        categoryId: laptopCategory.id,
        acquisitionDate: new Date("2024-01-15"),
        location: "Office Floor 3 - Desk 12",
        image_url: "https://example.com/images/macbook-pro.jpg",
        createdById: assetManager.id,
      },
    }),
    prisma.asset.create({
      data: {
        name: "Dell XPS 13",
        status: "AVAILABLE",
        categoryId: laptopCategory.id,
        acquisitionDate: new Date("2024-02-20"),
        location: "IT Storage Room",
        image_url: "https://example.com/images/dell-xps.jpg",
        createdById: assetManager.id,
      },
    }),
    prisma.asset.create({
      data: {
        name: "ThinkPad X1 Carbon",
        status: "MAINTENANCE",
        categoryId: laptopCategory.id,
        acquisitionDate: new Date("2023-11-10"),
        location: "IT Repair Center",
        createdById: assetManager.id,
      },
    }),

    // Office Furniture
    prisma.asset.create({
      data: {
        name: "Herman Miller Desk",
        status: "ASSIGNED",
        categoryId: furnitureCategory.id,
        acquisitionDate: new Date("2023-08-05"),
        location: "Office Floor 2 - Station A1",
        createdById: admin.id,
      },
    }),
    prisma.asset.create({
      data: {
        name: "Ergonomic Office Chair",
        status: "AVAILABLE",
        categoryId: furnitureCategory.id,
        acquisitionDate: new Date("2024-03-12"),
        location: "Storage Warehouse",
        createdById: admin.id,
      },
    }),

    // Network Equipment
    prisma.asset.create({
      data: {
        name: "Cisco Router ASR1001",
        status: "ASSIGNED",
        categoryId: networkCategory.id,
        acquisitionDate: new Date("2023-12-01"),
        location: "Server Room Rack 3",
        createdById: assetManager.id,
      },
    }),
    prisma.asset.create({
      data: {
        name: "Netgear Switch 24-port",
        status: "AVAILABLE",
        categoryId: networkCategory.id,
        acquisitionDate: new Date("2024-01-08"),
        location: "IT Storage",
        createdById: assetManager.id,
      },
    }),

    // Vehicles
    prisma.asset.create({
      data: {
        name: "Toyota Camry 2023",
        status: "ASSIGNED",
        categoryId: vehicleCategory.id,
        acquisitionDate: new Date("2023-09-15"),
        location: "Company Parking Lot Spot 5",
        createdById: admin.id,
      },
    }),
    prisma.asset.create({
      data: {
        name: "Ford Transit Van",
        status: "DISPOSED",
        categoryId: vehicleCategory.id,
        acquisitionDate: new Date("2020-03-20"),
        location: "Sold - No longer in inventory",
        createdById: admin.id,
      },
    }),
  ]);

  console.log("✅ Created assets");

  // Create Movements
  await Promise.all([
    prisma.movement.create({
      data: {
        assetId: assets[0].id, // MacBook Pro
        fromLocation: "IT Storage Room",
        toLocation: "Office Floor 3 - Desk 12",
        movedById: assetManager.id,
        dateMoved: new Date("2024-01-20"),
      },
    }),
    prisma.movement.create({
      data: {
        assetId: assets[2].id, // ThinkPad
        fromLocation: "Office Floor 1 - Desk 5",
        toLocation: "IT Repair Center",
        movedById: assetManager.id,
        dateMoved: new Date("2024-09-15"),
      },
    }),
    prisma.movement.create({
      data: {
        assetId: assets[5].id, // Cisco Router
        fromLocation: "IT Storage",
        toLocation: "Server Room Rack 3",
        movedById: assetManager.id,
        dateMoved: new Date("2023-12-05"),
      },
    }),
  ]);

  console.log("✅ Created movements");

  // Create Logs
  await Promise.all([
    prisma.log.create({
      data: {
        userId: assetManager.id,
        action: "REGISTERED",
        assetId: assets[0].id,
        timestamp: new Date("2024-01-15"),
      },
    }),
    prisma.log.create({
      data: {
        userId: assetManager.id,
        action: "MOVED",
        assetId: assets[0].id,
        timestamp: new Date("2024-01-20"),
      },
    }),
    prisma.log.create({
      data: {
        userId: assetManager.id,
        action: "UPDATED",
        assetId: assets[2].id,
        timestamp: new Date("2024-09-15"),
      },
    }),
    prisma.log.create({
      data: {
        userId: admin.id,
        action: "DELETED",
        assetId: assets[8].id,
        timestamp: new Date("2024-08-30"),
      },
    }),
    prisma.log.create({
      data: {
        userId: auditor.id,
        action: "REGISTERED",
        timestamp: new Date("2024-09-20"),
      },
    }),
  ]);

  console.log("✅ Created logs");
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
