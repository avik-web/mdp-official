"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface IINITIAL_STATE {
	name: string;
	email: string;
	phone: string;
	visitDate: string;
}

const INITIAL_STATE: IINITIAL_STATE = {
	name: "",
	email: "",
	phone: "",
	visitDate: new Date().toISOString().split("T")[0],
};

const ContactForm = () => {
	const [data, setData] = useState<IINITIAL_STATE>(INITIAL_STATE);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setData({
			name: "",
			email: "",
			phone: "",
			visitDate: new Date().toISOString().split("T")[0],
		});

		try {
			const response = await fetch("/api/property-visit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					propertyTitle: " ",

					visitTime: " ",
				}),
			});

			const dataForm = await response.json();

			if (!response.ok) {
				throw new Error(dataForm.message || "Failed to submit booking");
			}

			toast.success(`Booking confirmed! We'll contact you shortly.`, {
				duration: 5000,
				position: "top-center",
			});
		} catch (err) {
			console.log(err.message);

			toast.error(
				"Failed to submit booking. Please try again or contact support.",
				{
					duration: 5000,
					position: "top-center",
				}
			);
		}
	};
	return (
		<form
			className="w-[24%] max-sm:w-[90%] border space-y-4 shadow-sm rounded-2xl p-6 bg-white absolute overflow-hidden left-[18%] max-sm:left-4 top-[60%] max-sm:top-[42%]"
			onSubmit={handleSubmit}
		>
			<h1 className="text-black text-2xl font-bold">Get a Free Quote</h1>

			<div>
				<input
					type="text"
					name="name"
					placeholder="Enter your name"
					value={data?.name}
					required
					className="w-full p-3 text-gray-600 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-100 text-sm"
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
			</div>

			<div>
				<input
					type="email"
					name="email"
					value={data?.email}
					placeholder="Enter your email"
					required
					className="w-full p-3 rounded-lg border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-100 text-sm"
					onChange={(e) => setData({ ...data, email: e.target.value })}
				/>
			</div>

			<div>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
						+91
					</span>
					<input
						type="tel"
						name="phone"
						placeholder="9876543210"
						value={data?.phone}
						required
						pattern="[6-9][0-9]{9}"
						title="Please enter a valid Indian phone number starting with 6, 7, 8, or 9"
						className="w-full pl-10 p-3 rounded-lg border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-100 text-sm"
						onChange={(e) => setData({ ...data, phone: e.target.value })}
					/>
				</div>
				<p className="mt-1 text-xs text-gray-500">
					Enter a valid 10-digit Indian phone number
				</p>
			</div>

			<button
				type="submit"
				className="w-full p-3 border border-primary text-base font-medium rounded-md text-white bg-black hover:bg-[#1E2023] hover:text-white transition-colors duration-200"
			>
				Submit
			</button>
			<p className="mt-1 max-sm:mt-0 text-base text-gray-500 text-center">
				No spam, Your privacy is guaranteed
			</p>
		</form>
	);
};

export default ContactForm;
