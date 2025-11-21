"use client";
import { services } from "@/constants/services";
import Link from "next/link";
import { useState } from "react";

const OurServices = () => {
	const [showAll, setShowAll] = useState(false);

	const displayedServices = showAll ? services : services.slice(0, 6);

	return (
		<header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
			<div className="text-center mb-16">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
					What We Offer
				</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					MyDearCity Builders offers end-to-end home construction with trust,
					transparency, and timely delivery.
				</p>
			</div>

			{/* Services Grid */}
			<div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{displayedServices.map((service, index) => (
					<Link href={`/details/${service.slug}`} key={index}>
						<div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:bg-green-50 border transition-all duration-300">
							<div className="p-6">
								<h3 className="text-lg font-medium text-gray-900">
									{service.title}
								</h3>
								<p className="mt-2 text-gray-500">{service.description}</p>
								<div className="mt-4">
									<Link
										href={`/details/${service.slug}`}
										className="text-green-500 hover:text-green-600"
									>
										Explore More →
									</Link>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Button Section */}
			<div className="mt-12 text-center">
				{!showAll && services.length > 6 && (
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

export default OurServices;
