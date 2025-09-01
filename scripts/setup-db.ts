#!/usr/bin/env node

import { execSync } from "child_process";
import { prisma } from "../src/lib/db";
import { seedDatabase } from "../src/lib/seed";

async function main() {
  try {
    console.log("🚀 Starting database setup...");

    // Run Prisma migrations
    console.log("📦 Running database migrations...");
    execSync("npx prisma migrate dev --name init", { stdio: "inherit" });

    // Generate Prisma client
    console.log("🔧 Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });

    // Seed the database
    console.log("🌱 Seeding database...");
    await seedDatabase();

    console.log("✅ Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    process.exit(1);
  }
}

main();
