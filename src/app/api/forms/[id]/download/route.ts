import { db } from "@/lib/db";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    // Fetch the form data from the database
    const form = await db.query.bookingForms.findFirst({
      where: (form, { eq }) => eq(form.id, Number(id)),
      with: { clients: true },
    });
    if (!form) {
      return new Response("Form not found", { status: 404 });
    }

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size in points
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = 800;
    const left = 50;
    const lineHeight = 18;

    // Title
    page.drawText("Booking Form", {
      x: left,
      y,
      size: 20,
      font,
      color: rgb(0, 0.2, 0.6),
    });
    y -= 2 * lineHeight;

    // Basic Info
    page.drawText(`Customer ID: ${form.customerId || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    page.drawText(`Date: ${form.date || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    page.drawText(`Project Name: ${form.projectName || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    page.drawText(`Plot/Flat No: ${form.plotNo || form.plotNumber || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    page.drawText(`Property Cost: ${form.propertyCost || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    page.drawText(`Booking Amount: ${form.bookingAmount || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    page.drawText(`Payment Method: ${form.paymentMethod || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
    y -= lineHeight;

    // Applicant(s)
    if (form.clients && Array.isArray(form.clients)) {
      for (const client of form.clients) {
        page.drawText(`${client.type === "applicant" ? "Applicant" : "Co-Applicant"} Name: ${client.fullName || "-"}`, { x: left, y, size: 12, font }); y -= lineHeight;
        if (client.email) { page.drawText(`Email: ${client.email}`, { x: left, y, size: 12, font }); y -= lineHeight; }
        if (client.contactNumber) { page.drawText(`Contact: ${client.contactNumber}`, { x: left, y, size: 12, font }); y -= lineHeight; }
        if (client.address) { page.drawText(`Address: ${client.address}`, { x: left, y, size: 12, font }); y -= lineHeight; }
        y -= lineHeight / 2;
      }
    }

    // Add more fields as needed...

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=booking-form-${form.customerId || "form"}.pdf`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate PDF", { status: 500 });
  }
} 