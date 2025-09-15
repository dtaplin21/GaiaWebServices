import { defineConfig } from "drizzle-kit";

// Database is optional - using in-memory storage instead
const databaseUrl = process.env.DATABASE_URL || "postgresql://localhost:5432/placeholder";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
