"use client";
import { services } from "@/constants/services";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
// import FloorPlans from "./FloorPlans";
import FloorPlans2 from "./FloorPlans2";

const BrowsePlans = () => {
	const displayedServices = services.slice(0, 6);
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 flex flex-col-reverse lg:flex-row gap-10">
			{/* Left side (services) */}
			<div className="w-full lg:w-[40%]">
				<div className="mb-5">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Our Services
					</h1>
					<p className="text-sm text-gray-600 max-w-2xl mx-auto">
						MyDearCity Builders offers end-to-end home construction with trust,
						transparency, and timely delivery.
					</p>
				</div>
				<div>
					{displayedServices.map((service, index) => (
						<Link href={`/details/${service.slug}`} key={index}>
							<div className="bg-white rounded-xl shadow-lg mb-2 overflow-hidden hover:bg-gray-100 border transition-all duration-300">
								<div className="p-4">
									<h3 className="text-lg font-medium text-gray-900">
										{service.title}
									</h3>
								</div>
							</div>
						</Link>
					))}
				</div>
				<Link href="services" className="text-green-700">
					<div className="flex items-center gap-2 mt-4">
						<p>View All Services</p>
						<ChevronRight size={20} className="text-green-700" />
					</div>
				</Link>
			</div>

			{/* Right side (floor plans) */}
			<div className="w-full mt-0 max-sm:mt-6">
				<div className="mb-5">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Browse Floor Plans
					</h1>
					<p className="text-sm text-gray-600 max-w-2xl">
						From foundation to finish, end-to-end home construction you can rely
						on.
					</p>
				</div>
				{/* <FloorPlans /> */}
				<FloorPlans2 />
			</div>
		</section>
	);
};

export default BrowsePlans;
