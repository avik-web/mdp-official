import React from "react";
import { ClientDetail } from "@/types/clientDetails.type";
import Image from "next/image";

interface Props {
	coApplicantDetail: ClientDetail;
	coApplicantImage: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CoApplicantDetails({
	coApplicantDetail,
	onChange,
	onImageChange,
	coApplicantImage,
}: Props) {
	return (
		<div>
			<div className="bg-gray-300 px-3 py-2 border-b border-gray-400">
				<h3 className="font-bold text-sm text-gray-900">
					Co-Applicant Details
				</h3>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Co-Applicant Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="fullName"
						placeholder="Snehasis Das"
						value={coApplicantDetail?.fullName}
						onChange={onChange}
						required
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						S/D/W Of <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="relationship"
						placeholder="Dipali Das"
						value={coApplicantDetail?.relationship}
						onChange={onChange}
						required
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Date of Birth <span className="text-red-500">*</span>
					</label>
					<input
						type="date"
						name="dateOfBirth"
						value={coApplicantDetail?.dateOfBirth}
						onChange={onChange}
						required
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Occupation <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="occupation"
						placeholder="Service"
						value={coApplicantDetail?.occupation}
						onChange={onChange}
						required
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Company/Organization <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="company"
						placeholder="Alphabet Inc."
						value={coApplicantDetail?.company}
						onChange={onChange}
						required
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
						placeholder="Software Engineer"
						value={coApplicantDetail?.designation}
						onChange={onChange}
						required
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
						placeholder="Mountain View, California, US"
						value={coApplicantDetail?.workAddress}
						onChange={onChange}
						required
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
						value={coApplicantDetail?.contactNumber}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
					Residential Address <span className="text-red-500">*</span>
				</label>
				<textarea
					name="address"
					value={coApplicantDetail?.address}
					placeholder="RA - 31, Tara Shankar Sarani, City Center, Durgapur"
					onChange={onChange}
					rows={2}
					className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
				></textarea>
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
						value={coApplicantDetail?.city}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						State <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="state"
						placeholder="West Bengal"
						value={coApplicantDetail?.state}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black">
						PIN Code <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="pinCode"
						placeholder="713216"
						value={coApplicantDetail?.pinCode}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Email (Leave blank if don&apos;t):
					</label>
					<input
						type="email"
						name="email"
						placeholder="snehasis@gmail.com"
						value={coApplicantDetail?.email}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 print:gap-2 print:grid-cols-2 mt-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						PAN Card No <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="panCardNo"
						placeholder="AFZPK7190K"
						value={coApplicantDetail?.panCardNo}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 print:text-black mb-2">
						Aadhaar No <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="aadhaarNo"
						placeholder="123456789012"
						value={coApplicantDetail?.aadhaarNo}
						onChange={onChange}
						className="w-full border-b-2 border-blue-400 p-2 rounded-sm bg-gray-100 outline-none text-sm"
					/>
				</div>
			</div>
			<div className="flex flex-col items-start gap-2">
				<label className="block text-sm font-medium text-gray-700 print:text-black mt-4">
					Co-Applicant Image:
				</label>

				<label
					htmlFor="co-applicant-upload"
					className="mt-1 w-32 h-32 border-2 border-blue-400 flex items-center justify-center text-xs text-gray-500 rounded cursor-pointer hover:shadow"
				>
					{coApplicantImage ? (
						<Image
							src={coApplicantImage}
							alt="Co-Applicant Preview"
							className="w-full h-full object-cover rounded"
						/>
					) : (
						<span className="text-center">Chick to add Photo</span>
					)}
					<input
						id="co-applicant-upload"
						type="file"
						accept="image/*"
						onChange={onImageChange}
						className="hidden"
					/>
				</label>
			</div>
		</div>
	);
}
