// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { contact } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";

// Define the schema for contact form validation
const contactFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	subject: z.string().min(1, "Subject is required"),
	message: z.string().min(1, "Message is required"),
});

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const offset = (page - 1) * limit;

		// Get total count
		const totalResult = await db.select({ count: sql<number>`count(*)` }).from(contact);
		const total = totalResult[0].count;

		// Fetch paginated contacts
		const contacts = await db
			.select()
			.from(contact)
			.orderBy(desc(contact.createdAt))
			.limit(limit)
			.offset(offset);

		return NextResponse.json(
			{ 
				message: "Contacts retrieved successfully", 
				data: contacts,
				total,
				page,
				limit
			},
			{ status: 200 }
		);
	} catch (error: unknown) {
		console.error("Error fetching contacts:", error);

		if (error instanceof Error) {
			return NextResponse.json(
				{ message: "Error fetching contacts", error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Unknown error occurred" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Validate the request body against our schema
		const validatedData = contactFormSchema.parse(body);

		// Create the contact submission in the database
		const newContact = await db
			.insert(contact)
			.values({
				name: validatedData.name,
				email: validatedData.email,
				subject: validatedData.subject,
				message: validatedData.message,
			})
			.returning();

		return NextResponse.json(
			{
				message: "Contact form submitted successfully",
				data: newContact[0],
			},
			{ status: 201 }
		);
	} catch (error: unknown) {
		console.error("Contact form submission error:", error);

		// Handle validation errors
		if (error instanceof z.ZodError) {
			const fieldErrors = error.errors.map((err) => ({
				field: err.path.join("."),
				message: err.message,
			}));

			return NextResponse.json(
				{ message: "Validation error", errors: fieldErrors },
				{ status: 400 }
			);
		} else if (error instanceof Error) {
			return NextResponse.json(
				{ message: "Error submitting contact form", error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Unknown error occurred" },
			{ status: 500 }
		);
	}
}
