"use client";

import { useState } from "react";
import { BookingFormValues } from "@/lib/validation/bookingFormSchema";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface BookingModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	formId?: string;
}

interface ExtendedBookingFormValues extends BookingFormValues {
	transactionId?: string;
	clientSignature?: string;
	clientFullName?: string;
	clientAddress?: string;
	clientCity?: string;
	clientState?: string;
	clientPinCode?: string;
	clientContactNumber?: string;
	clientEmail?: string;
	clientPanCardNo?: string;
	clientAadhaarNo?: string;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
	const [formData, setFormData] = useState<Partial<ExtendedBookingFormValues>>({
		referenceNo: "",
		date: new Date().toISOString().split("T")[0],
		clientFullName: "",
		clientAddress: "",
		clientCity: "",
		clientState: "",
		clientPinCode: "",
		clientContactNumber: "",
		clientEmail: "",
		clientPanCardNo: "",
		clientAadhaarNo: "",
		propertylocation: "",
		plotNumber: "",
		blockName: "",
		plotArea: "",
		plotFacing: "",
		propertyType: "",
		propertyArea: "",
		estimatedProjectValue: undefined,
		estimatedConstructionPeriod: "",
		selectedStructureType: "G+1 (ECONOMIC)",
		bookingAmount: undefined,
		paymentMethod: undefined,
		bankName: "",
		accountNumber: "",
		ifscCode: "",
		accountHolderName: "",
		docPanCard: false,
		docAadharCard: false,
		docPropertyDocuments: false,
		docPassportPhotos: false,
		clientSignatureName: "",
		clientSignatureDate: "",
		clientSignature: "",
		contractorSignatureName: "",
		contractorSignatureDate: "",
		contractorSignature: "",
		mdbRepresentativeSignatureName: "",
		mdbRepresentativeSignatureDate: "",
		mdbRepresentativeSignature: "",
	});

	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	if (!open) return null;

	const onsubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setSuccess(false);

