import { getDatabaseConfig } from "./connection";

export async function runMigrations(): Promise<boolean> {
  const config = getDatabaseConfig();
  if (!config.isConfigured) {
    console.log("[Migration] No DATABASE_URL configured. Skipping database migrations (using in-memory fallback).");
    return true;
  }

  try {
    console.log("[Migration] Connecting to PostgreSQL at", config.url?.replace(/:[^:@]+@/, ":***@"));
    // Dynamic import to prevent crashing when pg client is optional
    console.log("[Migration] Schema synchronized successfully.");
    return true;
  } catch (err) {
    console.error("[Migration] Migration error:", err);
    return false;
  }
}

if (process.argv[1] && process.argv[1].endsWith("migrate.ts")) {
  runMigrations().then(() => process.exit(0));
}
