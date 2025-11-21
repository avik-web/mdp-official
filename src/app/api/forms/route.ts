import { db } from "@/lib/db";
import { bookingForms, clientDetails, clientImages } from "@/lib/db/schema";
import { bookingFormSchema } from "@/lib/validation/bookingFormSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Validate the request body against our schema
		const validatedData = bookingFormSchema.parse(body);
		type BookingForm = z.infer<typeof bookingFormSchema>;
		type ClientDetail = BookingForm["clients"][number];
		// Convert numeric strings to numbers for database
		const formattedData = {
			...validatedData,
			bookingAmount: validatedData.bookingAmount?.toString(),
			date: validatedData.date,
			selectedStructureType: validatedData.selectedStructureType,
			customerId: validatedData.customerId,
			propertyCost: validatedData.propertyCost?.toString(),
			propertyType: validatedData.propertyType,
			propertyArea: validatedData.propertyArea,
			propertylocation: validatedData.propertylocation,
			estimatedConstructionPeriod: validatedData.estimatedConstructionPeriod,
		};

		// Start a transaction
		const result = await db.transaction(async (tx) => {
			// Create the booking form
			const [newForm] = await tx
				.insert(bookingForms)
				.values(formattedData)
				.returning();

			// Create client details
			if (validatedData.clients && validatedData.clients.length > 0) {
				const clientDetailsData = validatedData.clients.map(
					(client: ClientDetail) => ({
						bookingFormId: newForm.id,
						fullName: client.fullName,
						address: client.address || "",
						city: client.city || "",
						state: client.state || "",
						pinCode: client.pinCode || "",
						contactNumber: client.contactNumber || "",
						relationship: client.relationship || "",
						dateOfBirth: client.dateOfBirth || "",
						occupation: client.occupation || "",
						company: client.company || "",
						designation: client.designation || "",
						workAddress: client.workAddress || "",
						email: client.email || "",
						panCardNo: client.panCardNo || "",
						aadhaarNo: client.aadhaarNo || "",
						type: client.type,
					})
				);

				await tx.insert(clientDetails).values(clientDetailsData);
			}
			const imagesToInsert = [];

			if (validatedData.applicantImage) {
				imagesToInsert.push({
					bookingFormId: newForm.id,
					image: validatedData.applicantImage,
					type: "applicant",
				});
			}

			if (validatedData.coApplicantImage) {
				imagesToInsert.push({
					bookingFormId: newForm.id,
					image: validatedData.coApplicantImage,
					type: "co-applicant",
				});
			}

			if (imagesToInsert.length > 0) {
				await tx.insert(clientImages).values(imagesToInsert);
			}

			return newForm;
		});

		return NextResponse.json(
			{ message: "Form submitted successfully", booking: result },
			{ status: 201 }
		);
	} catch (error: unknown) {
		console.error("Form submission error:", error);

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
				{ message: "Error submitting form", error: error.message },
				{ status: 500 }
			);
		}
	}
}

export async function GET() {
	try {
		const forms = await db.select().from(bookingForms);
		const allClientDetails = await db.select().from(clientDetails);

		// Combine forms with their client details
		const formsWithClients = forms.map((form) => ({
			...form,
			clientDetails: allClientDetails.filter(
				(client) => client.bookingFormId === form.id
			),
		}));

		return NextResponse.json(formsWithClients);
	} catch (error) {
		console.error("Error fetching forms:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
