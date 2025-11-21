"use client";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToWords } from "to-words";
import PrintButton from "./PrintButton";
import { BookingFormValues } from "@/lib/validation/bookingFormSchema";
import { useParams } from "next/navigation";

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

interface BookingForm extends BookingFormValues {
	id: number;
	createdAt: string;
	clientFullName: string;
}

export default function MoneyReceiptPage() {
	const params = useParams();
	const id =
		typeof params.id === "string"
			? params.id
			: Array.isArray(params.id)
			? params.id[0]
			: undefined;
	const [form, setForm] = useState<BookingForm | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [emailStatus, setEmailStatus] = useState<string | null>(null);

	useEffect(() => {
		async function fetchForm() {
			try {
				const res = await fetch(`/api/admin/booking-forms/${id}`);
				if (!res.ok) {
					throw new Error("Failed to fetch form");
				}
				const data: BookingForm = await res.json();
				setForm(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		}

		if (id) {
			fetchForm();
		}
	}, [id]);

	const handleSendEmail = async () => {
		if (!form || !form.clients || !form.clients.length) return;
		const applicant = form.clients.find((c) => c.type === "applicant");
		const email = applicant?.email;
		if (!email) {
			setEmailStatus("No applicant email found.");
			return;
		}
		setEmailStatus("Sending...");
		try {
			const res = await fetch(`/api/admin/booking-forms/${id}/send-email`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ form, email }),
			});
			if (res.ok) {
				setEmailStatus("Email sent successfully!");
			} else {
				setEmailStatus("Failed to send email.");
			}
		} catch {
			setEmailStatus("Failed to send email.");
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error || !form) return <div>Error: {error || "Form not found"}</div>;
	// Fallbacks for missing data
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
		formattedDate = format(parseISO(dateRaw), "do MMMM yyyy");
	} catch {}

	// GST calculation (example, adjust as needed)
	const taxable = Number(amountReceived) || 0;
	const cgst = Math.round(taxable * 0.09);
	const sgst = Math.round(taxable * 0.09);
	const total = taxable + cgst + sgst;

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center py-10 px-2 text-black text-sm relative print:bg-white print:block print:p-0 print:py-0 print:px-0">
			{/* Loading overlay for sending email */}
			{emailStatus === "Sending..." && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
					<div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
						<svg
							className="animate-spin h-8 w-8 text-blue-600"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v8z"
							></path>
						</svg>
						<div className="text-blue-700 font-semibold text-lg">
							Sending email...
						</div>
					</div>
				</div>
			)}

			{/* Action buttons */}
			<div className="flex justify-end mb-4 print:hidden gap-2 w-full max-w-2xl">
				<PrintButton />
				<button
					onClick={handleSendEmail}
					className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
					disabled={emailStatus === "Sending..."}
				>
					📧 Send to Email
				</button>
			</div>

			{emailStatus && (
				<div className="text-center text-sm mt-2 mb-2 print:hidden">
					{emailStatus}
				</div>
			)}

			{/* Print background color notice */}
			<div className="text-xs text-orange-700 mb-2 print:hidden text-right w-full max-w-2xl pr-2">
				For best results, enable &quot;Print Background Colors and Images&quot;
				in your print dialog.
			</div>
			{/* Watermark (hide on print) */}
			<div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0 print:hidden">
				<Image
					src="/assets/mdb-logo.svg"
					alt="Watermark"
					width={600}
					height={600}
					className="select-none"
				/>
			</div>
			{/* Receipt Card: only this prints */}
			<div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white p-0 relative z-10 overflow-hidden print:shadow-none print:rounded-none print:max-w-full print:w-full print:relative print:mx-0 print:p-0">
				{/* Header Bar */}
				<div className="bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-between px-8 py-4">
					<div className="flex items-center gap-4">
						<Image
							width={100}
							height={100}
							src="/assets/mdb-logo.svg"
							alt="Logo"
							className="bg-white rounded-full p-2 shadow"
						/>
						<div>
							<div className="text-lg font-bold text-white tracking-wide print:text-white">
								MyDearCity Builders Pvt. Ltd.
							</div>
							<div className="text-xs text-orange-100 font-medium print:text-orange-100">
								Transforming Wishes to Reality
							</div>
						</div>
					</div>
					<div className="text-white font-bold text-lg tracking-wider print:text-white">
						MONEY RECEIPT
					</div>
				</div>
				{/* Date */}
				<div className="flex justify-end px-8 pt-2 pb-1">
					<span className="text-xs font-semibold text-gray-500">
						Date: <span className="text-gray-700">{formattedDate}</span>
					</span>
				</div>
				{/* Details */}
				<div className="px-8 py-2">
					<div className="mb-1">
						<span className="font-semibold text-gray-700">Received From:</span>{" "}
						{clientName}
					</div>
					<div className="mb-1">
						<span className="font-semibold text-gray-700">Address:</span>{" "}
						{clientAddress}
					</div>
					<div className="mb-1">
						<span className="font-semibold text-gray-700">Phone:</span> +91{" "}
						{clientPhone}
					</div>
				</div>
				<div className="px-8 py-2">
					<div className="mb-1">
						<span className="font-semibold text-gray-700">
							Amount Received:
						</span>{" "}
						<span className="text-green-700 font-bold">
							₹{total.toLocaleString()} /-
						</span>{" "}
						<br />{" "}
						<span className="italic text-gray-500">
							({toWords.convert(total) || ""})
						</span>
					</div>
					<div className="mb-1">
						<span className="font-semibold text-gray-700">Payment Mode:</span>{" "}
						<span className="text-blue-700 font-semibold">{paymentMode}</span>
					</div>
				</div>
				<div className="px-8 py-2">
					<div className="mb-1 font-semibold text-gray-700">
						Purpose of Payment:{" "}
						<span className="text-gray-800 font-normal">
							Booking & Caution Money
						</span>
					</div>
					{/* <div className="pl-2 text-gray-800">Advance Payment</div> */}
				</div>
				{/* GST Table */}
				<div className="px-8 py-2">
					<div className="font-semibold mb-2 text-orange-700">
						GST Break-up (Included in Total):
					</div>
					<table className="w-full border rounded-lg overflow-hidden text-sm mb-2 shadow-sm">
						<thead>
							<tr className="bg-orange-100 text-orange-800 print:bg-orange-800 print:text-white print:force-bg">
								<th
									className="border px-2 py-1 text-left font-semibold"
									style={{ background: "rgb(194, 65, 12)", color: "#fff" }}
								>
									Description
								</th>
								<th
									className="border px-2 py-1 text-right font-semibold"
									style={{ background: "rgb(194, 65, 12)", color: "#fff" }}
								>
									Amount (₹)
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="hover:bg-orange-50">
								<td className="border px-2 py-1">Taxable Value</td>
								<td className="border px-2 py-1 text-right">
									₹ {taxable.toLocaleString()}
								</td>
							</tr>
							<tr className="hover:bg-orange-50">
								<td className="border px-2 py-1">CGST @ 9%</td>
								<td className="border px-2 py-1 text-right">
									₹ {cgst.toLocaleString()}
								</td>
							</tr>
							<tr className="hover:bg-orange-50">
								<td className="border px-2 py-1">SGST @ 9%</td>
								<td className="border px-2 py-1 text-right">
									₹ {sgst.toLocaleString()}
								</td>
							</tr>
							<tr className="font-bold bg-orange-200 text-orange-900">
								<td className="border px-2 py-1">Total Received</td>
								<td className="border px-2 py-1 text-right">
									₹ {total.toLocaleString()}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="px-8 py-2">
					<div className="font-semibold text-gray-700">FOR & BEHALF OF</div>
					<div className="text-gray-800">
						MYDEARCITY BUILDERS PRIVATE LIMITED
					</div>
				</div>
				{/* Signature */}
				<div className="flex flex-col items-end px-8 pt-8 pb-2">
					<Image
						src="/assets/signatory.jpg"
						alt="signature"
						width={100}
						height={100}
						className="h-10 w-auto object-contain"
					/>
					<div className="text-xs text-gray-700 font-semibold text-right">
						MyDearCity Builders Pvt. Ltd.
						<br />
						(Authorized Signatory)
					</div>
				</div>
				{/* Footer */}
				<div className="w-full mt-8 pt-4 text-xs text-gray-600 text-center bg-gradient-to-r from-orange-50 to-yellow-50 px-8 pb-4 print:fixed print:bottom-0">
					<div className="font-bold text-lg text-orange-700">
						MyDearCity Builders Pvt. Ltd.
					</div>
					<div>
						RA - 31, Tara Shankar Sarani, City Center, Durgapur, West Bengal,
						713216
					</div>
					<div>
						GSTIN: 19AAPCM5459P1ZK | PAN: AAPCM5459P | CIN:
						U45309WB2022PTC252211
					</div>
					<div>Contact: (+91) 7811831313 | info@mydearcitybuilders.com</div>
				</div>
			</div>
		</div>
	);
}
