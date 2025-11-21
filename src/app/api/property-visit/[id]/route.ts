// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
// import { db } from "@/lib/db";
// import { propertyVisit } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";

// // Define the schema for status update validation
// const statusUpdateSchema = z.object({
//   status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
//   notes: z.string().optional(),
// });

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const body = await request.json();

//     // Validate the request body
//     const validatedData = statusUpdateSchema.parse(body);

//     // Update the property visit in the database
//     const updatedVisit = await db
//       .update(propertyVisit)
//       .set({
//         status: validatedData.status,
//         notes: validatedData.notes,
//         updatedAt: new Date(),
//       })
//       .where(eq(propertyVisit.id, parseInt(id)))
//       .returning();

//     if (!updatedVisit.length) {
//       return NextResponse.json(
//         { error: "Property visit not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedVisit[0]);
//   } catch (error) {
//     console.error("Error updating property visit:", error);
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: "Validation error", details: error.errors },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { error: "Failed to update property visit" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     const visit = await db.query.propertyVisit.findFirst({
//       where: eq(propertyVisit.id, parseInt(id)),
//       with: {
//         property: true,
//       },
//     });

//     if (!visit) {
//       return NextResponse.json(
//         { error: "Property visit not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(visit);
//   } catch (error) {
//     console.error("Error fetching property visit:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch property visit" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     const deletedVisit = await db
//       .delete(propertyVisit)
//       .where(eq(propertyVisit.id, parseInt(id)))
//       .returning();

//     if (!deletedVisit.length) {
//       return NextResponse.json(
//         { error: "Property visit not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Property visit deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting property visit:", error);
//     return NextResponse.json(
//       { error: "Failed to delete property visit" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE() {}
