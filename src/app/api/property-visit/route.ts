import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { propertyVisit } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";

// Define the schema for property visit validation
const propertyVisitSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	phone: z
		.string()
		.min(10, "Phone number must be at least 10 digits")
		.max(10, "Phone number must not exceed 10 digits")
		.regex(
			/^[6-9]\d{9}$/,
			"Please enter a valid Indian phone number starting with 6, 7, 8, or 9"
		),
	visitDate: z.string().min(1, "Visit date is required"),
	visitTime: z.string().min(1, "Visit time is required"),
	notes: z.string().optional(),
	propertyTitle: z.string().min(1, "Property title is required"),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Validate the request body against our schema
		const validatedData = propertyVisitSchema.parse(body);

		// Create the property visit booking in the database
		const newBooking = await db
			.insert(propertyVisit)
			.values({
				name: validatedData.name,
				email: validatedData.email,
				phone: validatedData.phone,
				visitDate: validatedData.visitDate,
				visitTime: validatedData.visitTime,
				notes: validatedData.notes,
				propertyTitle: validatedData.propertyTitle,
			})
			.returning();

		return NextResponse.json(
			{
				message: "Property visit booking submitted successfully",
				data: newBooking[0],
			},
			{ status: 201 }
		);
	} catch (error: unknown) {
		console.error("Property visit booking error:", error);

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
				{ message: "Error submitting booking", error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Unknown error occurred" },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const offset = (page - 1) * limit;

		// Get total count
		const totalResult = await db
			.select({ count: sql<number>`count(*)` })
			.from(propertyVisit);
		const total = totalResult[0].count;

		// Fetch paginated bookings
		const bookings = await db
			.select()
			.from(propertyVisit)
			.orderBy(desc(propertyVisit.createdAt))
			.limit(limit)
			.offset(offset);

		return NextResponse.json(
			{
				message: "Bookings retrieved successfully",
				data: bookings,
				total,
				page,
				limit,
			},
			{ status: 200 }
		);
	} catch (error: unknown) {
		console.error("Error fetching bookings:", error);

		if (error instanceof Error) {
			return NextResponse.json(
				{ message: "Error fetching bookings", error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Unknown error occurred" },
			{ status: 500 }
		);
	}
}
