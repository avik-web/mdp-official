import React, { forwardRef } from "react";
import Image from "next/image";
import Heading from "../global/heading";

const amenityData = [
	{ src: "/assets/amenities/a1.png", label: "24/7 Electricity Supply" },
	{ src: "/assets/amenities/a2.png", label: "Babysitting Service" },
	{
		src: "/assets/amenities/a3.png",
		label: "Grocery Store with Home Delivery",
	},
	{ src: "/assets/amenities/a4.png", label: "Bank" },
	{ src: "/assets/amenities/a5.png", label: "Jogging Track" },
	{ src: "/assets/amenities/a6.png", label: "Childrens Park with Playground" },
	{ src: "/assets/amenities/a7.png", label: "ATM" },
	{ src: "/assets/amenities/a8.png", label: "Medicine Shop" },
	{ src: "/assets/amenities/a9.png", label: "Elderly Care Services" },
	{ src: "/assets/amenities/a10.png", label: "Day Care Clinic" },
	{ src: "/assets/amenities/a11.png", label: "Modern Clubhouse" },
	{ src: "/assets/amenities/a12.png", label: "Professional Spa" },
	{ src: "/assets/amenities/a13.png", label: "Kindergarten" },
	{ src: "/assets/amenities/a14.png", label: "Underground Sewage System" },
	{ src: "/assets/amenities/a15.png", label: "Visitors Parking Facilities" },
	{ src: "/assets/amenities/a16.png", label: "24/7 Borewell Water Supply" },
	{ src: "/assets/amenities/a17.png", label: "Fully Equipped Modern Gym" },
	{
		src: "/assets/amenities/a18.png",
		label: "CCTV Surveillance with 24/7 Monitoring",
	},
	{ src: "/assets/amenities/a19.png", label: "24-Hour Security Services" },
	{ src: "/assets/amenities/a20.png", label: "Kids Swimming Pool" },
	{ src: "/assets/amenities/a21.png", label: "Indoor Games Facilities" },
	{ src: "/assets/amenities/a22.png", label: "Medical Facilities" },
	{ src: "/assets/amenities/a23.png", label: "Security Personnel" },
	{ src: "/assets/amenities/a24.png", label: "Gardening Area" },
	{ src: "/assets/amenities/a25.png", label: "Temple" },
	{
		src: "/assets/amenities/a26.png",
		label: "Laundry and Dry-Cleaning Services",
	},
	{ src: "/assets/amenities/a27.png", label: "Food Delivery Services" },
];

const Amenities = forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div ref={ref} className="bg-white">
			<div className="py-12 max-w-7xl mx-auto">
			
                <Heading
				      title="Amenities We Offer"
				      subtitle="From modern essentials to lifestyle enhancements, we provide a range
					   of amenities designed for your comfort, convenience, and well-being."
			        />

				<div className="flex flex-col lg:flex-row gap-8">
					<div className="flex-1 bg-[#fefefe] rounded-xl p-8">
						<div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-8">
							{amenityData.map((item) => (
								<div
									key={item.src}
									className="flex flex-col items-center text-center"
								>
									<Image
										src={item.src}
										alt={item.label}
										width={160}
										height={160}
										className="w-[460px] h-[160px] mb-4 object-cover"
									/>
									<span className="text-base font-medium text-gray-800 leading-tight">
										{item.label}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

Amenities.displayName = "Amenities";

export default Amenities;
