"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingFormValues } from "@/lib/validation/bookingFormSchema";
import { ClientDetail } from "@/types/clientDetails.type";
import ClientDetails from "./components/clientDetails";
import CoApplicantDetails from "./components/coApplicant";

interface FormError {
	path?: string[];
	message: string;
}

interface FieldErrors {
	[key: string]: string;
}

export default function NewBookingFormPage() {
	const router = useRouter();
	const [formData, setFormData] = useState<BookingFormValues>({
		customerId: "",
		plotNo: "",
		plotNumber: "",
		projectName: "",
		blockName: "",
		plotArea: "",
		plotFacing: "",
		propertyCost: "",
		propertyType: "",
		propertylocation: "",
		propertyArea: "",
		bookingAmount: "",
		jl_no: "",
		mouza: "",
		dag_no: "",
		khatian_no: "",
		panchayat_municipality: "",
		branchName: "",
		paymentDate: "",
		cheque_dd_no: "",
		transactionReferenceNo: "",
		estimatedConstructionPeriod: " ",
		applicantImage: "",
		coApplicantImage: "",
		docPanCard: false,
		docAadharCard: false,
		docPropertyDocuments: false,
		docPassportPhotos: false,
		selectedStructureType: "",
		referenceNo: generateReferenceNumber(),
		date: new Date().toISOString().split("T")[0],
		referencsources: [],
		propertyWebsiteDetails: "",
		brokerName: "",
		otherSource: "",
		referredBy: "",
		refererRelationship: "",
		refererContactNumber: "",
		referenceCustomerId: "",
		hasCoApplicant: false,
	});
	const [clientDetail, setClientDetail] = useState<ClientDetail>({
		id: "1",
		fullName: "",
		type: "applicant",
		address: "",
		relationship: "",
		dateOfBirth: "",
		occupation: "",
		company: "",
		designation: "",
		workAddress: "",
		city: "",
		state: "",
		pinCode: "",
		contactNumber: "",
		email: "",
		panCardNo: "",
		aadhaarNo: "",
	});
	const [coApplicantDetail, setCoApplicantDetail] = useState<ClientDetail>({
		id: "",
		fullName: "",
		type: "co-applicant",
		address: "",
		relationship: "",
		dateOfBirth: "",
		occupation: "",
		company: "",
		designation: "",
		workAddress: "",
		city: "",
		state: "",
		pinCode: "",
		contactNumber: "",
		email: "",
		panCardNo: "",
		aadhaarNo: "",
	});

	const [errors, setErrors] = useState<FieldErrors | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;
		const input = e.target as HTMLInputElement;

		if (type === "radio") {
			if (name === "paymentMethod") {
				// Clear cheque_dd_no if payment method is not Cheque or DD
				setFormData((prev) => ({
					...prev,
					[name]: value,
					cheque_dd_no: ["Cheque", "DD"].includes(value)
						? prev.cheque_dd_no
						: "",
				}));
			} else {
				setFormData((prev) => ({ ...prev, [name]: value }));
			}
		} else if (type === "checkbox") {
			if (name === "hasCoApplicant") {
				setFormData((prev) => ({ ...prev, [name]: input.checked }));
				if (!input.checked) {
					// Reset co-applicant details when unchecked
					setCoApplicantDetail({
						id: "2",
						type: "co-applicant",
						fullName: "",
						address: "",
						relationship: "",
						dateOfBirth: "",
						occupation: "",
						company: "",
						designation: "",
						workAddress: "",
						city: "",
						state: "",
						pinCode: "",
						contactNumber: "",
						email: "",
						panCardNo: "",
						aadhaarNo: "",
					});
					setFormData((prev) => ({ ...prev, coApplicantImage: "" }));
				}
			} else {
				setFormData((prev) => ({ ...prev, [name]: input.checked }));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		setFormData((prev) => {
			const currentSources = prev.referencsources || [];
			return {
				...prev,
				referencsources: checked
					? [...currentSources, value]
					: currentSources.filter((v) => v !== value),
			};
		});
	};

	const handleCoApplicantChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCoApplicantDetail((prev) => ({ ...prev, [name]: value }));
	};

	const handleClientDetailChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		const updatedClient = {
			...clientDetail,
			[name]: value,
		};
		setClientDetail(updatedClient);

		const fullName = updatedClient.fullName || "";
		const panCardNo = updatedClient.panCardNo || "";

		if (fullName && panCardNo) {
			const customerId = generateCustomerID(fullName, panCardNo);
			setFormData((prev) => ({
				...prev,
				customerId,
			}));
		}
	};
	const sanitizedFormData = {
		...formData,
		applicantImage: formData.applicantImage || undefined,
		coApplicantImage: formData.coApplicantImage || undefined,
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors(null);
		setSuccess(false);

		try {
			const res = await fetch("/api/forms", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...sanitizedFormData,
					clients: formData.hasCoApplicant
						? [clientDetail, coApplicantDetail]
						: [clientDetail],
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				if (data.errors) {
					const fieldErrors: FieldErrors = {};
					(data.errors as FormError[]).forEach((err) => {
						if (err.path && err.path.length > 0) {
							fieldErrors[err.path[0]] = err.message;
						}
					});
					setErrors(fieldErrors);
				} else {
					setErrors({ general: data.message || "An error occurred" });
				}
				setSubmitting(false);
				return;
			}

			setSuccess(true);
			setSubmitting(false);
			router.push("/admin/booking-forms");
		} catch (err) {
			if (err instanceof Error) {
				setErrors({ general: err.message });
			} else {
				setErrors({ general: "An unknown error occurred" });
			}
		}
	};

	//generate the reference number
	function generateReferenceNumber() {
		const date = new Date();
		const year = date.getFullYear().toString().slice(-2);
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const random = Math.floor(Math.random() * 10000)
			.toString()
			.padStart(4, "0");
		return `MDC-${year}${month}${random}`;
	}

	//gnerate the customer id
	const generateCustomerID = (fullName: string, panCardNo: string): string => {
		if (!fullName || !panCardNo) return "";

		// Get first letter of each name part
		const nameParts = fullName.split(" ");
		const initials = nameParts
			.map((part) => part.charAt(0).toUpperCase())
			.join("");

		// Combine initials with PAN number
		return `${initials}${panCardNo}`;
	};

	//handle image upload
	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		field: "applicantImage" | "coApplicantImage"
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const cloudData = new FormData();
		cloudData.append("file", file);
		cloudData.append(
			"upload_preset",
			process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
		);
		cloudData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

		try {
			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
				{
					method: "POST",
					body: cloudData,
				}
			);

			const data = await res.json();

			if (data.secure_url) {
				setFormData((prev) => ({
					...prev,
					[field]: data.secure_url,
				}));
			} else {
				console.error("Cloudinary upload failed", data);
			}
		} catch (err) {
			console.error("Upload error:", err);
		}
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-black p-8 shadow-md rounded-lg print:shadow-none print:p-0">
			<h1 className="text-3xl font-bold text-center mb-6 text-gray-900 print:text-black">
				BUNGALOW BOOKING FORM
			</h1>

			{success && (
				<div className="mb-4 text-green-600 print:hidden">
					Form submitted successfully!
				</div>
			)}
			{errors?.general && (
				<div className="mb-4 text-red-600 print:hidden">{errors.general}</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="space-y-6 print:space-y-2 print:text-sm"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="customerId"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Customer ID:
						</label>
						<input
							type="text"
							name="customerId"
							id="customerId"
							value={`MDCBPL-${formData.customerId || ""}`}
							readOnly
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-gray-50"
						/>
					</div>
					<div>
						<label
							htmlFor="referenceNo"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Reference No:
						</label>
						<input
							type="text"
							name="referenceNo"
							id="referenceNo"
							value={formData.referenceNo || ""}
							readOnly
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-gray-50"
						/>
					</div>
					<div>
						<label
							htmlFor="date"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Date: <span className="text-red-500">*</span>
						</label>
						<input
							type="date"
							name="date"
							id="date"
							value={formData.date || ""}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
						/>
					</div>
					<div>
						<label
							htmlFor="projectName"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Project Name: <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="projectName"
							id="projectName"
							onChange={handleChange}
							value={formData.projectName || ""}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-gray-50"
						/>
					</div>
					<div>
						<label
							htmlFor="plotNo"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Plot/Flat No: <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="plotNo"
								id="plotNo"
								value={formData.plotNo || ""}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										plotNo: e.target.value,
									}));
								}}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
							/>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="plotNoOption"
									value="NA"
									onChange={() =>
										setFormData((prev) => ({ ...prev, plotNo: "N/A" }))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">N/A</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="plotNoOption"
									value="Subject to Confirmation"
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											plotNo: "Subject to Confirmation",
										}))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">
									Subject to Confirmation
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Client Details */}

				<ClientDetails
					clientDetail={clientDetail}
					onChange={handleClientDetailChange}
					onImageChange={(e) => handleImageUpload(e, "applicantImage")}
					applicantImage={formData.applicantImage}
				/>

				{/* Co-Applicant Details Toggle */}
				<div className="mt-6 mb-4">
					<div className="flex items-center">
						<input
							type="checkbox"
							id="hasCoApplicant"
							name="hasCoApplicant"
							checked={formData.hasCoApplicant}
							onChange={handleChange}
							className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
						/>
						<label
							htmlFor="hasCoApplicant"
							className="ml-2 block text-sm font-medium text-gray-700"
						>
							Add Co-Applicant Details (Optional)
						</label>
					</div>
				</div>

				{/* Co-Applicant Details - Only show if hasCoApplicant is true */}
				{formData.hasCoApplicant && (
					<CoApplicantDetails
						coApplicantDetail={coApplicantDetail}
						onChange={handleCoApplicantChange}
						onImageChange={(e) => handleImageUpload(e, "coApplicantImage")}
						coApplicantImage={formData.coApplicantImage}
					/>
				)}

				{/*Property Details*/}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Property Details
						</h3>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
						<div>
							<label
								htmlFor="bookingAmount"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Booking Amount (Rs) <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="bookingAmount"
								id="bookingAmount"
								value={formData.bookingAmount || ""}
								onChange={handleChange}
								className="w-full border-b-2 border-yellow-500 p-2 rounded-sm bg-gray-100 outline-none text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="propertyCost"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Total Cost of Bungalow (Rs)
								<span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="propertyCost"
									id="propertyCost"
									value={formData.propertyCost || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-yellow-500 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyCostOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, propertyCost: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyCostOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												propertyCost: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
						<div>
							<label
								htmlFor="propertyType"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Bungalow Type <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="propertyType"
									id="propertyType"
									value={formData.propertyType || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-yellow-500 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyTypeOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, propertyType: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyTypeOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												propertyType: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="propertyArea"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Bungalow Area <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="propertyArea"
									id="propertyArea"
									value={formData.propertyArea || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-yellow-500 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyAreaOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, propertyArea: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyAreaOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												propertyArea: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
						<div>
							<label
								htmlFor="propertylocation"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Property Location <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="propertylocation"
									id="propertylocation"
									value={formData.propertylocation || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-yellow-500 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyLocationOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												propertylocation: "N/A",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="propertyLocationOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												propertylocation: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="estimatedConstructionPeriod"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Estimated Construction Period (Days){" "}
								<span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="estimatedConstructionPeriod"
									id="estimatedConstructionPeriod"
									value={formData.estimatedConstructionPeriod || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-yellow-500 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="constructionPeriodOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												estimatedConstructionPeriod: "N/A",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="constructionPeriodOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												estimatedConstructionPeriod: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Plot Details */}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">Plot Details</h3>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
						<div>
							<label
								htmlFor="plotArea"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Plot Area (sq.ft.) <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="plotArea"
									id="plotArea"
									value={formData.plotArea || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-green-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="plotAreaOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, plotArea: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="plotAreaOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												plotArea: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="plotNumber"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Plot Number <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="plotNumber"
									id="plotNumber"
									value={formData.plotNumber || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-green-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="plotNumberOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, plotNumber: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="plotNumberOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												plotNumber: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
							{errors?.plotNumber && (
								<p className="mt-1 text-sm text-red-600 print:text-black">
									{errors.plotNumber}
								</p>
							)}
						</div>
					</div>
					<div className="mt-4">
						<label
							htmlFor="blockName"
							className="block text-sm font-medium text-gray-700 print:text-black mb-2"
						>
							Block Name/Number <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="blockName"
								id="blockName"
								value={formData.blockName || ""}
								onChange={handleChange}
								className="w-full border-b-2 border-green-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
							/>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="blockNameOption"
									value="NA"
									onChange={() =>
										setFormData((prev) => ({ ...prev, blockName: "N/A" }))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">N/A</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="blockNameOption"
									value="Subject to Confirmation"
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											blockName: "Subject to Confirmation",
										}))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">
									Subject to Confirmation
								</label>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
							Plot Facing <span className="text-red-500">*</span>
						</label>
						<div className="flex flex-wrap gap-4 text-sm text-gray-700 print:text-black">
							{[
								"North",
								"South",
								"East",
								"West",
								"North-East",
								"North-West",
								"South-East",
								"South-West",
							].map((dir) => (
								<label key={dir} className="flex items-center gap-1">
									<input
										type="radio"
										name="plotFacing"
										value={dir}
										checked={formData.plotFacing === dir}
										onChange={(e) =>
											setFormData({ ...formData, plotFacing: e.target.value })
										}
									/>
									{dir}
								</label>
							))}
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="plotFacing"
									value="NA"
									checked={formData.plotFacing === "N/A"}
									onChange={() =>
										setFormData((prev) => ({ ...prev, plotFacing: "N/A" }))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">N/A</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="plotFacing"
									value="Subject to Confirmation"
									checked={formData.plotFacing === "Subject to Confirmation"}
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											plotFacing: "Subject to Confirmation",
										}))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">
									Subject to Confirmation
								</label>
							</div>
						</div>
					</div>
				</div>

				{/*Land Identificaton Details*/}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Land Identification Details
						</h3>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
						<div>
							<label
								htmlFor="jl_no"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								JL No <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="jl_no"
									id="jl_no"
									value={formData.jl_no || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="jlNoOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, jl_no: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="jlNoOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												jl_no: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="mouza"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Mouza <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="mouza"
									id="mouza"
									value={formData.mouza || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="mouzaOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, mouza: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="mouzaOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												mouza: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
							{errors?.mouza && (
								<p className="mt-1 text-sm text-red-600 print:text-black">
									{errors.mouza}
								</p>
							)}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
						<div>
							<label
								htmlFor="dag_no"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Dag No <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="dag_no"
									id="dag_no"
									value={formData.dag_no || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="dagNoOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, dag_no: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="dagNoOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												dag_no: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
						<div>
							<label
								htmlFor="khatian_no"
								className="block text-sm font-medium text-gray-700 print:text-black mb-2"
							>
								Khatian No <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="khatian_no"
									id="khatian_no"
									value={formData.khatian_no || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="khatianNoOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, khatian_no: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="khatianNoOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												khatian_no: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<label
							htmlFor="panchayat_municipality"
							className="block text-sm font-medium text-gray-700 print:text-black mb-2"
						>
							Panchayat/Municipality <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="panchayat_municipality"
								id="panchayat_municipality"
								value={formData.panchayat_municipality || ""}
								onChange={handleChange}
								className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
							/>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="panchayatMunicipalityOption"
									value="NA"
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											panchayat_municipality: "N/A",
										}))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">N/A</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="panchayatMunicipalityOption"
									value="Subject to Confirmation"
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											panchayat_municipality: "Subject to Confirmation",
										}))
									}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label className="text-sm text-gray-700">
									Subject to Confirmation
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Construction Category & Payment Schedule */}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Constraction Category & Payment Schedule
						</h3>
					</div>

					<div>
						<p className="text-sm font-medium text-red-500 mb-2 mt-4">
							* BUNGALOW CONSTRUCTION WITH LAND
						</p>
						<fieldset>
							<legend className="block text-sm font-medium text-gray-700 print:text-black">
								Select Structure Type
							</legend>
							<div className="mt-2 space-y-2">
								<div className="flex items-center">
									<input
										id="ground-floor"
										name="selectedStructureType"
										type="radio"
										value="G+1 (ECONOMIC)"
										checked={
											formData.selectedStructureType === "G+1 (ECONOMIC)"
										}
										onChange={handleChange}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
									/>
									<label
										htmlFor="ground-floor"
										className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
									>
										G+1 (ECONOMIC)
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="g1-structure-new"
										name="selectedStructureType"
										type="radio"
										value="G+1 (ECONOMIC) New"
										checked={
											formData.selectedStructureType === "G+1 (ECONOMIC) New"
										}
										onChange={handleChange}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
									/>
									<label
										htmlFor="ground-floor"
										className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
									>
										G+1 (ECONOMIC) New
									</label>
								</div>
								{/* <div className="flex items-center">
									<input
										id="g1-structure"
										name="selectedStructureType"
										type="radio"
										value="G+1 (PREMIUM)"
										checked={formData.selectedStructureType === "G+1 (PREMIUM)"}
										onChange={handleChange}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
									/>
									<label
										htmlFor="g1-structure"
										className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
									>
										G+1 (PREMIUM)
									</label>
								</div> */}
								<div className="flex items-center">
									<input
										id="g1-structure"
										name="selectedStructureType"
										type="radio"
										value="G+1 (PREMIUM) New"
										checked={formData.selectedStructureType === "G+1 (PREMIUM) New"}
										onChange={handleChange}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
									/>
									<label
										htmlFor="g1-structure"
										className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
									>
										G+1 (PREMIUM) New
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="g2-structure"
										name="selectedStructureType"
										type="radio"
										value="G+2 (PREMIUM)"
										checked={formData.selectedStructureType === "G+2 (PREMIUM)"}
										onChange={handleChange}
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
									/>
									<label
										htmlFor="g2-structure"
										className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
									>
										G+2 (PREMIUM)
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				{/* Static Payment Schedule Table */}
				<div>
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
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black print:border-black">
												G+1 (ECONOMIC)
											</th>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black print:border-black">
												G+1 (ECONOMIC) New
											</th>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black print:border-black">
												G+1 (PREMIUM)
											</th>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black print:border-black">
												G+1 (PREMIUM) New
											</th>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:text-black print:border-black">
												G+2 (PREMIUM)
											</th>
										)}
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 print:divide-black">
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Booking & Caution Money
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												₹50,000/-
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												₹1,00,000/-
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												₹1,00,000/-
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												₹2,00,000/-
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												₹2,00,000/-
											</td>
										)}
									</tr>
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Planning/Designing/Legal Compliances
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}

										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
									</tr>
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Sale Execution
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												40%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												40%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												40%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												40%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												40%
											</td>
										)}
									</tr>
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of Foundation
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												15%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												15%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												15%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												15%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												15%
											</td>
										)}
									</tr>
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of 1st Roof Casting
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
									</tr>
									{/* {formData.selectedStructureType !== "Ground Floor Only" && ( */}
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of 2nd Roof Casting
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
									</tr>
									{/* )} */}
									{/* {formData.selectedStructureType === "G+2 (PREMIUM)" && ( */}
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of 3rd Roof Casting
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												-
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												-
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												-
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												-
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
									</tr>
									{/* )} */}
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of Brick Work & Plastering
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
									</tr>
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of Colour & Flooring
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												5%
											</td>
										)}
									</tr>
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 border-r print:text-black print:border-black">
											TOTAL
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 print:text-black">
												100%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (ECONOMIC) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 print:text-black">
												100%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 print:text-black">
												100%
											</td>
										)}
										{formData.selectedStructureType === "G+1 (PREMIUM) New" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 print:text-black">
												100%
											</td>
										)}
										{formData.selectedStructureType === "G+2 (PREMIUM)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900 print:text-black">
												100%
											</td>
										)}
									</tr>
								</tbody>
							</table>
						</div>
						<p className="mt-2 text-sm text-gray-600 print:text-black">
							Note: The Booking & Caution Money will be adjusted in the final
							payment at the Colour & Flooring stage.
						</p>
					</div>

					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400 mt-4">
						<h3 className="font-bold text-sm text-gray-900">
							Selected Payment Terms
						</h3>
					</div>
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
							Selected Structure Type:
						</p>
						<div className="mt-2 space-y-2">
							<div className="flex items-center">
								<input
									id="selected-ground-floor-print"
									type="checkbox"
									checked={formData.selectedStructureType === "G+1 (ECONOMIC)"}
									readOnly
									className="h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="selected-ground-floor-print"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									G+1 (ECONOMIC)
								</label>
							</div>
							{/* <div className="flex items-center">
								<input
									id="selected-g1-structure-print"
									type="checkbox"
									checked={formData.selectedStructureType === "G+1 (PREMIUM)"}
									readOnly
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="selected-g1-structure-print"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									G+1 (PREMIUM)
								</label>
							</div> */}
							<div className="flex items-center">
								<input
									id="selected-ground-floor-print"
									type="checkbox"
									checked={formData.selectedStructureType === "G+1 (ECONOMIC) New"}
									readOnly
									className="h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="selected-ground-floor-print"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									G+1 (ECONOMIC) New
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="selected-g1-structure-new-print"
									type="checkbox"
									checked={formData.selectedStructureType === "G+1 (PREMIUM) New"}
									readOnly
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="selected-g1-structure-new-print"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									G+1 (PREMIUM) New
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="selected-g2-structure-print"
									type="checkbox"
									checked={formData.selectedStructureType === "G+2 (PREMIUM)"}
									readOnly
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="selected-g2-structure-print"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									G+2 (PREMIUM)
								</label>
							</div>
						</div>
						<p className="mt-4 text-sm text-gray-700 print:text-black">
							Payment Schedule: As per the table above for the selected category
							and structure type.
						</p>
					</div>
				</div>

				{/* DOCUMENTS TO BE SUBMITTED */}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Documents to be submitted
						</h3>
					</div>
					<div className="space-y-2">
						<div className="flex items-center">
							<input
								id="docPanCard"
								name="docPanCard"
								type="checkbox"
								checked={formData.docPanCard}
								onChange={handleChange}
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
								id="docAadharCard"
								name="docAadharCard"
								type="checkbox"
								checked={formData.docAadharCard}
								onChange={handleChange}
								className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
							/>
							<label
								htmlFor="docAadharCard"
								className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
							>
								Copy of Aadhar Card
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="docPropertyDocuments"
								name="docPropertyDocuments"
								type="checkbox"
								checked={formData.docPropertyDocuments}
								onChange={handleChange}
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
								id="docPassportPhotos"
								name="docPassportPhotos"
								type="checkbox"
								checked={formData.docPassportPhotos}
								onChange={handleChange}
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
				</div>
				{/* PAYMENT DETAILS */}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">Payment Details</h3>
					</div>
					<div className="space-y-4 print:space-y-2">
						<div>
							<label
								htmlFor="bookingAmount"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Booking Amount: ₹ <span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								name="bookingAmount"
								id="bookingAmount"
								value={formData.bookingAmount || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								readOnly
							/>
							{errors?.bookingAmount && (
								<p className="mt-1 text-sm text-red-600 print:text-black">
									{errors.bookingAmount}
								</p>
							)}
						</div>
						<div>
							{/* <p className="text-sm font-medium text-gray-700 mb-2 print:text-black">
								Payment Method:
							</p> */}
							<div className="mt-2 space-y-2">
								<label className="block text-sm font-medium text-gray-700 print:text-black">
									Payment Mode: <span className="text-red-500">*</span>
								</label>
								{["Cheque", "DD", "NEFT_RTGS", "Cash", "UPI"].map((mode) => (
									<div key={mode} className="inline-flex items-center mr-4">
										<input
											type="radio"
											id={`paymentMethod-${mode}`}
											name="paymentMethod"
											value={mode}
											checked={formData.paymentMethod === mode}
											onChange={handleChange}
											className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 print:text-black print:border-black"
										/>
										<label
											htmlFor={`paymentMethod-${mode}`}
											className="ml-1 text-sm font-medium text-gray-700 print:text-black"
										>
											{mode}
										</label>
									</div>
								))}
							</div>
						</div>
						<div className="space-y-2">
							<p className="text-sm font-medium text-gray-700 print:text-black">
								Bank Details:
							</p>
							<div>
								<label
									htmlFor="accountHolderName"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Account Holder Name:
								</label>
								<input
									type="text"
									name="accountHolderName"
									id="accountHolderName"
									value={formData.accountHolderName || ""}
									onChange={handleChange}
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
								<div className="flex items-center space-x-4">
									<input
										type="text"
										name="accountNumber"
										id="accountNumber"
										value={formData.accountNumber || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="accountNumberOption"
											value="NA"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													accountNumber: "N/A",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">N/A</label>
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="accountNumberOption"
											value="Subject to Confirmation"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													accountNumber: "Subject to Confirmation",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">
											Subject to Confirmation
										</label>
									</div>
								</div>
							</div>
							<div>
								<label
									htmlFor="bankName"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Bank Name:
								</label>
								<div className="flex items-center space-x-4">
									<input
										type="text"
										name="bankName"
										id="bankName"
										value={formData.bankName || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="bankNameOption"
											value="NA"
											onChange={() =>
												setFormData((prev) => ({ ...prev, bankName: "N/A" }))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">N/A</label>
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="bankNameOption"
											value="Subject to Confirmation"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													bankName: "Subject to Confirmation",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">
											Subject to Confirmation
										</label>
									</div>
								</div>
							</div>
							<div>
								<label
									htmlFor="branchName"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Branch Name:
								</label>
								<div className="flex items-center space-x-4">
									<input
										type="text"
										name="branchName"
										id="branchName"
										value={formData.branchName || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="branchNameOption"
											value="NA"
											onChange={() =>
												setFormData((prev) => ({ ...prev, branchName: "N/A" }))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">N/A</label>
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="branchNameOption"
											value="Subject to Confirmation"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													branchName: "Subject to Confirmation",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">
											Subject to Confirmation
										</label>
									</div>
								</div>
							</div>
							<div>
								<label
									htmlFor="ifscCode"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									IFSC Code:
								</label>
								<div className="flex items-center space-x-4">
									<input
										type="text"
										name="ifscCode"
										id="ifscCode"
										value={formData.ifscCode || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="ifscCodeOption"
											value="NA"
											onChange={() =>
												setFormData((prev) => ({ ...prev, ifscCode: "N/A" }))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">N/A</label>
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="ifscCodeOption"
											value="Subject to Confirmation"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													ifscCode: "Subject to Confirmation",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">
											Subject to Confirmation
										</label>
									</div>
								</div>
							</div>
							{["Cheque", "DD"].includes(formData.paymentMethod) && (
								<div>
									<label
										htmlFor="cheque_dd_no"
										className="block text-sm font-medium text-gray-700 print:text-black"
									>
										Cheque/DD No:
									</label>
									<input
										type="text"
										name="cheque_dd_no"
										id="cheque_dd_no"
										value={formData.cheque_dd_no || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
								</div>
							)}

							<div>
								<label
									htmlFor="transactionReferenceNo"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Transaction Reference No.:
								</label>
								<div className="flex items-center space-x-4">
									<input
										type="text"
										name="transactionReferenceNo"
										id="transactionReferenceNo"
										value={formData.transactionReferenceNo || ""}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
									/>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="transactionReferenceNoOption"
											value="NA"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													transactionReferenceNo: "N/A",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">N/A</label>
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											name="transactionReferenceNoOption"
											value="Subject to Confirmation"
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													transactionReferenceNo: "Subject to Confirmation",
												}))
											}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label className="text-sm text-gray-700">
											Subject to Confirmation
										</label>
									</div>
								</div>
							</div>
							<div>
								<label
									htmlFor="paymentDate"
									className="block text-sm font-medium text-gray-700 print:text-black"
								>
									Date:
								</label>
								<input
									type="date"
									name="paymentDate"
									id="paymentDate"
									value={formData.paymentDate || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* Reference &source information*/}
				<div>
					<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
						<h3 className="font-bold text-sm text-gray-900">
							Reference & source information
						</h3>
					</div>

					{/* Section 1: How did you come to know */}
					<div className="space-y-2 mb-6">
						<p className="text-sm font-medium text-gray-700 print:text-black">
							• How did you come to know about our project? (Please select)
						</p>
						{[
							{
								label: "Newspaper Advertisement",
								value: "Newspaper Advertisement",
							},
							{ label: "Hoarding/Billboard", value: "Hoarding/Billboard" },
							{
								label: "Digital Marketing/Social Media",
								value: "Digital Marketing/Social Media",
							},
							{
								label: "Property Exhibition/Event",
								value: "Property Exhibition/Event",
							},
							{ label: "Direct Walk-in", value: "Direct Walk-in" },
						].map((option) => (
							<div key={option.value} className="flex items-center">
								<input
									type="checkbox"
									id={option.value}
									name="source"
									value={option.value}
									checked={
										formData.referencsources?.includes(option.value) ?? false
									}
									onChange={handleCheckboxChange}
									className="h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label
									htmlFor={option.value}
									className="ml-2 text-sm text-gray-700 print:text-black"
								>
									{option.label}
								</label>
							</div>
						))}

						{/* Dynamic input fields */}
						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="Property Website/Portal"
								name="source"
								value="Property Website/Portal"
								checked={formData.referencsources?.includes(
									"Property Website/Portal"
								)}
								onChange={handleCheckboxChange}
								className="h-4 w-4 text-indigo-600 border-gray-300"
							/>
							<label
								htmlFor="Property Website/Portal"
								className="text-sm text-gray-700 print:text-black"
							>
								Property Website/Portal (Please specify):
							</label>
							{formData.referencsources?.includes(
								"Property Website/Portal"
							) && (
								<input
									type="text"
									name="propertyWebsiteDetails"
									value={formData.propertyWebsiteDetails || ""}
									onChange={handleChange}
									className="border border-gray-300 rounded-md p-1"
								/>
							)}
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="Channel Partner/Broker"
								name="source"
								value="Channel Partner/Broker"
								checked={formData.referencsources?.includes(
									"Channel Partner/Broker"
								)}
								onChange={handleCheckboxChange}
								className="h-4 w-4 text-indigo-600 border-gray-300"
							/>
							<label
								htmlFor="Channel Partner/Broker"
								className="text-sm text-gray-700 print:text-black"
							>
								Channel Partner/Broker (Name):
							</label>
							{formData.referencsources?.includes("Channel Partner/Broker") && (
								<input
									type="text"
									name="brokerName"
									value={formData.brokerName || ""}
									onChange={handleChange}
									className="border border-gray-300 rounded-md p-1"
								/>
							)}
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="Friend/Relative"
								name="source"
								value="Friend/Relative"
								checked={formData.referencsources?.includes("Friend/Relative")}
								onChange={handleCheckboxChange}
								className="h-4 w-4 text-indigo-600 border-gray-300"
							/>
							<label
								htmlFor="Friend/Relative"
								className="text-sm text-gray-700 print:text-black"
							>
								Friend/Relative (Please provide details below)
							</label>
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="Existing Customer"
								name="source"
								value="Existing Customer"
								checked={formData.referencsources?.includes(
									"Existing Customer"
								)}
								onChange={handleCheckboxChange}
								className="h-4 w-4 text-indigo-600 border-gray-300"
							/>
							<label
								htmlFor="Existing Customer"
								className="text-sm text-gray-700 print:text-black"
							>
								Existing Customer (Please provide details below)
							</label>
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="Other"
								name="source"
								value="Other"
								checked={formData.referencsources?.includes("Other")}
								onChange={handleCheckboxChange}
								className="h-4 w-4 text-indigo-600 border-gray-300"
							/>
							<label
								htmlFor="Other"
								className="text-sm text-gray-700 print:text-black"
							>
								Other (Please specify):
							</label>
							{formData.referencsources?.includes("Other") && (
								<input
									type="text"
									name="otherSource"
									value={formData.otherSource || ""}
									onChange={handleChange}
									className="border border-gray-300 rounded-md p-1"
								/>
							)}
						</div>
					</div>

					{/* Section 2: If referred by someone */}
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-700 print:text-black">
							• If referred by someone:
						</p>

						<div>
							<label
								htmlFor="referredBy"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Referred By (Name): <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="referredBy"
									id="referredBy"
									value={formData.referredBy || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md p-2 print:border-none print:shadow-none print:ring-0"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="referredByOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({ ...prev, referredBy: "N/A" }))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="referredByOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												referredBy: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor="refererContactNumber"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Referer Contact Number: <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="refererContactNumber"
									id="refererContactNumber"
									value={formData.refererContactNumber || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md p-2 print:border-none print:shadow-none print:ring-0"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="refererContactNumberOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												refererContactNumber: "N/A",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="refererContactNumberOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												refererContactNumber: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor="refererRelationship"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Relationship with Applicant: <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="refererRelationship"
									id="refererRelationship"
									value={formData.refererRelationship || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md p-2 print:border-none print:shadow-none print:ring-0"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="refererRelationshipOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												refererRelationship: "N/A",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="refererRelationshipOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												refererRelationship: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor="referenceCustomerId"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Reference/Customer ID (if existing customer): <span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="referenceCustomerId"
									id="referenceCustomerId"
									value={formData.referenceCustomerId || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md p-2 print:border-none print:shadow-none print:ring-0"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="referenceCustomerIdOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												referenceCustomerId: "N/A",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="referenceCustomerIdOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												referenceCustomerId: "Subject to Confirmation",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">
										Subject to Confirmation
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-end mt-6">
					<button
						type="submit"
						disabled={submitting}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
					>
						{submitting ? "Submitting..." : "Submit Form"}
					</button>
				</div>
			</form>
		</div>
	);
}
