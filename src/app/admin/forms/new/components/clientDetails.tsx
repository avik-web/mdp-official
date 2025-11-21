import React, { useState } from "react";
import { ClientDetail } from "@/types/clientDetails.type";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
	clientDetail: ClientDetail;
	applicantImage: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ClientDetails({
	clientDetail,
	onChange,
	onImageChange,
	applicantImage,
}: Props) {
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validateField = (name: string, value: string) => {
		let error = "";

		switch (name) {
			case "fullName":
				if (!value.trim()) {
					error = "Full name is required";
				} else if (value.length < 3) {
					error = "Full name must be at least 3 characters";
				}
				break;

			case "relationship":
				if (!value.trim()) {
					error = "Relationship is required";
				}
				break;

			case "dateOfBirth":
				if (!value) {
					error = "Date of birth is required";
				} else {
					const dob = new Date(value);
					const today = new Date();
					if (dob > today) {
						error = "Date of birth cannot be in the future";
					}
				}
				break;

			case "occupation":
				if (!value.trim()) {
					error = "Occupation is required";
				}
				break;

			case "contactNumber":
				if (!value.trim()) {
					error = "Contact number is required";
				} else if (!/^[0-9]{10}$/.test(value)) {
					error = "Contact number must be 10 digits";
				}
				break;

			case "address":
				if (!value.trim()) {
					error = "Address is required";
				}
				break;

			case "city":
				if (!value.trim()) {
					error = "City is required";
				}
				break;

			case "state":
				if (!value.trim()) {
					error = "State is required";
				}
				break;

			case "pinCode":
				if (!value.trim()) {
					error = "PIN code is required";
				} else if (!/^[0-9]{6}$/.test(value)) {
					error = "PIN code must be 6 digits";
				}
				break;

			case "email":
				if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
					error = "Invalid email format";
				}
				break;

			case "panCardNo":
				if (!value.trim()) {
					error = "PAN number is required";
				} else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
					error = "Invalid PAN card format (e.g., ABCDE1234F)";
				}
				break;

			case "aadhaarNo":
				if (!value.trim()) {
					error = "Aadhaar number is required";
				} else if (!/^[0-9]{12}$/.test(value)) {
					error = "Aadhaar number must be 12 digits";
				}
				break;
		}

		return error;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const error = validateField(name, value);
		
		setErrors(prev => ({
			...prev,
			[name]: error
		}));

		if (error) {
			toast.error(error);
		}

		onChange(e);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) { // 5MB limit
				toast.error("Image size should be less than 5MB");
				return;
			}
			if (!file.type.startsWith('image/')) {
				toast.error("Please upload an image file");
				return;
			}
		}
		onImageChange(e);
	};

	return (
		<>
			<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
				<h3 className="font-bold text-sm text-gray-900">Applicant Details</h3>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2 print:text-black">
						First Applicant Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="fullName"
						placeholder="Sumit Kumar Das"
						value={clientDetail?.fullName}
						onChange={handleChange}
						required
						className={`w-full border-b-2 ${errors.fullName ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						S/D/W Of <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="relationship"
						placeholder="Dipali Das"
						value={clientDetail?.relationship}
						onChange={handleChange}
						required
						className={`w-full border-b-2 ${errors.relationship ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black">
						Date of Birth <span className="text-red-500">*</span>
					</label>
					<input
						type="date"
						name="dateOfBirth"
						value={clientDetail?.dateOfBirth}
						onChange={handleChange}
						required
						className={`w-full border-b-2 ${errors.dateOfBirth ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black">
						Occupation <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="occupation"
						placeholder="Service"
						value={clientDetail?.occupation}
						onChange={handleChange}
						required
						className={`w-full border-b-2 ${errors.occupation ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Company/Organization <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="company"
						placeholder="Maity Innovations Pvt. Ltd."
						value={clientDetail?.company}
						onChange={handleChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Designation <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="designation"
						placeholder="Software Developer"
						value={clientDetail?.designation}
						onChange={handleChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Work Address <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="workAddress"
						placeholder="City Center, Durgapur"
						value={clientDetail?.workAddress}
						onChange={handleChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Contact Number <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="contactNumber"
						placeholder="7074397400"
						value={clientDetail?.contactNumber}
						onChange={handleChange}
						className={`w-full border-b-2 ${errors.contactNumber ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
				</div>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
					Residential Address <span className="text-red-500">*</span>
				</label>
				<textarea
					name="address"
					value={clientDetail?.address}
					placeholder="Tara Shankar Sarani, City Center, Durgapur"
					onChange={handleChange}
					rows={2}
					className={`w-full border-b-2 ${errors.address ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
				></textarea>
				{errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-4 print:gap-2 print:grid-cols-4 mt-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						City <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="city"
						placeholder="Durgapur"
						value={clientDetail?.city}
						onChange={handleChange}
						className={`w-full border-b-2 ${errors.city ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						State <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="state"
						placeholder="West Bengal"
						value={clientDetail?.state}
						onChange={handleChange}
						className={`w-full border-b-2 ${errors.state ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						PIN Code <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="pinCode"
						placeholder="713216"
						value={clientDetail?.pinCode}
						onChange={handleChange}
						className={`w-full border-b-2 ${errors.pinCode ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Email (Leave blank if don&apos;t)
					</label>
					<input
						type="email"
						name="email"
						placeholder="sumit@maityinnovations.com"
						value={clientDetail?.email}
						onChange={handleChange}
						className={`w-full border-b-2 ${errors.email ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						PAN No <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="panCardNo"
						placeholder="AFZPK7190K"
						value={clientDetail?.panCardNo}
						onChange={handleChange}
						required
						className={`w-full border-b-2 ${errors.panCardNo ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.panCardNo && <p className="text-red-500 text-xs mt-1">{errors.panCardNo}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Aadhaar No <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="aadhaarNo"
						placeholder="123456789012"
						value={clientDetail?.aadhaarNo}
						onChange={handleChange}
						className={`w-full border-b-2 ${errors.aadhaarNo ? 'border-red-500' : 'border-blue-400'} p-2 rounded-sm bg-gray-100 outline-none text-sm`}
					/>
					{errors.aadhaarNo && <p className="text-red-500 text-xs mt-1">{errors.aadhaarNo}</p>}
				</div>
			</div>
			<div className="flex flex-col items-start gap-2">
				<label className="block text-sm font-medium text-gray-700 print:text-black">
					Applicant Image:
				</label>

				<label
					htmlFor="applicant-upload"
					className="mt-1 w-32 h-32 border-2 border-blue-400 flex items-center justify-center text-xs text-gray-500 rounded cursor-pointer hover:shadow"
				>
					{applicantImage ? (
						<Image
							src={applicantImage}
							alt="Applicant Preview"
							width={500}
							height={300}
							className="w-full h-full object-cover rounded"
						/>
					) : (
						<span className="text-center">Click to add Photo</span>
					)}
					<input
						id="applicant-upload"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="hidden"
					/>
				</label>
			</div>
		</>
	);
}
