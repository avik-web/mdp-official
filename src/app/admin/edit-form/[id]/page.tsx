"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { BookingFormValues } from "@/lib/validation/bookingFormSchema";
import { ClientDetail } from "@/types/clientDetails.type";
import ClientDetails from "../../forms/new/components/clientDetails";
import CoApplicantDetails from "../../forms/new/components/coApplicant";
import { toast } from "react-hot-toast";

interface FormError {
	path?: string[];
	message: string;
}

interface FieldErrors {
	[key: string]: string;
}

interface ApiClientDetail {
	id?: number | string;
	fullName: string;
	type: "applicant" | "co-applicant";
	address: string;
	relationship: string;
	dateOfBirth: string;
	occupation: string;
	company: string;
	designation: string;
	workAddress: string;
	city: string;
	state: string;
	pinCode: string;
	contactNumber: string;
	email: string;
	panCardNo: string;
	aadhaarNo: string;
}

interface BookingFormApiResponse {
	id: string;
	customerId: string;
	plotNo: string;
	plotNumber: string;
	projectName: string;
	blockName: string;
	plotArea: string;
	plotFacing: string;
	propertyCost: string;
	propertyType: string;
	propertylocation: string;
	propertyArea: string;
	bookingAmount: string;
	jl_no: string;
	mouza: string;
	dag_no: string;
	khatian_no: string;
	panchayat_municipality: string;
	branchName: string;
	paymentDate: string;
	cheque_dd_no: string;
	transactionReferenceNo: string;
	estimatedConstructionPeriod: string;
	applicantImage: string;
	coApplicantImage: string;
	docPanCard: boolean;
	docAadharCard: boolean;
	docPropertyDocuments: boolean;
	docPassportPhotos: boolean;
	selectedStructureType: string;
	referenceNo: string;
	date: string;
	referencsources: string[];
	propertyWebsiteDetails: string;
	brokerName: string;
	otherSource: string;
	referredBy: string;
	refererRelationship: string;
	refererContactNumber: string;
	referenceCustomerId: string;
	hasCoApplicant: boolean;
	paymentMethod: string;
	bankName: string;
	accountNumber: string;
	ifscCode: string;
	accountHolderName: string;
	clients?: ApiClientDetail[];
}

