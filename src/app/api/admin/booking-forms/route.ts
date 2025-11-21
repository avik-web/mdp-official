import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingForms } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const forms = await db.query.bookingForms.findMany({
      with: {
        clients: true
      },
      orderBy: [desc(bookingForms.createdAt)]
    });

    // Transform the data to include the primary client's name
    const transformedForms = forms.map(form => ({
      ...form,
      clientFullName: form.clients?.find(client => client.type === 'applicant')?.fullName || 'N/A'
    }));

    return NextResponse.json(transformedForms);
  } catch (error) {
    console.error("Error fetching booking forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate a reference number (you can customize this format)
    const referenceNo = `BF${Date.now().toString().slice(-6)}`;

    const form = await db.insert(bookingForms).values({
      ...data,
      referenceNo,
      date: new Date().toISOString().split("T")[0], // Today's date
    });

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error creating booking form:", error);
    return NextResponse.json(
      { error: "Failed to create booking form" },
      { status: 500 }
    );
  }
} 