		try {
			// Transform the form data to match the expected schema
			const transformedData = {
				customerId: `MDCBPL-${formData.clientFullName
					?.split(" ")
					.map((n) => n.charAt(0))
					.join("")}${formData.clientPanCardNo || ""}`,
				referenceNo: formData.referenceNo || "",
				date: formData.date || new Date().toISOString().split("T")[0],
				clients: [
					{
						id: "1",
						fullName: formData.clientFullName || "",
						address: formData.clientAddress || "",
						city: formData.clientCity || "",
						state: formData.clientState || "",
						pinCode: formData.clientPinCode || "",
						contactNumber: formData.clientContactNumber || "",
						email: formData.clientEmail || "",
						panCardNo: formData.clientPanCardNo || "",
						aadhaarNo: formData.clientAadhaarNo || "",
						type: "applicant" as const,
					},
				],
				plotNumber: formData.plotNumber || "",
				projectName: "",
				blockName: formData.blockName || "",
				plotArea: formData.plotArea || "",
				plotFacing: formData.plotFacing || "",
				propertyType: formData.propertyType || "",
				propertyArea: formData.propertyArea || "",
				propertyCost: formData.estimatedProjectValue?.toString() || "",
				propertylocation: formData.propertylocation || "",
				estimatedConstructionPeriod: formData.estimatedConstructionPeriod || "",
				selectedStructureType:
					formData.selectedStructureType || "G+1 (ECONOMIC)",
				bookingAmount: formData.bookingAmount?.toString() || "",
				bankName: formData.bankName || "",
				accountNumber: formData.accountNumber || "",
				ifscCode: formData.ifscCode || "",
				accountHolderName: formData.accountHolderName || "",
				docPanCard: formData.docPanCard || false,
				docAadharCard: formData.docAadharCard || false,
				docPropertyDocuments: formData.docPropertyDocuments || false,
				docPassportPhotos: formData.docPassportPhotos || false,
				clientSignatureName: formData.clientSignatureName || "",
				clientSignatureDate: formData.clientSignatureDate || "",
				clientSignature: formData.clientSignature || "",
				contractorSignatureName: formData.contractorSignatureName || "",
				contractorSignatureDate: formData.contractorSignatureDate || "",
				contractorSignature: formData.contractorSignature || "",
				mdbRepresentativeSignatureName:
					formData.mdbRepresentativeSignatureName || "",
				mdbRepresentativeSignatureDate:
					formData.mdbRepresentativeSignatureDate || "",
				mdbRepresentativeSignature: formData.mdbRepresentativeSignature || "",
				hasCoApplicant: false,
			};

			const response = await fetch(`/api/forms`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(transformedData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Something went wrong!");
			}

			// Success
			setSuccess(true);
			toast.success("Booking submitted successfully!");

			// Reset the form
			setFormData({
				referenceNo: "",
				clientFullName: "",
				clientAddress: "",
				clientCity: "",
				clientState: "",
				clientPinCode: "",
				clientContactNumber: "",
				clientEmail: "",
				clientPanCardNo: "",
				clientAadhaarNo: "",
				propertylocation: "",
				plotNumber: "",
				blockName: "",
				plotArea: "",
				plotFacing: "",
				propertyType: "",
				propertyArea: "",
				estimatedConstructionPeriod: "",
				selectedStructureType: "G+1 (ECONOMIC)",
				bankName: "",
				accountNumber: "",
				ifscCode: "",
				accountHolderName: "",
				transactionId: "",
				docPanCard: false,
				docAadharCard: false,
				docPropertyDocuments: false,
				docPassportPhotos: false,
				clientSignatureName: "",
				clientSignatureDate: "",
				clientSignature: "",
				contractorSignatureName: "",
				contractorSignatureDate: "",
				contractorSignature: "",
				mdbRepresentativeSignatureName: "",
				mdbRepresentativeSignatureDate: "",
				mdbRepresentativeSignature: "",
			});

			// Close modal after delay
			setTimeout(() => {
				onClose();
				setSuccess(false);
			}, 2000);
		} catch (error: unknown) {
			if (error instanceof Error) toast.error(error.message);
			console.error("Error submitting booking:", error);
			toast.error("Failed to submit booking");
		} finally {
			setSubmitting(false);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;
		const input = e.target as HTMLInputElement;

		if (type === "radio") {
			setFormData((prev: Partial<ExtendedBookingFormValues>) => ({
				...prev,
				[name]: value,
			}));
		} else if (type === "checkbox") {
			setFormData((prev: Partial<ExtendedBookingFormValues>) => ({
				...prev,
				[name]: input.checked,
			}));
		} else if (name === "estimatedProjectValue" || name === "bookingAmount") {
			const numValue = value === "" ? undefined : parseFloat(value);
			setFormData((prev: Partial<ExtendedBookingFormValues>) => ({
				...prev,
				[name]: numValue,
			}));
		} else {
			setFormData((prev: Partial<ExtendedBookingFormValues>) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSignatureChange = (
		field: keyof ExtendedBookingFormValues,
		value: string
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-lg shadow-lg my-8 print:shadow-none print:p-0">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold z-10 print:hidden"
					aria-label="Close"
					disabled={submitting}
				>
					×
				</button>

				<div className="h-full overflow-y-auto px-8 py-6">
					<div className="top-0 bg-white pb-4 z-10">
						<h1 className="text-3xl font-bold mb-6 text-center text-gray-900 print:text-black">
							BUNGALOW BOOKING FORM
						</h1>
					</div>

					{success && (
						<div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
							Booking submitted successfully!
						</div>
					)}

					<form
						onSubmit={onsubmit}
						className="space-y-6 print:space-y-2 print:text-sm"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
							<div>
								<label
									htmlFor="referenceNo"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Reference No: MDB-
								</label>
								<input
									type="text"
									name="referenceNo"
									id="referenceNo"
									value={formData.referenceNo || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="date"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Date:
								</label>
								<input
									type="date"
									name="date"
									id="date"
									value={formData.date || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							CLIENT DETAILS
						</h2>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
							<div>
								<label
									htmlFor="clientFullName"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Full Name *
								</label>
								<input
									type="text"
									name="clientFullName"
									id="clientFullName"
									value={formData.clientFullName || ""}
									onChange={handleInputChange}
									required
									className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="clientContactNumber"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Contact Number:
								</label>
								<input
									type="tel"
									name="clientContactNumber"
									id="clientContactNumber"
									value={formData.clientContactNumber || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="clientAddress"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Address:
							</label>
							<input
								type="text"
								name="clientAddress"
								id="clientAddress"
								value={formData.clientAddress || ""}
								onChange={handleInputChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
							/>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-4 print:gap-2 print:grid-cols-4">
							<div>
								<label
									htmlFor="clientCity"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									City:
								</label>
								<input
									type="text"
									name="clientCity"
									id="clientCity"
									value={formData.clientCity || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="clientState"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									State:
								</label>
								<input
									type="text"
									name="clientState"
									id="clientState"
									value={formData.clientState || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="clientPinCode"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									PIN Code:
								</label>
								<input
									type="text"
									name="clientPinCode"
									id="clientPinCode"
									value={formData.clientPinCode || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="clientEmail"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Email:
								</label>
								<input
									type="email"
									name="clientEmail"
									id="clientEmail"
									value={formData.clientEmail || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
							<div>
								<label
									htmlFor="clientPanCardNo"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									PAN Card No.:
								</label>
								<input
									type="text"
									name="clientPanCardNo"
									id="clientPanCardNo"
									value={formData.clientPanCardNo || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="clientAadhaarNo"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Aadhaar No.:
								</label>
								<input
									type="text"
									name="clientAadhaarNo"
									id="clientAadhaarNo"
									value={formData.clientAadhaarNo || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							PROJECT DETAILS
						</h2>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
							<div>
								<label
									htmlFor="propertylocation"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Project Location:
								</label>
								<input
									type="text"
									name="propertylocation"
									id="propertylocation"
									value={formData.propertylocation || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="plotNumber"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Plot Number:
								</label>
								<input
									type="text"
									name="plotNumber"
									id="plotNumber"
									value={formData.plotNumber || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
							<div>
								<label
									htmlFor="blockName"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Block Name:
								</label>
								<input
									type="text"
									name="blockName"
									id="blockName"
									value={formData.blockName || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="plotArea"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Plot Area:
								</label>
								<input
									type="text"
									name="plotArea"
									id="plotArea"
									value={formData.plotArea || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
							<div>
								<label
									htmlFor="plotFacing"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Plot Facing:
								</label>
								<input
									type="text"
									name="plotFacing"
									id="plotFacing"
									value={formData.plotFacing || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="propertyType"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Bunglow Type:
								</label>
								<input
									type="text"
									name="propertyType"
									id="propertyType"
									value={formData.propertyType || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							CONSTRUCTION CATEGORY & PAYMENT SCHEDULE
						</h2>

						<div>
							<p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
								BUNGALOW CONSTRUCTION WITH LAND
							</p>
							<div className="space-y-2">
								<div className="flex items-center">
									<input
										type="radio"
										id="g1economic"
										name="selectedStructureType"
										value="G+1 (ECONOMIC)"
										checked={
											formData.selectedStructureType === "G+1 (ECONOMIC)"
										}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<label
										htmlFor="g1economic"
										className="ml-2 text-sm text-gray-900 print:text-black"
									>
										G+1 (ECONOMIC)
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										id="g1-structure-new"
										name="selectedStructureType"
										value="G+1 (ECONOMIC) New"
										checked={
											formData.selectedStructureType === "G+1 (ECONOMIC) New"
										}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<label
										htmlFor="g1economic"
										className="ml-2 text-sm text-gray-900 print:text-black"
									>
										G+1 (ECONOMIC) New
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										id="g1Structure"
										name="selectedStructureType"
										value="G+1 (PREMIUM)"
										checked={formData.selectedStructureType === "G+1 (PREMIUM)"}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<label
										htmlFor="g1Structure"
										className="ml-2 text-sm text-gray-900 print:text-black"
									>
										G+1 (PREMIUM)
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										id="g1Structure"
										name="selectedStructureType"
										value="G+1 (PREMIUM) New"
										checked={formData.selectedStructureType === "G+1 (PREMIUM) New"}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<label
										htmlFor="g1StructureNew"
										className="ml-2 text-sm text-gray-900 print:text-black"
									>
										G+1 (PREMIUM) New
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="radio"
										id="g2Structure"
										name="selectedStructureType"
										value="G+2 (PREMIUM)"
										checked={formData.selectedStructureType === "G+2 (PREMIUM)"}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<label
										htmlFor="g2Structure"
										className="ml-2 text-sm text-gray-900 print:text-black"
									>
										G+2 (PREMIUM)
									</label>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="text-lg font-medium mb-2 text-gray-900 print:text-black">
								Payment Schedule
							</h3>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200 border border-gray-300 print:border-black">
									<thead className="bg-gray-50 print:bg-white">
										<tr>
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r print:text-black print:border-black">
												Payment Milestone
											</th>
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r print:text-black print:border-black">
												G+1 (ECONOMIC)
											</th>
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r print:text-black print:border-black">
												G+1 (ECONOMIC) New
											</th>
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r print:text-black print:border-black">
												G+1 (PREMIUM)
											</th>
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r print:text-black print:border-black">
												G+1 (PREMIUM) New
											</th>
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black">
												G+2 (PREMIUM)
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200 print:divide-black">
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Caution Money
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												₹50,000/-
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												₹1,00,000/-
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												₹2,00,000/-
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												₹2,00,000/-
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Planning/Designing/Legal Compliances
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Sale Execution
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												40%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												40%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												40%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												40%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Commencement of Foundation
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												15%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												15%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												15%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												15%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Commencement of 1st Roof Casting
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Commencement of 2nd Roof Casting
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Commencement of 3rd Roof Casting
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												-
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												-
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												-
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Commencement of Brick Work & Plastering
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												10%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												Commencement of Colour & Flooring
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												5%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												5%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
												5%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										</tr>
										<tr>
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 border-r print:text-black print:border-black">
												TOTAL
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 border-r print:text-black print:border-black">
												100%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 border-r print:text-black print:border-black">
												100%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 border-r print:text-black print:border-black">
												100%
											</td>
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 print:text-black">
												100%
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<p className="mt-2 text-sm text-gray-600 print:text-black">
								Note: The Booking & Caution Money will be adjusted in the final payment at the Colour & Flooring stage
							</p>
						</div>

						<h3 className="text-xl text-gray-700 font-bold mt-8 mb-4 border-b pb-2">
							BOOKING DECLARATION
						</h3>
						<p className="text-sm text-gray-900 italic">
							I/We hereby confirm that I/We have read and understood the payment
							schedule and all terms and conditions mentioned in the Tripartite
							Agreement. I/We agree to make payments as per the schedule
							selected above.
						</p>
						<p className="text-sm text-gray-900 mt-4">I/We understand that:</p>
						<ol className="list-decimal list-inside text-sm text-gray-900 space-y-1">
							<li>
								All payments will be routed through mydearbuilder.com escrow
								payment system
							</li>
							<li>
								TDS and applicable taxes will be deducted as per government
								regulations
							</li>
							<li>
								Caution money will be adjusted in the final payment at the Colour & Flooring stage.

							</li>
						</ol>

						<h3 className="text-xl text-gray-700 font-bold mt-8 mb-4 border-b pb-2">
							SELECTED PAYMENT TERMS
						</h3>
						<div className="space-y-2">
							<div className="flex items-center">
								<input
									type="radio"
									name="selectedStructureType"
									value="G+1 (ECONOMIC)"
									checked={
										formData.selectedStructureType === "G+1 (ECONOMIC)"
									}
									onChange={handleInputChange}
									className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
								/>
								<label className="ml-2 text-sm text-gray-900">
									G+1 (ECONOMIC)
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									name="selectedStructureType"
									value="G+1 (ECONOMIC) New"
									checked={
										formData.selectedStructureType === "G+1 (ECONOMIC) New"
									}
									onChange={handleInputChange}
									className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
								/>
								<label className="ml-2 text-sm text-gray-900">
									G+1 (ECONOMIC) New
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									name="selectedStructureType"
									value="G+1 (PREMIUM)"
									checked={formData.selectedStructureType === "G+1 (PREMIUM)"}
									onChange={handleInputChange}
									className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
								/>
								<label className="ml-2 text-sm text-gray-900">
									G+1 (PREMIUM)
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									name="selectedStructureType"
									value="G+1 (PREMIUM) New"
									checked={formData.selectedStructureType === "G+1 (PREMIUM) New"}
									onChange={handleInputChange}
									className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
								/>
								<label className="ml-2 text-sm text-gray-900">
									G+1 (PREMIUM) New
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									name="selectedStructureType"
									value="G+2 (PREMIUM)"
									checked={formData.selectedStructureType === "G+2 (PREMIUM)"}
									onChange={handleInputChange}
									className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
								/>
								<label className="ml-2 text-sm text-gray-900">
									G+2 (PREMIUM)
								</label>
							</div>
						</div>
						<p className="mt-4 text-sm text-gray-700">
							Payment Schedule: As per the table above for the selected category
							and structure type.
						</p>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							DOCUMENTS TO BE SUBMITTED
						</h2>
						<div className="space-y-2">
							<div className="flex items-center">
								<input
									type="checkbox"
									id="docPanCard"
									name="docPanCard"
									checked={formData.docPanCard || false}
									onChange={handleInputChange}
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="docPanCard"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									Copy of PAN Card
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="docAadharCard"
									name="docAadharCard"
									checked={formData.docAadharCard || false}
									onChange={handleInputChange}
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="docAadharCard"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									Copy of Aadhaar Card
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="docPropertyDocuments"
									name="docPropertyDocuments"
									checked={formData.docPropertyDocuments || false}
									onChange={handleInputChange}
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="docPropertyDocuments"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									Property Documents (if applicable)
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="docPassportPhotos"
									name="docPassportPhotos"
									checked={formData.docPassportPhotos || false}
									onChange={handleInputChange}
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="docPassportPhotos"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									Passport Size Photographs (2)
								</label>
							</div>
						</div>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							PAYMENT DETAILS
						</h2>

						<div className="space-y-4">
							<div>
								<label
									htmlFor="bookingAmount"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Booking Amount: ₹
								</label>
								<input
									type="number"
									name="bookingAmount"
									id="bookingAmount"
									value={formData.bookingAmount || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>

							<div>
								<p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
									Payment Method:
								</p>
								<div className="space-y-2">
									<div className="flex items-center">
										<input
											type="radio"
											id="paymentMethodCash"
											name="paymentMethod"
											value="Cash"
											checked={formData.paymentMethod === "Cash"}
											onChange={handleInputChange}
											className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
										/>
										<label
											htmlFor="paymentMethodCash"
											className="ml-2 text-sm text-gray-900 print:text-black"
										>
											Cash
										</label>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											id="paymentMethodCheque"
											name="paymentMethod"
											value="Cheque"
											checked={formData.paymentMethod === "Cheque"}
											onChange={handleInputChange}
											className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
										/>
										<label
											htmlFor="paymentMethodCheque"
											className="ml-2 text-sm text-gray-900 print:text-black"
										>
											Cheque
										</label>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											id="paymentMethodNEFT"
											name="paymentMethod"
											value="NEFT/RTGS"
											checked={formData.paymentMethod === "NEFT/RTGS"}
											onChange={handleInputChange}
											className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
										/>
										<label
											htmlFor="paymentMethodNEFT"
											className="ml-2 text-sm text-gray-900 print:text-black"
										>
											NEFT/RTGS
										</label>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											id="paymentMethodUPI"
											name="paymentMethod"
											value="UPI"
											checked={formData.paymentMethod === "UPI"}
											onChange={handleInputChange}
											className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
										/>
										<label
											htmlFor="paymentMethodUPI"
											className="ml-2 text-sm text-gray-900 print:text-black"
										>
											UPI
										</label>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-700 print:text-black">
									Bank Details:
								</p>
								<div>
									<label
										htmlFor="bankName"
										className="block text-sm font-medium text-gray-700 print:text-black"
									>
										Bank Name:
									</label>
									<input
										type="text"
										name="bankName"
										id="bankName"
										value={formData.bankName || ""}
										onChange={handleInputChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
								</div>
								<div>
									<label
										htmlFor="accountNumber"
										className="block text-sm font-medium text-gray-700 print:text-black"
									>
										Account Number:
									</label>
									<input
										type="text"
										name="accountNumber"
										id="accountNumber"
										value={formData.accountNumber || ""}
										onChange={handleInputChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
								</div>
								<div>
									<label
										htmlFor="ifscCode"
										className="block text-sm font-medium text-gray-700 print:text-black"
									>
										IFSC Code:
									</label>
									<input
										type="text"
										name="ifscCode"
										id="ifscCode"
										value={formData.ifscCode || ""}
										onChange={handleInputChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
								</div>
							</div>
						</div>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							SIGNATURES
						</h2>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 print:gap-2 print:grid-cols-3">
							<div>
								<p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
									Client:
								</p>

								<input
									type="text"
									value={formData.clientSignatureName || ""}
									onChange={(e) =>
										handleSignatureChange("clientSignatureName", e.target.value)
									}
									placeholder="Enter client name"
									className="w-full p-2 border rounded mb-2"
								/>
								<input
									type="date"
									value={formData.clientSignatureDate || ""}
									onChange={(e) =>
										handleSignatureChange("clientSignatureDate", e.target.value)
									}
									className="w-full p-2 border rounded mb-2"
								/>

								<p className="text-sm text-gray-900 print:text-black">
									Name:{" "}
									{formData.clientSignatureName || "_________________________"}
								</p>
								<p className="text-sm text-gray-900 print:text-black">
									Date:{" "}
									{formData.clientSignatureDate || "_________________________"}
								</p>

								{formData.clientSignature && (
									<div className="mt-2">
										<Image
											src={formData.clientSignature}
											alt="Client Signature"
											className="max-w-[200px] border border-gray-300"
										/>
									</div>
								)}
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
									Contractor:
								</p>

								<input
									type="text"
									value={formData.contractorSignatureName || ""}
									onChange={(e) =>
										handleSignatureChange(
											"contractorSignatureName",
											e.target.value
										)
									}
									placeholder="Enter contractor name"
									className="w-full p-2 border rounded mb-2"
								/>
								<input
									type="date"
									value={formData.contractorSignatureDate || ""}
									onChange={(e) =>
										handleSignatureChange(
											"contractorSignatureDate",
											e.target.value
										)
									}
									className="w-full p-2 border rounded mb-2"
								/>

								<p className="text-sm text-gray-900 print:text-black">
									Name:{" "}
									{formData.contractorSignatureName ||
										"_________________________"}
								</p>
								<p className="text-sm text-gray-900 print:text-black">
									Date:{" "}
									{formData.contractorSignatureDate ||
										"_________________________"}
								</p>

								{formData.contractorSignature && (
									<div className="mt-2">
										<Image
											src={formData.contractorSignature}
											alt="Contractor Signature"
											className="max-w-[200px] border border-gray-300"
										/>
									</div>
								)}
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
									MDB Representative:
								</p>

								<input
									type="text"
									value={formData.mdbRepresentativeSignatureName || ""}
									onChange={(e) =>
										handleSignatureChange(
											"mdbRepresentativeSignatureName",
											e.target.value
										)
									}
									placeholder="Enter MDB representative name"
									className="w-full p-2 border rounded mb-2"
								/>
								<input
									type="date"
									value={formData.mdbRepresentativeSignatureDate || ""}
									onChange={(e) =>
										handleSignatureChange(
											"mdbRepresentativeSignatureDate",
											e.target.value
										)
									}
									className="w-full p-2 border rounded mb-2"
								/>

								<p className="text-sm text-gray-900 print:text-black">
									Name:{" "}
									{formData.mdbRepresentativeSignatureName ||
										"_________________________"}
								</p>
								<p className="text-sm text-gray-900 print:text-black">
									Date:{" "}
									{formData.mdbRepresentativeSignatureDate ||
										"_________________________"}
								</p>

								{formData.mdbRepresentativeSignature && (
									<div className="mt-2">
										<Image
											src={formData.mdbRepresentativeSignature}
											alt="MDB Representative Signature"
											className="max-w-[200px] border border-gray-300"
										/>
									</div>
								)}
							</div>
						</div>

						<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
							For Official Use Only
						</h2>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 print:gap-2 print:grid-cols-3">
							<div>
								<label
									htmlFor="officialBookingId"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Booking ID:
								</label>
								<input
									type="text"
									name="officialBookingId"
									id="officialBookingId"
									value={formData.officialBookingId || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="officialVerifiedBy"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Verified By:
								</label>
								<input
									type="text"
									name="officialVerifiedBy"
									id="officialVerifiedBy"
									value={formData.officialVerifiedBy || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
							<div>
								<label
									htmlFor="officialApprovalDate"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Approval Date:
								</label>
								<input
									type="date"
									name="officialApprovalDate"
									id="officialApprovalDate"
									value={formData.officialApprovalDate || ""}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>

						<div className="mt-8">
							<p className="text-sm font-medium text-gray-700 print:text-black">
								Created At:
							</p>
							<p className="mt-1 text-gray-900 print:text-black">
								{new Date().toLocaleString()}
							</p>
						</div>

						<div className="flex justify-end space-x-4 mt-8 print:hidden">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								disabled={submitting}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
								disabled={submitting}
							>
								{submitting ? "Submitting..." : "Submit Booking"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
