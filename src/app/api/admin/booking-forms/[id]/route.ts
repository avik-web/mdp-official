import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingForms, clientDetails } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { bookingFormSchema } from "@/lib/validation/bookingFormSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const form = await db.query.bookingForms.findFirst({
      where: (form, { eq }) => eq(form.id, Number(id)),
      with: {
        clients: true
      }
    });
    if (!form) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // Add clientFullName for convenience
    const clientFullName = form.clients?.find(client => client.type === 'applicant')?.fullName || 'N/A';
    return NextResponse.json({ ...form, clientFullName });
  } catch {
    return NextResponse.json({ error: "Failed to fetch booking form" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = bookingFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          errors: validationResult.error.errors 
        }, 
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Start a transaction to update both booking form and client details
    await db.transaction(async (tx) => {
      // Update the booking form
      await tx.update(bookingForms)
        .set({
          customerId: formData.customerId,
          referenceNo: formData.referenceNo,
          date: formData.date,
          estimatedProjectValue: formData.estimatedProjectValue,
          selectedStructureType: formData.selectedStructureType,
          bookingAmount: formData.bookingAmount,
          propertyCost: formData.propertyCost,
          propertyType: formData.propertyType,
          propertyArea: formData.propertyArea,
          propertylocation: formData.propertylocation,
          estimatedConstructionPeriod: formData.estimatedConstructionPeriod,
          plotArea: formData.plotArea,
          plotNumber: formData.plotNumber,
          blockName: formData.blockName,
          plotFacing: formData.plotFacing,
          jl_no: formData.jl_no,
          mouza: formData.mouza,
          dag_no: formData.dag_no,
          khatian_no: formData.khatian_no,
          paymentMethod: formData.paymentMethod,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode,
          accountHolderName: formData.accountHolderName,
          plotNo: formData.plotNo,
          projectName: formData.projectName,
          panchayat_municipality: formData.panchayat_municipality,
          propertyWebsiteDetails: formData.propertyWebsiteDetails,
          branchName: formData.branchName,
          paymentDate: formData.paymentDate,
          cheque_dd_no: formData.cheque_dd_no,
          transactionReferenceNo: formData.transactionReferenceNo,
          referencsources: formData.referencsources,
          brokerName: formData.brokerName,
          otherSource: formData.otherSource,
          referredBy: formData.referredBy,
          refererRelationship: formData.refererRelationship,
          refererContactNumber: formData.refererContactNumber,
          referenceCustomerId: formData.referenceCustomerId,
          docPanCard: formData.docPanCard,
          docAadharCard: formData.docAadharCard,
          docPropertyDocuments: formData.docPropertyDocuments,
          docPassportPhotos: formData.docPassportPhotos,
          clientSignatureName: formData.clientSignatureName,
          clientSignatureDate: formData.clientSignatureDate,
          clientSignature: formData.clientSignature,
          contractorSignatureName: formData.contractorSignatureName,
          contractorSignatureDate: formData.contractorSignatureDate,
          contractorSignature: formData.contractorSignature,
          mdbRepresentativeSignatureName: formData.mdbRepresentativeSignatureName,
          mdbRepresentativeSignatureDate: formData.mdbRepresentativeSignatureDate,
          mdbRepresentativeSignature: formData.mdbRepresentativeSignature,
          contractorName: formData.contractorName,
          mdbRepresentativeName: formData.mdbRepresentativeName,
        })
        .where(eq(bookingForms.id, Number(id)));

      // Delete existing client details
      await tx.delete(clientDetails)
        .where(eq(clientDetails.bookingFormId, Number(id)));

      // Insert updated client details
      if (formData.clients && formData.clients.length > 0) {
        for (const client of formData.clients) {
          await tx.insert(clientDetails).values({
            bookingFormId: Number(id),
            fullName: client.fullName,
            address: client.address || "",
            city: client.city || "",
            state: client.state || "",
            pinCode: client.pinCode || "",
            contactNumber: client.contactNumber || "",
            email: client.email || "",
            panCardNo: client.panCardNo || "",
            aadhaarNo: client.aadhaarNo || "",
            type: client.type,
            relationship: client.relationship || "",
            dateOfBirth: client.dateOfBirth || "",
            occupation: client.occupation || "",
            company: client.company || "",
            designation: client.designation || "",
            workAddress: client.workAddress || "",
          });
        }
      }
    });

    return NextResponse.json({ 
      message: "Booking form updated successfully",
      id: Number(id)
    });

  } catch (error) {
    console.error("Error updating booking form:", error);
    return NextResponse.json(
      { error: "Failed to update booking form" },
      { status: 500 }
    );
  }
} 