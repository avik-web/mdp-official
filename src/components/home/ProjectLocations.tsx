"use client";
import { motion } from "framer-motion";
import type { Icon as LeafletIcon } from "leaflet";
import { ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Dynamically import the map component with no SSR
// const MapWithNoSSR = dynamic(() => import("./Map"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-full flex items-center justify-center bg-gray-100">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//     </div>
//   ),
// });

interface Location {
	id: number;
	name: string;
	address: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	projects: number;
	image: string;
}

const locations: Location[] = [
	{
		id: 1,
		name: "City Center",
		address: "Near City Center, Durgapur",
		coordinates: { lat: 23.5204, lng: 87.3119 },
		projects: 5,
		image: "/assets/locations/city-center.jpg",
	},
	{
		id: 2,
		name: "Steel Township",
		address: "Steel Township Area, Durgapur",
		coordinates: { lat: 23.515, lng: 87.3089 },
		projects: 3,
		image: "/assets/locations/steel-township.jpg",
	},
	{
		id: 3,
		name: "Benachity",
		address: "Benachity Market Area, Durgapur",
		coordinates: { lat: 23.5175, lng: 87.3135 },
		projects: 4,
		image: "/assets/locations/benachity.jpg",
	},
	{
		id: 4,
		name: "Durgapur Steel Plant",
		address: "Near DSP Gate, Durgapur",
		coordinates: { lat: 23.5167, lng: 87.3167 },
		projects: 2,
		image: "/assets/locations/dsp.jpg",
	},
];

const ProjectLocations = () => {
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	);
	const [icon] = useState<LeafletIcon | null>(null);

	useEffect(() => {
		// Promise.all([import("leaflet"), import("leaflet/dist/leaflet.css")]).then(
		// 	([L]) => {
		// 		const leafletIcon = L.icon({
		// 			iconUrl: "/assets/marker-icon.png",
		// 			iconRetinaUrl: "/assets/marker-icon-2x.png",
		// 			shadowUrl: "/assets/marker-shadow.png",
		// 			iconSize: [25, 41],
		// 			iconAnchor: [12, 41],
		// 			popupAnchor: [1, -34],
		// 			shadowSize: [41, 41],
		// 		});
		// 		setIcon(leafletIcon);
		// 	}
		// );
	}, []);

	if (!icon) {
		return (
			<div className="w-full h-[500px] flex items-center justify-center bg-gray-100">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<section className="py-16 bg-gradient-to-b from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Our Presence in Durgapur
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our successful projects across different locations in
						Durgapur, each crafted with precision and care.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Map Container */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
					>
						{/* <MapWithNoSSR
              locations={locations}
              onLocationSelect={setSelectedLocation}
              icon={icon}
            /> */}
					</motion.div>

					{/* Locations List */}
					<div className="space-y-4">
						{locations.map((location, index) => (
							<motion.div
								key={location.id}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<button
									onClick={() => setSelectedLocation(location)}
									className={`w-full p-4 rounded-xl transition-all duration-300 ${
										selectedLocation?.id === location.id
											? "bg-primary text-white shadow-lg"
											: "bg-white hover:bg-gray-50 text-gray-900 shadow-md"
									}`}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="relative w-12 h-12 rounded-lg overflow-hidden">
												<Image
													src={location.image}
													alt={location.name}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="text-left">
												<h3 className="font-semibold">{location.name}</h3>
												<p
													className={`text-sm ${
														selectedLocation?.id === location.id
															? "text-white/80"
															: "text-gray-600"
													}`}
												>
													{location.address}
												</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<span className="text-sm font-medium">
												{location.projects} Projects
											</span>
											<ChevronRight className="w-5 h-5" />
										</div>
									</div>
								</button>
							</motion.div>
						))}
					</div>
				</div>

				{/* Location Details Modal */}
				{selectedLocation && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
						onClick={() => setSelectedLocation(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
							onClick={(e: React.MouseEvent) => e.stopPropagation()}
						>
							<div className="relative h-48 rounded-xl overflow-hidden mb-4">
								<Image
									src={selectedLocation.image}
									alt={selectedLocation.name}
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">
								{selectedLocation.name}
							</h3>
							<p className="text-gray-600 mb-4">{selectedLocation.address}</p>
							<div className="flex items-center space-x-2 text-primary">
								<MapPin className="w-5 h-5" />
								<span className="font-medium">
									{selectedLocation.projects} Successful Projects
								</span>
							</div>
						</motion.div>
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default ProjectLocations;