export default function EditBookingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const router = useRouter();
	const { id } = use(params);
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
		estimatedConstructionPeriod: "",
		applicantImage: "",
		coApplicantImage: "",
		docPanCard: false,
		docAadharCard: false,
		docPropertyDocuments: false,
		docPassportPhotos: false,
		selectedStructureType: "",
		referenceNo: "",
		date: "",
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
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);

	// Load existing form data
	useEffect(() => {
		async function loadFormData() {
			try {
				const res = await fetch(`/api/admin/booking-forms/${id}`);
				if (!res.ok) {
					throw new Error("Failed to fetch form data");
				}
				const data: BookingFormApiResponse = await res.json();

				// Set form data
				setFormData({
					customerId: data.customerId || "",
					plotNo: data.plotNo || "",
					plotNumber: data.plotNumber || "",
					projectName: data.projectName || "",
					blockName: data.blockName || "",
					plotArea: data.plotArea || "",
					plotFacing: data.plotFacing || "",
					propertyCost: data.propertyCost || "",
					propertyType: data.propertyType || "",
					propertylocation: data.propertylocation || "",
					propertyArea: data.propertyArea || "",
					bookingAmount: data.bookingAmount || "",
					jl_no: data.jl_no || "",
					mouza: data.mouza || "",
					dag_no: data.dag_no || "",
					khatian_no: data.khatian_no || "",
					panchayat_municipality: data.panchayat_municipality || "",
					branchName: data.branchName || "",
					// Payment Details
					paymentMethod: data.paymentMethod || "",
					paymentDate: data.paymentDate
						? new Date(data.paymentDate).toISOString().split("T")[0]
						: "",
					cheque_dd_no: data.cheque_dd_no || "",
					transactionReferenceNo: data.transactionReferenceNo || "",
					bankName: data.bankName || "",
					accountNumber: data.accountNumber || "",
					ifscCode: data.ifscCode || "",
					accountHolderName: data.accountHolderName || "",
					estimatedConstructionPeriod: data.estimatedConstructionPeriod || "",
					applicantImage: data.applicantImage || "",
					coApplicantImage: data.coApplicantImage || "",
					docPanCard: data.docPanCard || false,
					docAadharCard: data.docAadharCard || false,
					docPropertyDocuments: data.docPropertyDocuments || false,
					docPassportPhotos: data.docPassportPhotos || false,
					selectedStructureType: data.selectedStructureType || "",
					referenceNo: data.referenceNo || "",
					date: data.date || "",
					referencsources: data.referencsources || [],
					propertyWebsiteDetails: data.propertyWebsiteDetails || "",
					brokerName: data.brokerName || "",
					otherSource: data.otherSource || "",
					referredBy: data.referredBy || "",
					refererRelationship: data.refererRelationship || "",
					refererContactNumber: data.refererContactNumber || "",
					referenceCustomerId: data.referenceCustomerId || "",
					hasCoApplicant: data.clients?.length > 1 || false,
				});

				// Set client details
				if (data.clients && data.clients.length > 0) {
					const applicant = data.clients.find(
						(client: ApiClientDetail) => client.type === "applicant"
					);
					if (applicant) {
						setClientDetail({
							id: applicant.id?.toString() || "1",
							fullName: applicant.fullName || "",
							type: "applicant",
							address: applicant.address || "",
							relationship: applicant.relationship || "",
							dateOfBirth: applicant.dateOfBirth || "",
							occupation: applicant.occupation || "",
							company: applicant.company || "",
							designation: applicant.designation || "",
							workAddress: applicant.workAddress || "",
							city: applicant.city || "",
							state: applicant.state || "",
							pinCode: applicant.pinCode || "",
							contactNumber: applicant.contactNumber || "",
							email: applicant.email || "",
							panCardNo: applicant.panCardNo || "",
							aadhaarNo: applicant.aadhaarNo || "",
						});
					}

					const coApplicant = data.clients.find(
						(client: ApiClientDetail) => client.type === "co-applicant"
					);
					if (coApplicant) {
						setCoApplicantDetail({
							id: coApplicant.id?.toString() || "",
							fullName: coApplicant.fullName || "",
							type: "co-applicant",
							address: coApplicant.address || "",
							relationship: coApplicant.relationship || "",
							dateOfBirth: coApplicant.dateOfBirth || "",
							occupation: coApplicant.occupation || "",
							company: coApplicant.company || "",
							designation: coApplicant.designation || "",
							workAddress: coApplicant.workAddress || "",
							city: coApplicant.city || "",
							state: coApplicant.state || "",
							pinCode: coApplicant.pinCode || "",
							contactNumber: coApplicant.contactNumber || "",
							email: coApplicant.email || "",
							panCardNo: coApplicant.panCardNo || "",
							aadhaarNo: coApplicant.aadhaarNo || "",
						});
					}
				}
			} catch (err) {
				console.error("Error loading form data:", err);
				toast.error("Failed to load form data");
			} finally {
				setLoading(false);
			}
		}

		loadFormData();
	}, [id]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		if (name === "source") {
			setFormData((prev) => {
				const currentSources = prev.referencsources || [];
				let newSources;

				if (checked) {
					newSources = [...currentSources, value];
				} else {
					newSources = currentSources.filter((source) => source !== value);
				}

				return {
					...prev,
					referencsources: newSources,
				};
			});
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: checked,
			}));
		}
	};

	const handleClientDetailChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setClientDetail((prev) => ({
			...prev,
			[name as keyof ClientDetail]: value,
		}));
	};

	const handleCoApplicantDetailChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCoApplicantDetail((prev) => ({
			...prev,
			[name as keyof ClientDetail]: value,
		}));
	};

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "applicantImage" | "coApplicantImage"
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const formData = new FormData();
			formData.append("file", file);

			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				throw new Error("Failed to upload image");
			}

			const data = await res.json();
			setFormData((prev) => ({
				...prev,
				[type]: data.url,
			}));
		} catch (err) {
			console.error("Error uploading image:", err);
			toast.error("Failed to upload image");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setErrors(null);
		setSuccess(false);

		try {
			const sanitizedFormData = {
				...formData,
				customerId: formData.customerId.replace("MDCBPL-", ""),
			};

			const res = await fetch(`/api/admin/booking-forms/${id}`, {
				method: "PUT",
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
			toast.success("Booking updated successfully!");
			router.push("/admin/booking-forms");
		} catch (err) {
			if (err instanceof Error) {
				setErrors({ general: err.message });
			} else {
				setErrors({ general: "An unknown error occurred" });
			}
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
				<div className="max-w-4xl mx-auto">
					<div className="animate-pulse space-y-8">
						<div className="h-8 bg-gray-200 rounded w-1/4"></div>
						<div className="h-12 bg-gray-200 rounded"></div>
						<div className="space-y-4">
							{[...Array(10)].map((_, i) => (
								<div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto bg-white text-black p-8 shadow-md rounded-lg print:shadow-none print:p-0">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-center text-gray-900 print:text-black">
					Edit Booking Form
				</h1>
				<button
					onClick={() => router.push("/admin/booking-forms")}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
				>
					Back to Forms
				</button>
			</div>

			{success && (
				<div className="mb-4 text-green-600 print:hidden">
					Form updated successfully!
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
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
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
						/>
						{errors?.date && (
							<p className="mt-1 text-sm text-red-600 print:text-black">
								{errors.date}
							</p>
						)}
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
				<div className="flex items-center space-x-2">
					<input
						type="checkbox"
						id="hasCoApplicant"
						checked={formData.hasCoApplicant}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								hasCoApplicant: e.target.checked,
							}))
						}
						className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
					/>
					<label
						htmlFor="hasCoApplicant"
						className="text-sm font-medium text-gray-700 print:text-black"
					>
						Add Co-Applicant
					</label>
				</div>

				{formData.hasCoApplicant && (
					<CoApplicantDetails
						coApplicantDetail={coApplicantDetail}
						onChange={handleCoApplicantDetailChange}
						onImageChange={(e) => handleImageUpload(e, "coApplicantImage")}
						coApplicantImage={formData.coApplicantImage}
					/>
				)}

				{/* Property Details */}
				<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
					PROPERTY DETAILS
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="projectName"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Project Name:
						</label>
						<input
							type="text"
							name="projectName"
							id="projectName"
							value={formData.projectName || ""}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="bookingAmount"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Booking Amount: <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="bookingAmount"
							id="bookingAmount"
							value={formData.bookingAmount || ""}
							onChange={handleChange}
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
						/>
						{errors?.bookingAmount && (
							<p className="mt-1 text-sm text-red-600 print:text-black">
								{errors.bookingAmount}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="selectedStructureType"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Structure Type: <span className="text-red-500">*</span>
						</label>
						<select
							name="selectedStructureType"
							id="selectedStructureType"
							value={formData.selectedStructureType || ""}
							onChange={handleChange}
							required
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
						>
							<option value="">Select Structure Type</option>
							<option value="G+1 (ECONOMIC)">G+1 (ECONOMIC)</option>
							<option value="G+1 (ECONOMIC) New">G+1 (ECONOMIC) New</option>
							<option value="G+1 (PREMIUM)">G+1 (PREMIUM)</option>
							<option value="G+1 (PREMIUM) New">G+1 (PREMIUM) New</option>
							<option value="G+2 (PREMIUM)">G+2 (PREMIUM)</option>
						</select>
						{errors?.selectedStructureType && (
							<p className="mt-1 text-sm text-red-600 print:text-black">
								{errors.selectedStructureType}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="propertyCost"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Total Cost of Bungalow (Rs):{" "}
							<span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="propertyCost"
								id="propertyCost"
								value={formData.propertyCost || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
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
					<div>
						<label
							htmlFor="propertyType"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Bungalow Type: <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="propertyType"
								id="propertyType"
								value={formData.propertyType || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="propertyArea"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Bungalow Area: <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="propertyArea"
								id="propertyArea"
								value={formData.propertyArea || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
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
					<div>
						<label
							htmlFor="propertylocation"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Property Location: <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="propertylocation"
								id="propertylocation"
								value={formData.propertylocation || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="estimatedConstructionPeriod"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Estimated Construction Period (Days):{" "}
							<span className="text-red-500">*</span>
						</label>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								name="estimatedConstructionPeriod"
								id="estimatedConstructionPeriod"
								value={formData.estimatedConstructionPeriod || ""}
								onChange={handleChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
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
					<div>{/* Empty div to maintain grid layout */}</div>
				</div>

				{/* Plot Details */}
				<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
					PLOT DETAILS
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
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
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
					<div>
						<label
							htmlFor="plotFacing"
							className="block text-sm font-medium text-gray-700 print:text-black"
						>
							Plot Facing:
						</label>
						<select
							name="plotFacing"
							id="plotFacing"
							value={formData.plotFacing || ""}
							onChange={handleChange}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0 bg-white"
						>
							<option value="">Select Plot Facing</option>
							<option value="North">North</option>
							<option value="South">South</option>
							<option value="East">East</option>
							<option value="West">West</option>
							<option value="North-East">North-East</option>
							<option value="North-West">North-West</option>
							<option value="South-East">South-East</option>
							<option value="South-West">South-West</option>
							<option value="N/A">N/A</option>
							<option value="Subject to Confirmation">
								Subject to Confirmation
							</option>
						</select>
					</div>
					<div>{/* Empty div to maintain grid layout */}</div>
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

				{/* Land Identification Details */}
				<h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2 text-gray-900 print:text-black print:text-lg">
					LAND IDENTIFICATION DETAILS
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
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
								className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
							/>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="jl_noOption"
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
									name="jl_noOption"
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
						{errors?.jl_no && (
							<p className="mt-1 text-sm text-red-600 print:text-black">
								{errors.jl_no}
							</p>
						)}
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
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
								className="w-full border-b-2 border-orange-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
							/>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="dag_noOption"
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
									name="dag_noOption"
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
						{errors?.dag_no && (
							<p className="mt-1 text-sm text-red-600 print:text-black">
								{errors.dag_no}
							</p>
						)}
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
								className="w-full border-b-2 border-red-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
							/>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									name="khatian_noOption"
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
									name="khatian_noOption"
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
						{errors?.khatian_no && (
							<p className="mt-1 text-sm text-red-600 print:text-black">
								{errors.khatian_no}
							</p>
						)}
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
							className="w-full border-b-2 border-purple-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
						/>
						<div className="flex items-center space-x-2">
							<input
								type="radio"
								name="panchayat_municipalityOption"
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
								name="panchayat_municipalityOption"
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
					{errors?.panchayat_municipality && (
						<p className="mt-1 text-sm text-red-600 print:text-black">
							{errors.panchayat_municipality}
						</p>
					)}
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
										htmlFor="g1-structure-new"
										className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
									>
										G+1 (ECONOMIC) New
									</label>
								</div>
								<div className="flex items-center">
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
								</div>
								<div className="flex items-center">
									<input
										id="g1-structure-new"
										name="selectedStructureType"
										type="radio"
										value="G+1 (PREMIUM) New"
										checked={
											formData.selectedStructureType === "G+1 (PREMIUM) New"
										}
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of 2nd Roof Casting
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of 3rd Roof Casting
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												-
											</td>
										)}
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
									<tr>
										<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-r print:text-black print:border-black">
											Commencement of Brick Work & Plastering
										</td>
										{formData.selectedStructureType === "G+1 (ECONOMIC)" && (
											<td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 print:text-black">
												10%
											</td>
										)}
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
										{formData.selectedStructureType ===
											"G+1 (ECONOMIC) New" && (
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
							<div className="flex items-center">
								<input
									id="selected-ground-floor-print-new"
									type="checkbox"
									checked={
										formData.selectedStructureType === "G+1 (ECONOMIC) New"
									}
									readOnly
									className="h-4 w-4 text-indigo-600 border-gray-300 print:text-black print:border-black"
								/>
								<label
									htmlFor="selected-ground-floor-print-new"
									className="ml-3 block text-sm font-medium text-gray-700 print:text-black"
								>
									G+1 (ECONOMIC) New
								</label>
							</div>
							<div className="flex items-center">
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
							</div>
							<div className="flex items-center">
								<input
									id="selected-g1-structure-new-print"
									type="checkbox"
									checked={
										formData.selectedStructureType === "G+1 (PREMIUM) New"
									}
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
								placeholder="Enter booking amount"
							/>
							{errors?.bookingAmount && (
								<p className="mt-1 text-sm text-red-600 print:text-black">
									{errors.bookingAmount}
								</p>
							)}
						</div>
						<div>
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
												setFormData((prev) => ({
													...prev,
													ifscCode: "N/A",
												}))
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
						</div>
						<div>
							<label
								htmlFor="paymentDate"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Payment Date:
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
						<div>
							<label
								htmlFor="cheque_dd_no"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Cheque/DD No:
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="cheque_dd_no"
									id="cheque_dd_no"
									value={formData.cheque_dd_no || ""}
									onChange={handleChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 print:border-none print:shadow-none print:ring-0"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="chequeDdNoOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												cheque_dd_no: "N/A",
											}))
										}
										className="h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label className="text-sm text-gray-700">N/A</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="chequeDdNoOption"
										value="Subject to Confirmation"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												cheque_dd_no: "Subject to Confirmation",
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
								htmlFor="transactionReferenceNo"
								className="block text-sm font-medium text-gray-700 print:text-black"
							>
								Transaction Reference No:
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
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
								/>
								<div className="flex items-center space-x-2">
									<input
										type="radio"
										name="referredByOption"
										value="NA"
										onChange={() =>
											setFormData((prev) => ({
												...prev,
												referredBy: "N/A",
											}))
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
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
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
								Relationship with Applicant:{" "}
								<span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="refererRelationship"
									id="refererRelationship"
									value={formData.refererRelationship || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
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
								Reference/Customer ID (if existing customer):{" "}
								<span className="text-red-500">*</span>
							</label>
							<div className="flex items-center space-x-4">
								<input
									type="text"
									name="referenceCustomerId"
									id="referenceCustomerId"
									value={formData.referenceCustomerId || ""}
									onChange={handleChange}
									className="w-full border-b-2 border-violet-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
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

				{/* Submit Button */}
				<div className="flex justify-end space-x-4 mt-8">
					<button
						type="button"
						onClick={() => router.push("/admin/booking-forms")}
						className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={submitting}
						className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{submitting ? "Updating..." : "Update Booking"}
					</button>
				</div>
			</form>
		</div>
	);
}
