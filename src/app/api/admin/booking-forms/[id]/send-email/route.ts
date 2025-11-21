import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ToWords } from "to-words";

export async function POST(request) {
	try {
		const { form, email } = await request.json();
		if (!email) {
			return NextResponse.json({ error: "No email provided" }, { status: 400 });
		}
		const logoUrl = `https://mydearcitybuilders.com/assets/mdb-logo.png`;
		const signatoryUrl = `https://mydearcitybuilders.com/assets/signatory.jpg`;

		// Format date
		function formatDate(dateString) {
			const date = new Date(dateString);
			const day = date.getDate();
			const month = date.toLocaleString("en-US", { month: "long" });
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

		const client = form?.clients?.find((c) => c.type === "applicant") || {};
		const clientName = client.fullName || form.clientFullName || "N/A";
		const clientAddress = client.address || "N/A";
		const clientPhone =
			client.contactNumber ||
			(form.clients && form.clients[0]?.contactNumber) ||
			"N/A";
		const amountReceived = Number(form.bookingAmount) || 0;
		const paymentMode = form.paymentMethod || "N/A";
		const dateRaw = form.date || form.createdAt?.slice(0, 10) || "N/A";
		let formattedDate = dateRaw;
		try {
			formattedDate = formatDate(dateRaw);
		} catch {}

		// GST calculation
		const taxable = Number(amountReceived) || 0;
		const cgst = Math.round(taxable * 0.005);
		const sgst = Math.round(taxable * 0.005);
		const total = taxable + cgst + sgst;

		// Use to-words package for INR
		const toWords = new ToWords({
			localeCode: "en-IN",
			converterOptions: {
				currency: true,
				ignoreDecimal: false,
				ignoreZeroCurrency: false,
				doNotAddOnly: false,
				currencyOptions: {
					name: "Rupee",
					plural: "Rupees",
					symbol: "₹",
					fractionalUnit: { name: "Paisa", plural: "Paise", symbol: "" },
				},
			},
		});
		const amountInWords = toWords.convert(total);

		const html = `
<body style="background:#f6f8fa; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:18px; box-shadow:0 4px 24px rgba(0,0,0,0.08); overflow:hidden; border:1px solid #e5e7eb;">
    <div style="background:linear-gradient(90deg,#fbbf24 0%,#f59e42 100%); padding:32px 0 18px 0; text-align:center;">
      <img src="${logoUrl}" alt="MyDearCity Builders Logo" style="height:70px; margin-bottom:10px; filter:drop-shadow(0 2px 8px #fff8);"/>
      <div style="font-size:22px; font-weight:bold; color:#fff; margin-bottom:2px;">MyDearCity Builders Pvt. Ltd.</div>
      <div style="font-size:14px; color:#fff; margin-bottom:8px;">Transforming Wishes to Reality</div>
      <div style="font-size:20px; font-weight:bold; color:#fff; letter-spacing:2px; margin-top:8px;">MONEY RECEIPT</div>
    </div>
    <div style="padding:28px 32px 18px 32px;">
      <div style="text-align:right; font-size:13px; color:#555; margin-bottom:10px;">
        <b>Date:</b> <span style="color:#222;">${formattedDate}</span>
      </div>
      <div style="font-size:15px; color:#222; margin-bottom:8px;"><b>Received From:</b> ${clientName}</div>
      <div style="font-size:15px; color:#222; margin-bottom:8px;"><b>Address:</b> ${clientAddress}</div>
      <div style="font-size:15px; color:#222; margin-bottom:8px;"><b>Phone:</b> +91 ${clientPhone}</div>
      <div style="font-size:15px; color:#222; margin-bottom:8px;"><b>Amount Received:</b> <span style="color:#0a7a2a; font-weight:bold;">₹${total.toLocaleString()} /-</span></div>
      <div style="font-size:13px; color:#555; margin-bottom:8px; font-style:italic;">(${amountInWords})</div>
      <div style="font-size:15px; color:#222; margin-bottom:8px;"><b>Payment Mode:</b> <span style="color:#1976d2; font-weight:600;">${paymentMode}</span></div>
      <div style="font-size:15px; color:#222; margin-bottom:8px;"><b>Purpose of Payment:</b> Booking & Caution Money</div>
      <div style="margin:18px 0 10px 0; font-weight:bold; color:#f59e42; font-size:16px;">GST Break-up (Included in Total):</div>
      <table style="width:100%; font-size:14px; border-collapse:collapse; margin-bottom:18px;">
        <thead>
          <tr style="background:#f9fafb; color:#c2410c;">
            <th style="padding:8px 6px; text-align:left; border-radius:8px 0 0 8px; font-weight:600;">Description</th>
            <th style="padding:8px 6px; text-align:right; border-radius:0 8px 8px 0; font-weight:600;">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px 6px;">Taxable Value</td>
            <td style="padding:8px 6px; text-align:right;">₹ ${taxable.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding:8px 6px;">CGST @ 0.5%</td>
            <td style="padding:8px 6px; text-align:right;">₹ ${cgst.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding:8px 6px;">SGST @ 0.5%</td>
            <td style="padding:8px 6px; text-align:right;">₹ ${sgst.toLocaleString()}</td>
          </tr>
          <tr style="font-weight:bold; background:#fbbf24; color:#c2410c;">
            <td style="padding:8px 6px;">Total Received</td>
            <td style="padding:8px 6px; text-align:right;">₹ ${total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:24px; font-size:14px; color:#555;">
        <b>FOR & BEHALF OF</b><br/>
        <span style="color:#222;">MYDEARCITY BUILDERS PRIVATE LIMITED</span>
      </div>
      <div style="margin-top:24px; text-align:right;">
        <img src="${signatoryUrl}" alt="signature" style="height:50px;"/>
        <div style="font-size:12px; color:#555; font-weight:600;">MyDearCity Builders Pvt. Ltd.<br/>(Authorized Signatory)</div>
      </div>
    </div>
    <div style="width:100%; margin-top:8px; padding:16px 0; text-align:center; background:linear-gradient(90deg,#fff7ed 0%,#fef3c7 100%); font-size:13px; color:#c2410c;">
      <div style="font-weight:bold; font-size:16px;">MyDearCity Builders Pvt. Ltd.</div>
      <div>	RA - 31, Tara Shankar Sarani, City Center, Durgapur, West Bengal, 713216</div>
      <div>GSTIN: 19AAPCM5459P1ZK | PAN: AAPCM5459P | CIN: U45309WB2022PTC252211</div>
      <div>Contact: (+91) 7811831313 | info@mydearcitybuilders.com</div>
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
			subject: "Your Money Receipt - MyDearCity Builders",
			html,
		});

		return NextResponse.json({ message: "Email sent with receipt details." });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
