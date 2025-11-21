import { db } from "@/lib/db";
import { bookingForms } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = (await params).id;
		const formId = parseInt(id, 10);
		if (isNaN(formId)) {
			return NextResponse.json({ message: "Invalid form ID" }, { status: 400 });
		}

		const form = await db.query.bookingForms.findFirst({
			where: eq(bookingForms.id, formId),
			with: {
				clients: true
			}
			
		});

		if (!form) {
			return NextResponse.json({ message: "Form not found" }, { status: 404 });
		}

		return NextResponse.json(form);
	} catch (error) {
		console.error("Error fetching form:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
