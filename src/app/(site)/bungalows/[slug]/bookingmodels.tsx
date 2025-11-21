"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import BookingModal from "./popup/bookingModel";
import { Bungalow } from "./__components/BungalowDetailsClient";

export default function BookingModalClient({
	bungalow,
}: {
	bungalow: Bungalow;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">
					{bungalow.title}
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					{bungalow.images.map((img: StaticImageData, idx: number) => (
						<div
							key={idx}
							className="relative h-64 rounded-lg overflow-hidden shadow"
						>
							<Image
								src={img}
								alt={`${bungalow.title} photo ${idx + 1}`}
								fill
								className="object-cover"
							/>
						</div>
					))}
				</div>

				<div className="bg-white rounded-lg shadow p-6 mb-8">
					<div className="flex flex-wrap gap-6 mb-4">
						<span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-full">
							{bungalow.bhk} BHK
						</span>
						<span className="text-gray-700">👥 {bungalow?.guests} Guests</span>
						<span className="text-gray-700">🏊 Private Pool</span>
						<span className="text-gray-700">📍 {bungalow.location}</span>
					</div>
					<div className="mb-4">
						<span className="text-primary text-2xl font-bold">
							₹{bungalow.price.toLocaleString()}
						</span>
						<span className="text-gray-500 ml-2">per night</span>
					</div>
					<p className="text-gray-700 mb-4">{bungalow.description}</p>
					<button
						onClick={() => setOpen(true)}
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
					>
						Book Now
					</button>
				</div>
			</div>

			<BookingModal
				open={open}
				onClose={() => setOpen(false)}
				title={bungalow.title}
			/>
		</div>
	);
}
