"use client";
import { bungalowsDetails } from "@/constants/bunglows-details";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BookingModal } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";

const Elevations = () => {
	const [open, setOpen] = useState(false);
	const [selectedBungalow, setSelectedBungalow] = useState("");
	const [showAll, setShowAll] = useState(false);

	// Corrected: Use bungalowsDetails instead of undefined "bungalow"
	const filteredBungalow = showAll
		? bungalowsDetails
		: bungalowsDetails.slice(0, 3);

	return (
		<header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
			<div className="text-center mb-16">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
					Our Bungalows
				</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					From Foundation to Finish — End-to-End Home Construction You Can Rely
					On.
				</p>
			</div>

			<div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredBungalow.map((bungalow, idx) => (
					<div
						key={idx}
						className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
					>
						<div className="relative h-52">
							<Image
								src={bungalow.images[0]}
								alt={bungalow.title}
								fill
								className="object-cover"
							/>
							<span className="absolute top-2 right-4 bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-full">
								{bungalow.bhk} BHK
							</span>
						</div>

						<div className="flex-1 flex flex-col p-4">
							<h3 className="text-lg font-semibold text-gray-900 mb-1">
								{bungalow.title}
							</h3>
							<div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
								<span className="text-sm text-gray-700">{bungalow.areA}</span>
								<span className="text-sm text-gray-700">₹{bungalow.price}</span>
							</div>

							<div className="w-full mt-auto flex space-x-2">
								<Link
									href={`/bungalows/${bungalow.slug}`}
									className="w-[120px] flex items-center justify-center p-2 border border-transparent text-xs font-medium rounded-md text-white bg-[#1E2023]"
								>
									View Details
								</Link>
								<button
									onClick={() => {
										setSelectedBungalow(bungalow.title);
										setOpen(true);
									}}
									className="inline-flex items-center p-2 border border-primary text-xs font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white transition-colors duration-200 cursor-pointer"
								>
									Enquiry Now
								</button>
							</div>
						</div>
					</div>
				))}
				{open && <BookingModal bungalow={selectedBungalow} setOpen={setOpen} />}
			</div>

			<div className="mt-12 text-center">
				{!showAll && bungalowsDetails.length > 3 && (
					<button
						onClick={() => setShowAll(true)}
						className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
					>
						Show More
					</button>
				)}

				{showAll && (
					<button
						onClick={() => setShowAll(false)}
						className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer mt-4"
					>
						Show Less
					</button>
				)}
			</div>
		</header>
	);
};

export default Elevations;
