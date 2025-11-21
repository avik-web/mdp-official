"use client";

import {
	BookingFormValues,
	ClientDetail,
} from "@/lib/validation/bookingFormSchema";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();
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

export default function PublicViewBookingFormPage() {
	const params = useParams();
	const formId = params.id as string;

	const [form, setForm] = useState<BookingForm | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		async function fetchForm() {
			try {
				const res = await fetch(`/api/forms/${formId}`);
				if (!res.ok) {
					throw new Error("Failed to fetch form");
				}
				const data = await res.json();
				// Ensure clientDetails is always populated
				setForm({
					...data,
					clientDetails: data.clientDetails || data.clients || [],
				});
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
		<div className="min-h-screen bg-white text-black text-xs">
			<section ref={formRef} className="max-w-[900px] mx-auto p-8 bg-white">
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
											{form.customerId || "-"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form.date ? formatDate(form.date) : "-"}
										</td>
										<td className="border border-gray-400 px-2 text-xs">
											{form.plotNo || "N/A"}
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
											{form.projectName || "-"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					{/* Applicant Details */}
					{form.clients && form.clients.length > 0 && (
						<>
							{form.clients.map((client, idx) => (
								<div className="mt-6" key={idx}>
									<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
										<h3 className="font-bold text-sm text-gray-900">
											{idx === 0 ? "Applicant" : "Co-Applicant"} Details
										</h3>
									</div>
									<div className="p-0">
										<table className="w-full border-collapse">
											<tbody>
												<tr>
													<td className="border border-gray-400 px-2 py-1 w-48 bg-gray-50 text-xs font-medium">
														Name
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.fullName || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Relationship (S/D/W of)
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.relationship || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Address
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.address || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Email
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.email || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Phone No.
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.contactNumber || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Date of Birth
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.dateOfBirth
															? formatDate(client.dateOfBirth)
															: "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Aadhaar No.
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.aadhaarNo || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														PAN Card No.
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.panCardNo || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Occupation
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.occupation || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Organisation
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.company || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Designation
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.designation || "-"}
													</td>
												</tr>
												<tr>
													<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
														Work Address
													</td>
													<td className="border border-gray-400 px-2 py-1">
														{client.workAddress || "-"}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							))}
						</>
					)}
				</div>

				{/* Property Details */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Property Details
						</h3>
					</div>
					<table className="w-full border-collapse">
						<tbody>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Total Cost
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.propertyCost || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Booking Amount
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.bookingAmount || "N/A"}
								</td>
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Bungalow Type
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.propertyType || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Bungalow Area
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.propertyArea || "N/A"}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Plot Details */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">Plot Details</h3>
					</div>
					<table className="w-full border-collapse">
						<tbody>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Plot Area
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.plotArea || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Block Name/Number
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.blockName || "N/A"}
								</td>
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Plot No.
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.plotNo || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Panchayat/Municipality
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.panchayat_municipality || "N/A"}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Land Identification Details */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Land Identification Details
						</h3>
					</div>
					<table className="w-full border-collapse">
						<tbody>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									JL No.
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.jl_no || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Mouza
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.mouza || "N/A"}
								</td>
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Dag No.
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.dag_no || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Panchayat/Municipality
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.panchayat_municipality || "N/A"}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Booking Payment Details */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Booking Payment Details
						</h3>
					</div>
					<table className="w-full border-collapse">
						<tbody>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Initial Booking Amount
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.bookingAmount || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Payment Mode
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.paymentMethod || "N/A"}
								</td>
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Cheque/DD No.
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.cheque_dd_no || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Bank Name
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.bankName || "N/A"}
								</td>
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Branch
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.branchName || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									IFSC Code
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.ifscCode || "N/A"}
								</td>
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Transaction Reference No.
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.transactionReferenceNo || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Date
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.paymentDate ? formatDate(form.paymentDate) : "N/A"}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Reference & Source Information */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Reference & Source Information
						</h3>
					</div>
					<table className="w-full border-collapse">
						<tbody>
							<tr>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									How did you come to know about our project?
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.referencsources?.join(", ") || "N/A"}
								</td>
								<td className="border border-gray-400 px-2 py-1 bg-gray-50 text-xs font-medium">
									Referred By
								</td>
								<td className="border border-gray-400 px-2 py-1">
									{form.referredBy || "N/A"}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Installment Schedule for Bungalow */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Installment Schedule for Bungalow
						</h3>
					</div>
					<table className="w-full border-collapse text-xs">
						<thead>
							<tr>
								<th className="border border-gray-400 px-2 py-1 bg-gray-50">
									Payment Milestone
								</th>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<th className="border border-gray-400 px-2 py-1 bg-gray-50">
										G+1 (ECONOMIC)
									</th>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<th className="border border-gray-400 px-2 py-1 bg-gray-50">
										G+1 (ECONOMIC) New
									</th>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<th className="border border-gray-400 px-2 py-1 bg-gray-50">
										G+1 (PREMIUM)
									</th>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<th className="border border-gray-400 px-2 py-1 bg-gray-50">
										G+1 (PREMIUM) New
									</th>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<th className="border border-gray-400 px-2 py-1 bg-gray-50">
										G+2 (PREMIUM)
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Booking & Caution Money *
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">
										₹50,000/-
									</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">
										₹1,00,000/-
									</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">
										₹1,00,000/-
									</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">
										₹2,00,000/-
									</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">
										₹2,00,000/-
									</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Planning/Designing/Legal Compliances
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Sale Execution
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">40%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">40%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">40%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">40%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">40%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Commencement of Foundation
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">15%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">15%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">15%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">15%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">15%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Commencement of 1st Roof Casting
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Commencement of 2nd Roof Casting
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Commencement of 3rd Roof Casting
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">-</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">-</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">-</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">-</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Commencement of Brick Work & Plastering
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">10%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
							</tr>
							<tr>
								<td className="border border-gray-400 px-2 py-1">
									Commencement of Colour & Flooring
								</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">5%</td>
								)}
							</tr>
							<tr className="font-bold">
								<td className="border border-gray-400 px-2 py-1">TOTAL</td>
								{form.selectedStructureType === "G+1 (ECONOMIC)" && (
									<td className="border border-gray-400 px-2 py-1">100%</td>
								)}
								{form.selectedStructureType === "G+1 (ECONOMIC) New" && (
									<td className="border border-gray-400 px-2 py-1">100%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">100%</td>
								)}
								{form.selectedStructureType === "G+1 (PREMIUM) New" && (
									<td className="border border-gray-400 px-2 py-1">100%</td>
								)}
								{form.selectedStructureType === "G+2 (PREMIUM)" && (
									<td className="border border-gray-400 px-2 py-1">100%</td>
								)}
							</tr>
						</tbody>
					</table>
					<p className="text-xs mt-2">
						* Note: The Booking & Caution Money will be adjusted in the final
						payment at the Colour & Flooring stage
					</p>
					<p className="text-xs mt-1">
						Note: All statutory taxes are to be paid separately, and they are
						applicable to each and every installment of the sale consideration
						mentioned above.
					</p>
				</div>

				{/* Declaration */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Declaration by the applicant(s)
						</h3>
					</div>
					<p className="mt-2 text-xs">
						I/we have carefully reviewed all the terms and conditions of this
						application for allotment and have a comprehensive understanding of
						its contents. I/we have sought legal advice in relation to these
						terms, and I/we acknowledge that my/our adherence to the stipulated
						terms is crucial for the company to consider the allocation of an
						Apartment/Bungalow to me/us.
					</p>
				</div>

				{/* Terms & Conditions */}
				<div className="mt-8">
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Terms & Conditions of Application for Allotment
						</h3>
					</div>
					<ol className="list-decimal pl-6 mt-2 text-xs space-y-2">
						<li>
							<b>Timely Payment</b> Timely payment is essential and forms a
							critical part of this application. Any delay in payment will be
							treated as a violation of the application terms. Applicants are
							solely responsible for ensuring timely payments, regardless of
							delays in banking processes or loan disbursement related to the
							apartment/bungalow construction.
						</li>
						<li>
							<b>Cancellation Policy</b> In the event of a cancellation, the
							company reserves the right to evaluate the request and initiate
							necessary actions at its discretion. Any amount paid by the
							applicant will be refunded after deducting a 20% cancellation fee
							along with any other applicable charges. Refunds will be processed
							within 90 days from the date of receipt of the written
							cancellation request, provided that the sale agreement has not yet
							been executed. Upon cancellation, the company holds the full right
							to re-allocate the said apartment or bungalow to any third party
							without further notice.
						</li>
						<li>
							<b>Project Modifications</b> The company reserves the right to
							make design changes, alterations, or modifications to meet
							technical, regulatory, or statutory requirements. This may include
							adjustments to the position, location, number, boundaries, or
							measurements of the apartment or bungalow. In case of any increase
							or decrease in the super built-up area, the cost will be
							recalculated at the original rate per square foot agreed upon. The
							company has sole discretion over such determinations.
						</li>
						<li>
							<b>Transfer of Application</b> The applicant is not entitled to
							transfer the application or allotment to another person or nominee
							without prior written approval from the company. Any such
							approval, if granted, may be subject to a transfer fee of up to
							8.5% of the total cost of the apartment or bungalow, at the sole
							discretion of the company.
						</li>
						<li>
							<b>Instalment Payments & Interest on Delay</b> Payment of
							instalments as per the agreed schedule is of utmost importance.
							Applicants must strictly adhere to the payment timeline without
							the need for reminders or notifications from the company. In case
							of delay, interest at the rate of 21% per annum will be charged on
							a daily basis from the due date until the actual payment is
							received.
						</li>
						<li>
							<b>Execution of Agreements</b> A formal Agreement for Sale and/or
							Construction will be executed in favour of the applicant only upon
							fulfilment of all required conditions. It is understood that this
							application does not constitute a binding contract. These
							agreements must be executed no later than 10 days prior to the
							sale execution milestone.
						</li>
						<li>
							<b>Statutory and Additional Charges</b> In addition to the basic
							consideration, applicants shall bear all charges, deposits, taxes,
							or levies payable to authorities such as the Development
							Authority, Municipal Corporation, Panchayat, GST Department, and
							others. This includes administrative fees charged by MyDearCity
							Builders Pvt. Ltd. and statutory charges related to utilities like
							electricity, water, and sanitation. These expenses will be
							proportionately shared based on the super built-up area of each
							unit and are payable as and when demanded.
						</li>
						<li>
							<b>Binding Nature of Terms</b> The applicant(s) agree to abide by
							these terms and conditions, in addition to those set forth in the
							Sale and Construction Agreement, which will govern the purchase of
							the undivided share of land and the apartment/bungalow in the
							project.
						</li>
						<li>
							<b>Advance Payment Prior to Sale Execution</b> It is mandatory
							that the full amount covering the Planning / Designing / Legal
							Compliances and Sale Execution installments be credited to the
							designated bank account of MyDearCity Builders Pvt. Ltd. at least
							72 working hours prior to the scheduled date of Sale Agreement
							execution.
						</li>
						<li>
							Failure to comply with this requirement may result in the
							postponement or cancellation of the Sale Execution process, at the
							sole discretion of the company.
						</li>
					</ol>
				</div>

				{/* Signature Spaces */}
				<div className="mt-12 flex flex-col gap-8">
					<div>
						<p className="font-semibold">Signature Space</p>
						<p className="mt-2">
							{form.clients?.[0]?.fullName || "Applicant"} (Applicant)
						</p>
						<p>Date: {form.date ? formatDate(form.date) : "__________"}</p>
					</div>
					<div>
						<Image
							src="/assets/signatory.jpg"
							alt="signature"
							className="h-10 w-auto object-contain"
							width={100}
							height={100}
						/>
						<p className="font-semibold">Signature</p>
						<p>MyDearCity Builders Pvt. Ltd. (Authorized Signatory)</p>
					</div>
				</div>

				<div className="mt-8 text-center text-base text-green-700 font-semibold">
					Thank you for booking with us!
				</div>
			</section>
			<div className="mt-8 flex justify-center">
				<button
					onClick={() => window.print()}
					className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors shadow print:hidden"
				>
					Print Now
				</button>
			</div>
		</div>
	);
}
