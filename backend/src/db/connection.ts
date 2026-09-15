import "dotenv/config";
import * as schema from "./schema";

export interface DatabaseConfig {
  url?: string;
  isConfigured: boolean;
}

export function getDatabaseConfig(): DatabaseConfig {
  const url = process.env.DATABASE_URL;
  return {
    url,
    isConfigured: Boolean(url && url.length > 0),
  };
}

export const dbConfig = getDatabaseConfig();
