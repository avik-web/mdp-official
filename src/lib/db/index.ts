import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Create the connection
const connectionString = process.env.DATABASE_URL || "postgresql://mdc:mdc12345@157.173.219.77:5559/finaldb";
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Export types
export type DbClient = typeof db;
