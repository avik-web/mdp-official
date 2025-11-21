"use client";

import {
	BookingFormValues,
	ClientDetail,
} from "@/lib/validation/bookingFormSchema";
import { Printer } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Date formatting function
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();

	// Add ordinal suffix to day
	const getOrdinalSuffix = (day: number) => {
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
};

interface BookingForm extends BookingFormValues {
	id: number;
	createdAt: string;
	clients: ClientDetail[];
}

export default function ViewBookingFormPage() {
	const params = useParams();
	const formId = params.id as string;

	const [form, setForm] = useState<BookingForm | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [emailStatus, setEmailStatus] = useState<string | null>(null);

	const handlePrint = () => {
		window.print();
	};

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
			const res = await fetch(`/api/forms/${formId}/send-email`, {
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

	useEffect(() => {
		async function fetchForm() {
			try {
				const res = await fetch(`/api/forms/${formId}`);
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

		if (formId) {
			fetchForm();
		}
	}, [formId]);

	if (loading) {
		return <div className="text-center">Loading form...</div>;
	}

	if (error) {
		return <div className="text-center text-red-600">Error: {error}</div>;
	}

	if (!form) {
		return <div className="text-center">Form not found.</div>;
	}

	return (
		<div className="min-h-screen bg-white text-black text-xs relative">
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
			<section className="max-w-[900px] mx-auto p-8 bg-white">
				{/* Print Button */}
				<div className="flex justify-end mb-4 print:hidden gap-2">
					<button
						onClick={handlePrint}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						<Printer className="h-4 w-4" />
						Print Form
					</button>
					<button
						onClick={handleSendEmail}
						className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
						disabled={emailStatus === "Sending..."}
					>
						📧 Send to Email
					</button>
				</div>
				{emailStatus && (
					<div className="text-center text-sm mt-2 mb-2">{emailStatus}</div>
				)}

				{/* Page 1 */}
				<div className="page-1">
					{/* Form Header */}
					<div className="flex items-center flex-col">
						<Image
							src="/assets/mdb-logo.svg"
							alt="Watermark"
							width={250}
							height={200}
							priority
							className="object-contain"
						/>
						<div className="mt-1 flex gap-4">
							<p className="text-xs">GSTIN. 19AAPCM5435P1ZK</p>
							<p className="text-xs">CIN. NO. U45309WB2022PTC252211</p>
						</div>
						<div className="flex gap-4">
							<a
								href="https://mydearcitybuilders.com"
								target="_blank"
								className="text-xs"
							>
								www.mydearcitybuilders.com
							</a>
							<a
								href="mailto:support@mydearcitybuilders.com"
								target="_blank"
								className="text-xs"
							>
								info@mydearcitybuilders.com
							</a>
							<a href="tel:+917811831313" target="_blank" className="text-xs">
								(+91)7811831313
							</a>
						</div>
						<p className="text-xs">
							RA - 31, Tara Shankar Sarani, City Center, Durgapur, West Bengal,
							713216
						</p>
					</div>
					<p className="mt-4 text-center text-black font-semibold text-sm">
						APPLICATION FOR PROVISIONAL BOOKING AT MYDEARCITY BUILDERS PVT.
						LTD., DURGAPUR
					</p>
					{/* Customer Details */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Customer Details
							</h3>
						</div>
						<div className="p-0">
							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
											Customer ID
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Date
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Plot/Flat No
										</td>
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 text-xs py-1">
											{form?.customerId}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{formatDate(form?.date)}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.plotNo || "N/A"}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Project Name
										</td>
										<td
											colSpan={2}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.projectName || "N/A"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					{/* Applicant Details */}
					{form?.clients?.map((item, index) => (
						<div className="mt-4" key={index}>
							<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
								<h3 className="font-bold text-sm text-gray-900">
									{index === 0 ? "Applicant" : "Co-Applicant"} Details
								</h3>
							</div>

							<div className="p-0">
								<table className="w-full border-collapse">
									<tbody>
										<tr>
											<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
												{index === 0 ? "Applicant" : "Co-Applicant"} Name
											</td>
											<td
												colSpan={6}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.fullName}
											</td>
											<td
												className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium"
												rowSpan={8}
											>
												<div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
													<p className="text-gray-400 text-xs text-center">
														Passport Size Photo
													</p>
												</div>
											</td>
										</tr>

										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												S/D/W of
											</td>
											<td
												colSpan={6}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.relationship}
											</td>
										</tr>

										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Address
											</td>
											<td
												colSpan={6}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.address}
											</td>
										</tr>
										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Email
											</td>
											<td
												colSpan={6}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.email || "N/A"}
											</td>
										</tr>

										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Phone No.
											</td>
											<td
												colSpan={3}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.contactNumber}
											</td>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium w-24">
												Date of Birth
											</td>
											<td
												colSpan={2}
												className="border border-gray-400 px-2 text-xs"
											>
												{formatDate(item?.dateOfBirth)}
											</td>
										</tr>

										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Aadhaar No.
											</td>
											<td
												colSpan={3}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.aadhaarNo || "N/A"}
											</td>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium w-24">
												Pan No.
											</td>
											<td
												colSpan={2}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.panCardNo}
											</td>
										</tr>

										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Occupation
											</td>
											<td
												colSpan={3}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.occupation}
											</td>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Organisation
											</td>
											<td
												colSpan={2}
												className="border border-gray-400 px-2 text-xs capitalize"
											>
												{item?.company || "N/A"}
											</td>
										</tr>
										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Designation
											</td>
											<td
												colSpan={6}
												className="border border-gray-400 px-2 text-xs capitalize"
											>
												{item?.designation || "N/A"}
											</td>
										</tr>
										<tr>
											<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												Work Address
											</td>
											<td
												colSpan={7}
												className="border border-gray-400 px-2 text-xs"
											>
												{item?.workAddress || "N/A"}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					))}

					{/* First Signature Section */}
					<div className="">
						<div className="p-6">
							<div className="grid grid-cols-2 gap-16">
								{form?.clients?.map((applicant, index) => (
									<div className="flex flex-col items-center" key={index}>
										<div className="w-full h-14 border-2 border-dashed border-gray-300 rounded-lg mb-2 flex items-center justify-center">
											<p className="text-gray-400 text-xs">Signature Space</p>
										</div>
										<p className="text-xs font-medium mt-2">
											{applicant?.fullName} (
											{index === 0 ? "Applicant" : "Co-Applicant"})
										</p>
										<div className="w-32">
											<p className="text-xs text-center mt-1">
												Date: {formatDate(form.date)}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Page 2 */}
				<div className="page-2">
					{/* Property Details */}
					<div className="mt-6">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Property Details
							</h3>
						</div>
						<div className="p-0">
							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
											Total Cost
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Booking Amount
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Bungalow Type
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Bungalow Area
										</td>
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 text-xs py-1 capitalize">
											{form?.propertyCost}
										</td>
										<td className="border border-gray-400 px-2 text-xs capitalize">
											{form?.bookingAmount}
										</td>
										<td className="border border-gray-400 px-2 text-xs capitalize">
											{form?.propertyType || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 text-xs capitalize">
											{form?.propertyArea || "N/A"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Plot Details */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">Plot Details</h3>
						</div>
						<div className="p-0">
							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
											Plot Area
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Block Name/Number
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Plot No.
										</td>
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 text-xs py-1">
											{form?.plotArea + " sq.ft." || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.blockName || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.plotNumber || "N/A"}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Panchayat/Municipality
										</td>
										<td
											colSpan={3}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.panchayat_municipality || "N/A"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Land Identification Details */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Land Identification Details
							</h3>
						</div>
						<div className="p-0">
							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
											JL No.
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Mouza
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Dag No.
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Khatian No.
										</td>
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 text-xs py-1">
											{form?.jl_no || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.mouza || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.dag_no || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.khatian_no || "N/A"}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Panchayat/Municipality
										</td>
										<td
											colSpan={3}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.panchayat_municipality || "N/A"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Second Signature Section */}
					<div className="mt-2">
						<div className="p-6">
							<div className="grid grid-cols-2 gap-16">
								{form?.clients?.map((applicant, index) => (
									<div className="flex flex-col items-center" key={index}>
										<div className="w-full h-14 border-2 border-dashed border-gray-300 rounded-lg mb-2 flex items-center justify-center">
											<p className="text-gray-400 text-xs">Signature Space</p>
										</div>
										<p className="text-xs font-medium mt-2">
											{applicant?.fullName} (
											{index === 0 ? "Applicant" : "Co-Applicant"})
										</p>
										<div className="w-32">
											<p className="text-xs text-center mt-1">
												Date: {formatDate(form.date)}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Page 3 */}
				<div className="page-3">
					{/* Booking Payment Details */}
					<div className="mt-2">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Booking Payment Details
							</h3>
						</div>

						<div className="p-0">
							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
											Initial Booking Amount
										</td>
										<td
											colSpan={5}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.bookingAmount}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Payment Mode
										</td>
										<td
											colSpan={5}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.paymentMethod || "N/A"}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Cheque/DD No.
										</td>
										<td
											colSpan={5}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.cheque_dd_no || "N/A"}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Bank Name
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.bankName || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium w-24">
											Branch
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.branchName || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium w-24">
											IFSC Code
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.ifscCode || "N/A"}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Transaction Reference No.
										</td>
										<td
											colSpan={3}
											className="border border-gray-400 px-2 text-xs"
										>
											{form?.transactionReferenceNo || "N/A"}
										</td>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Date
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{formatDate(form?.date)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Reference & Source Information */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Reference & Source Information
							</h3>
						</div>
						<div className="p-0">
							<table className="w-full border-collapse">
								<tbody>
									<tr>
										<td
											colSpan={5}
											className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium"
										>
											How did you come to know about our project?
										</td>
									</tr>
									<tr>
										<td
											colSpan={5}
											className="border border-gray-400 px-2 text-xs py-1"
										>
											{form?.otherSource || "N/A"}{" "}
											{form?.refererContactNumber
												? form?.refererContactNumber
												: ""}
										</td>
									</tr>

									<tr>
										<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Referred By
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form?.referredBy || "N/A"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Installment Schedule */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900 capitalize">
								Installment Schedule for Bungalows
							</h3>
						</div>
						<div className="p-0">
							<table className="w-full border-collapse">
								<thead>
									<tr>
										<th className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
											Payment Milestone
										</th>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<th className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												G+1 (ECONOMIC)
											</th>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<th className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												G+1 (ECONOMIC) New
											</th>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<th className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												G+1 (PREMIUM)
											</th>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<th className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												G+1 (PREMIUM) New
											</th>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<th className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
												G+2 (PREMIUM)
											</th>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												G+2 Structure
											</td>
										)}
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Booking & Caution Money{" "}
											<span className="font-bold">*</span>
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												₹ 50,000/-
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												₹ 1,00,000/-
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												₹ 1,00,000/-
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												₹ 2,00,000/-
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												₹ 2,00,000/-
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												₹ 1,00,000/-
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Planning/Designing/Legal Compliances
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												20%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Sale Execution
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												40%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												40%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												40%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												40%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												40%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												20%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Commencement of Foundation
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												15%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												15%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												15%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												15%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												15%
											</td>
										)}

										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												15%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Commencement of 1st Roof Casting
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Commencement of 2nd Roof Casting
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Commencement of 3rd Roof Casting
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												-
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												-
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												-
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												-
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Commencement of Brick Work & Plastering
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												10%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs">
											Commencement of Colour & Flooring
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs">
												5%
											</td>
										)}
									</tr>
									<tr>
										<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
											TOTAL
										</td>
										{form?.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												100%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												100%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												100%
											</td>
										)}
										{form?.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												100%
											</td>
										)}
										{form?.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												100%
											</td>
										)}
										{form?.selectedStructureType === "G+2 Structure" && (
											<td className="border border-gray-400 px-2 py-1 text-xs font-medium">
												100%
											</td>
										)}
									</tr>
								</tbody>
							</table>
							<div className="mt-2 px-2">
								<p className="text-xs text-gray-700">
									<span className="font-bold">*</span> Note: The Booking &
									Caution Money will be adjusted in the final payment at the
									Colour & Flooring stage.
								</p>
								<p className="text-xs text-gray-700 mt-1">
									Note: All statutory taxes are to be paid separately, and they
									are applicable to each and every installment of the sale
									consideration mentioned above.
								</p>
							</div>
						</div>
					</div>

					{/* Declaration */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Declaration by the applicant(s)
							</h3>
						</div>
						<div className="p-4">
							<p className="text-xs text-gray-700 text-justify">
								I/we have carefully reviewed all the terms and conditions of
								this application for allotment and have a comprehensive
								understanding of its contents. I/we have sought legal advice in
								relation to these terms, and I/we acknowledge that my/our
								adherence to the stipulated terms is crucial for the company to
								consider the allocation of an Apartment/Bungalow to me/us.
							</p>
						</div>
					</div>
				</div>

				{/* Page 4 */}
				<div className="page-4">
					{/* Terms & Conditions */}
					<div className="mt-4">
						<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
							<h3 className="font-bold text-sm text-gray-900">
								Terms & Conditions of Application for Allotment
							</h3>
						</div>
						<div className="p-4 space-y-4">
							<div>
								<h4 className="text-xs font-medium mb-1">1. Timely Payment</h4>
								<p className="text-xs text-gray-700 text-justify">
									Timely payment is essential and forms a critical part of this
									application. Any delay in payment will be treated as a
									violation of the application terms. Applicants are solely
									responsible for ensuring timely payments, regardless of delays
									in banking processes or loan disbursement related to the
									apartment/bungalow construction.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									2. Cancellation Policy
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									In the event of a cancellation, the company reserves the right
									to evaluate the request and initiate necessary actions at its
									discretion. Any amount paid by the applicant will be refunded
									after deducting a 20% cancellation fee along with any other
									applicable charges. Refunds will be processed within 90 days
									from the date of receipt of the written cancellation request,
									provided that the sale agreement has not yet been executed.
									Upon cancellation, the company holds the full right to
									re-allocate the said apartment or bungalow to any third party
									without further notice.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									3. Project Modifications
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									The company reserves the right to make design changes,
									alterations, or modifications to meet technical, regulatory,
									or statutory requirements. This may include adjustments to the
									position, location, number, boundaries, or measurements of the
									apartment or bungalow. In case of any increase or decrease in
									the super built-up area, the cost will be recalculated at the
									original rate per square foot agreed upon. The company has
									sole discretion over such determinations.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									4. Transfer of Application
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									The applicant is not entitled to transfer the application or
									allotment to another person or nominee without prior written
									approval from the company. Any such approval, if granted, may
									be subject to a transfer fee of up to 8.5% of the total cost
									of the apartment or bungalow, at the sole discretion of the
									company.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									5. Instalment Payments & Interest on Delay
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									Payment of instalments as per the agreed schedule is of utmost
									importance. Applicants must strictly adhere to the payment
									timeline without the need for reminders or notifications from
									the company. In case of delay, interest at the rate of 21% per
									annum will be charged on a daily basis from the due date until
									the actual payment is received.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									6. Execution of Agreements
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									A formal Agreement for Sale and/or Construction will be
									executed in favour of the applicant only upon fulfilment of
									all required conditions. It is understood that this
									application does not constitute a binding contract. These
									agreements must be executed no later than 10 days prior to the
									sale execution milestone.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									7. Statutory and Additional Charges
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									In addition to the basic consideration, applicants shall bear
									all charges, deposits, taxes, or levies payable to authorities
									such as the Development Authority, Municipal Corporation,
									Panchayat, GST Department, and others. This includes
									administrative fees charged by MyDearCity Builders Pvt. Ltd.
									and statutory charges related to utilities like electricity,
									water, and sanitation. These expenses will be proportionately
									shared based on the super built-up area of each unit and are
									payable as and when demanded.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									8. Binding Nature of Terms
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									The applicant(s) agree to abide by these terms and conditions,
									in addition to those set forth in the Sale and Construction
									Agreement, which will govern the purchase of the undivided
									share of land and the apartment/bungalow in the project.
								</p>
							</div>
							<div>
								<h4 className="text-xs font-medium mb-1">
									9. Advance Payment Prior to Sale Execution
								</h4>
								<p className="text-xs text-gray-700 text-justify">
									It is mandatory that the full amount covering the Planning /
									Designing / Legal Compliances and Sale Execution installments
									be credited to the designated bank account of MyDearCity
									Builders Pvt. Ltd. at least 72 working hours prior to the
									scheduled date of Sale Agreement execution.
								</p>
								<p className="text-xs text-gray-700">
									Failure to comply with this requirement may result in the
									postponement or cancellation of the Sale Execution process, at
									the sole discretion of the company.
								</p>
							</div>
						</div>
					</div>

					{/* Final Signature Section */}
					<div className="mt-8">
						<div className="p-6">
							<div className="grid grid-cols-3 gap-8">
								{form?.clients?.map((applicant, index) => (
									<div className="flex flex-col items-center" key={index}>
										<div className="w-full h-14 border-2 border-dashed border-gray-300 rounded-lg mb-2 flex items-center justify-center">
											<p className="text-gray-400 text-xs">Signature Space</p>
										</div>
										<p className="text-xs font-medium mt-2">
											{applicant?.fullName} (
											{index === 0 ? "Applicant" : "Co-Applicant"})
										</p>
										<div className="w-32">
											<p className="text-xs text-center mt-1">
												Date: {formatDate(form.date)}
											</p>
										</div>
									</div>
								))}
								<div className="flex flex-col items-center text-center">
									<div className="w-full h-14 mb-2 flex items-center justify-center">
										<Image
											src="/assets/signatory.jpg"
											alt="signature"
											className="h-full object-contain"
											width={100}
											height={100}
										/>
									</div>
									<p className="text-xs font-medium mt-2">
										MyDearCity Builders Pvt. Ltd.(Authorized Signatory)
									</p>
									<div className="w-32">
										<p className="text-xs text-center mt-1">
											Date: {formatDate(form.date)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

// Add print styles
const printStyles = `
@media print {
	@page {
		size: A4;
		margin: 10mm;
		background: white;
	}
	
	body {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
		background: white !important;
	}
	
	.print\\:hidden {
		display: none !important;
	}
	
	section {
		padding: 0 !important;
		margin: 0 !important;
		background: white !important;
		height: auto !important;
		overflow: hidden !important;
	}
	
	.bg-gray-300 {
		background-color: #d1d5db !important;
	}
	
	.border-gray-400 {
		border-color: #9ca3af !important;
	}
	
	.text-gray-700 {
		color: #374151 !important;
	}
	
	.text-gray-600 {
		color: #4b5563 !important;
	}
	
	.text-gray-900 {
		color: #111827 !important;
	}

	/* Page 1: Heading, Customer Details, Applicant Details, Co-applicant Details, and Signature */
	.page-1 {
		page-break-after: always;
		page-break-inside: avoid;
	}

	/* Page 2: Property Details, Land Identification Details, and Signature */
	.page-2 {
		page-break-after: always;
		page-break-inside: avoid;
	}

	/* Page 3: Booking Payment Details, Reference & Source Information, Installment Schedule, Declaration */
	.page-3 {
		page-break-after: always;
		page-break-inside: avoid;
	}

	/* Page 4: Terms & Conditions and Signature */
	.page-4 {
		page-break-after: avoid;
		page-break-inside: avoid;
	}

	/* Ensure sections within each page stay together */
	.page-1 > div,
	.page-2 > div,
	.page-3 > div,
	.page-4 > div {
		page-break-inside: avoid;
	}

	/* Prevent any extra content from creating new pages */
	* {
		page-break-after: auto;
	}
}
`;

// Add style tag to head
if (typeof document !== "undefined") {
	const style = document.createElement("style");
	style.textContent = printStyles;
	document.head.appendChild(style);
}
