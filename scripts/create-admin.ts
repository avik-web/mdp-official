import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { adminUsers } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import * as schema from "../src/lib/db/schema";

const connectionString =
	process.env.DATABASE_URL ||
	"postgresql://root:maityBuilder15@157.173.219.77:5488/mdc";
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
	const adminPassword = await bcrypt.hash("Abc@123", 10);

	const existingAdmin = await db.query.adminUsers.findFirst({
		where: eq(adminUsers.email, "admin@gmail.com"),
	});

	if (existingAdmin) {
		return;
	}

	await db
		.insert(adminUsers)
		.values({
			email: "admin@gmail.com",
			password: adminPassword,
		})
		.returning();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await client.end();
	});
