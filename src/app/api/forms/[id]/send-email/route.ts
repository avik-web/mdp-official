import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request, { params }) {
	try {
		const { form, email } = await request.json();
		if (!email) {
			return NextResponse.json({ error: "No email provided" }, { status: 400 });
		}
		const formId = params.id;
		const formUrl = `https://mydearcitybuilders.com/forms/${formId}`;
		const logoUrl = `https://mydearcitybuilders.com/assets/mdb-logo.png`;

		// Format date
		function formatDate(dateString) {
			const date = new Date(dateString);
			const day = date.getDate();
			const month = date.toLocaleString("en-US", { month: "short" });
			const year = date.getFullYear();
			const getOrdinalSuffix = (day) => {
				if (day > 3 && day < 21) return "th";
				switch (day % 10) {
					case 1:
						return "st";
					case 2:
						return "nd";
					case 3:
						return "rd";
					default:
						return "th";
				}
			};
			return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
		}

		// Build applicant/co-applicant details
		let clientRows = "";
		if (form.clients && Array.isArray(form.clients)) {
			for (const client of form.clients) {
				clientRows += `<tr><td colspan="3" style="padding-top:10px;"><b>${
					client.type === "applicant" ? "Applicant" : "Co-Applicant"
				} Details</b></td></tr>`;
				clientRows += `<tr><td>Name</td><td colspan="2">${
					client.fullName || "-"
				}</td></tr>`;
				clientRows += `<tr><td>Email</td><td colspan="2">${
					client.email || "-"
				}</td></tr>`;
				clientRows += `<tr><td>Contact</td><td colspan="2">${
					client.contactNumber || "-"
				}</td></tr>`;
				clientRows += `<tr><td>Address</td><td colspan="2">${
					client.address || "-"
				}</td></tr>`;
			}
		}

		// Email HTML
		const html = `
      <body style="background:#f6f8fa; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif;">
        <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:18px; box-shadow:0 4px 24px rgba(0,0,0,0.08); overflow:hidden; border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(90deg,#fbbf24 0%,#f59e42 100%); padding:32px 0 18px 0; text-align:center;">
            <img src="${logoUrl}" alt="MyDearCity Builders Logo" style="height:70px; margin-bottom:10px; filter:drop-shadow(0 2px 8px #fff8);"/>
          </div>
          <div style="padding:28px 32px 18px 32px;">
            <div style="text-align:center; color:#222; font-size:15px; font-weight:600; letter-spacing:0.5px; margin-bottom:10px;">Booking Confirmation</div>
            <div style="text-align:center; margin-bottom:18px;">
              <div style="font-size:13px; color:#555; margin-bottom:4px;">GSTIN. <b>19AAPCM5435P1ZK</b></div>
              <div style="font-size:13px; color:#555; margin-bottom:4px;">CIN. NO. <b>U45309WB2022PTC252211</b></div>
              <div style="font-size:13px; color:#1976d2; margin-bottom:4px;"><a href="https://mydearcitybuilders.com" style="color:#1976d2; text-decoration:none;">www.mydearcitybuilders.com</a></div>
              <div style="font-size:13px; color:#1976d2; margin-bottom:4px;"><a href="mailto:info@mydearcitybuilders.com" style="color:#1976d2; text-decoration:none;">info@mydearcitybuilders.com</a></div>
              <div style="font-size:13px; color:#1976d2; margin-bottom:4px;"><a href="tel:+917811831313" style="color:#1976d2; text-decoration:none;">(+91)7811831313</a></div>
              <div style="font-size:12px; color:#888; margin-top:4px;">RA - 31, Tara Shankar Sarani, City Center, Durgapur, West Bengal,
						713216</div>
            </div>
            <hr style="border:none; border-top:1px solid #f3f4f6; margin:18px 0 24px 0;"/>
            <table style="width:100%; font-size:14px; border-collapse:collapse; margin-bottom:18px;">
              <tr style="background:#f9fafb;">
                <th style="padding:10px 8px; text-align:left; border-radius:8px 0 0 8px; color:#222; font-weight:600;">Customer ID</th>
                <th style="padding:10px 8px; text-align:left; color:#222; font-weight:600;">Date</th>
                <th style="padding:10px 8px; text-align:left; border-radius:0 8px 8px 0; color:#222; font-weight:600;">Plot/Flat No</th>
              </tr>
              <tr>
                <td style="padding:10px 8px; border-bottom:1px solid #f3f4f6;">${
									form.customerId || "-"
								}</td>
                <td style="padding:10px 8px; border-bottom:1px solid #f3f4f6;">${
									form.date ? formatDate(form.date) : "-"
								}</td>
                <td style="padding:10px 8px; border-bottom:1px solid #f3f4f6;">${
									form.plotNo || "N/A"
								}</td>
              </tr>
              <tr>
                <td style="padding:10px 8px; font-weight:bold; color:#444; background:#f9fafb;">Project Name</td>
                <td colspan="2" style="padding:10px 8px; color:#444; background:#f9fafb;">${
									form.projectName || "-"
								}</td>
              </tr>
              ${clientRows}
            </table>
            <div style="margin:32px 0 18px 0; text-align:center;">
              <a href="${formUrl}" target="_blank" style="display:inline-block; background:linear-gradient(90deg,#fbbf24 0%,#f59e42 100%); color:#222; font-weight:600; font-size:16px; padding:14px 36px; border-radius:8px; text-decoration:none; box-shadow:0 2px 8px #fbbf2433; letter-spacing:0.5px; transition:background 0.2s;">View & Print Booking Form</a>
            </div>
            <div style="margin-top:18px; text-align:center; font-size:15px; color:#1976d2; font-weight:500;">Thank you for booking with us!</div>
            <div style="margin-top:18px; text-align:center; font-size:13px; color:#888;">If you have any questions, please contact us.<br/>Best regards,<br/><span style="color:#222; font-weight:600;">MyDearCity Builders</span></div>
            <div style="margin-top:28px; text-align:center; font-size:12px; color:#aaa; border-top:1px solid #eee; padding-top:16px;">
              This is a system generated e-mail. Please do not reply.<br/>
              <span style="font-size:12px; color:#bbb;">T&amp;Cs ❘ Disclaimer ❘ Unsubscribe</span>
            </div>
          </div>
        </div>
      </body>
    `;

		// Send Email
		const transporter = nodemailer.createTransport({
			host: "smtp.hostinger.com",
			port: 465,
			secure: true,
			auth: {
				user: "admin@mydearcitybuilders.com",
				pass: "MyDearAdmin@123#",
			},
		});

		await transporter.sendMail({
			from: "admin@mydearcitybuilders.com",
			to: email,
			subject: "Your Booking Form - MyDearCity Builders",
			html,
		});

		return NextResponse.json({ message: "Email sent with form link." });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
