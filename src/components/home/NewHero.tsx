"use client";
import Link from "next/link";
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

const NewHero = () => {
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
		<header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
			<div className="flex max-sm:flex-col items-center justify-between">
				<div className="max-sm:w-full w-[50%] pr-20 max-sm:pr-0">
					<h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
						Build Your Dream Home With Us
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						End-to-end design, approvals, construction and interiors transparent
						pricing, milestone payments and dedicated project management.
					</p>
					<div className="flex max-sm:flex-col gap-4 mt-6">
						<Link href="#client">
							<button className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer text-sm">
								Our Story
							</button>
						</Link>
						<Link href="/mdc-ecohomes">
							<button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 cursor-pointer text-sm">
								View Pricing
							</button>
						</Link>
					</div>
					<p className="text-xs text-gray-600 max-w-2xl mx-auto mt-4">
						15+ Years • 500+ Projects • 98% Satisfaction • RERA Compliant
					</p>
				</div>

				<div className="max-sm:w-full w-[40%]">
					<form
						className="space-y-4 shadow-md rounded-lg p-4 bg-white"
						onSubmit={handleSubmit}
					>
						<h1 className="text-black text-lg font-bold">Get a Free Quote</h1>

						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								placeholder="Enter your name"
								value={data?.name}
								required
								className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-100 text-sm"
								onChange={(e) => setData({ ...data, name: e.target.value })}
							/>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								value={data?.email}
								placeholder="Enter your email"
								required
								className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-100 text-sm"
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
						</div>

						<div>
							<label className="block text-xs font-medium text-gray-700 mb-1">
								Phone Number
							</label>
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
									className="w-full pl-10 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-100 text-sm"
									onChange={(e) => setData({ ...data, phone: e.target.value })}
								/>
							</div>
							<p className="mt-1 text-xs text-gray-500">
								Enter a valid 10-digit Indian phone number
							</p>
						</div>

						<button
							type="submit"
							className="w-full text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold bg-[#1E2023] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</header>
	);
};

export default NewHero;
