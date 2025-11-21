"use client";
import { BookingModal } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
import { bungalowsDetails } from "@/constants/bunglows-details";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface CustomDropdownProps {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	className?: string;
}

const CustomDropdown = ({
	options,
	value,
	onChange,
	placeholder,
	className = "",
}: CustomDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className={`relative w-full sm:w-[200px] ${className}`}
			ref={dropdownRef}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm hover:border-gray-300 transition-all duration-200 text-gray-700 flex items-center justify-between"
			>
				<span className="truncate">{value || placeholder}</span>
				<ChevronDown
					className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
					<div className="py-1">
						{options.map((option) => (
							<button
								key={option}
								onClick={() => {
									onChange(option);
									setIsOpen(false);
								}}
								className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
									value === option ? "bg-gray-100 text-gray-400" : "text-gray-700"
								}`}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const FeaturedBunglaws = () => {
	const [open, setOpen] = useState(false);
	const [bungalow, setBungalow] = useState("");
	const [filters, setFilters] = useState({
		location: "",
		bhk: "",
		area: "",
	});

	// Get unique values for filters
	const uniqueLocations = useMemo(
		() => Array.from(new Set(bungalowsDetails.map((b) => b.location))),
		[]
	);
	const uniqueBHKs = useMemo(
		() => Array.from(new Set(bungalowsDetails.map((b) => b.bhk))),
		[]
	);
	const uniqueAreas = useMemo(
		() => Array.from(new Set(bungalowsDetails.map((b) => b.areA))),
		[]
	);

	// Filter bungalows based on selected filters
	const filteredBungalows = useMemo(() => {
		return bungalowsDetails.filter((bungalow) => {
			return (
				(!filters.location || bungalow.location === filters.location) &&
				(!filters.bhk || bungalow.bhk.toString() === filters.bhk) &&
				(!filters.area || bungalow.areA === filters.area)
			);
		});
	}, [filters]);

	return (
		<>
			<section className="py-16 bg-white" id="top-selling-bunglow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<h2 className="text-4xl font-bold text-gray-900 mb-2">
							Our Bunglows
						</h2>
						<div className="flex justify-center mb-2">
							<span className="inline-block w-16 h-1 bg-primary rounded"></span>
						</div>
						<p className="text-gray-500 text-lg">
							Explore our most popular top selling across destinations
						</p>
					</div>

					{/* Filter Bar */}
					<div className="mb-8 flex flex-wrap gap-3 justify-center px-4">
						{/* Location Filter */}
						<CustomDropdown
							options={["All Locations", ...uniqueLocations]}
							value={filters.location}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									location: value === "All Locations" ? "" : value,
								}))
							}
							placeholder="All Locations"
						/>

						{/* BHK Filter */}
						<CustomDropdown
							options={[
								"Property Types",
								...uniqueBHKs.map((bhk) => `${bhk} BHK`),
							]}
							value={filters.bhk ? `${filters.bhk} BHK` : ""}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									bhk: value === "Property Types" ? "" : value.split(" ")[0],
								}))
							}
							placeholder="Property Types"
						/>

						{/* Area Filter */}
						<CustomDropdown
							options={["All Areas", ...uniqueAreas]}
							value={filters.area}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									area: value === "All Areas" ? "" : value,
								}))
							}
							placeholder="All Areas"
						/>

						{/* Reset Filters Button */}
						<button
							onClick={() => setFilters({ location: "", bhk: "", area: "" })}
							className="group relative inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-xl text-black bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-sm hover:shadow-md  active:scale-95 overflow-hidden border border-gray-200"
						>
							<span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
							<X className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-180 relative z-10" />
							<span className="relative z-10">Reset Now</span>
						</button>
					</div>

					{/* No Results Message */}
					{filteredBungalows.length === 0 && (
						<div className="text-center py-12 px-4">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
								<svg
									className="w-8 h-8 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								No Bungalows Found
							</h3>
							<p className="text-gray-500 mb-6">
								We couldn&apos;t find any bungalows matching your selected
								filters
							</p>
							<button
								onClick={() => setFilters({ location: "", bhk: "", area: "" })}
								className="group relative inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-xl text-black bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden cursor-pointer"
							>
								<span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
								<X className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-180 relative z-10" />
								<span className="relative z-10">Reset Now</span>
							</button>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredBungalows.map((bungalow, idx) => (
							<div
								key={idx}
								className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
							>
								<div className="relative h-72">
									<Image
										src={bungalow.images[0]}
										alt={bungalow.title}
										fill
										className="object-cover"
									/>
									<span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-full">
										{bungalow.bhk} BHK
									</span>
								</div>
								<div className="flex-1 flex flex-col p-6">
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										{bungalow.title}
									</h3>
									<div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
										<span className="flex items-center">
											<svg
												className="w-4 h-4 mr-1"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 0a4 4 0 01-8 0m8 0V6a4 4 0 00-8 0v4m8 0a4 4 0 01-8 0"
												/>
											</svg>
											{bungalow.floors} Floors
										</span>
										<span className="flex items-center">
											<svg
												className="w-4 h-4 mr-1"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
												/>
											</svg>
											{bungalow.location}
										</span>
										<span className="flex items-center text-sm text-gray-700">
											<svg
												className="w-4 h-4 mr-1 text-gray-500"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M4 8V4h4M4 4l6 6M20 16v4h-4m4 0l-6-6"
												/>
											</svg>
											{bungalow.areA}
										</span>
									</div>
									<div className="mb-4">
										<span className="text-black text-2xl font-bold">
											₹{bungalow.price.toLocaleString()}
										</span>
									</div>
									<div className="w-full mt-auto flex space-x-2">
										<Link
											href={`/bungalows/${bungalow.slug}`}
											className="w-[140px] flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#1E2023]"
										>
											View Details
										</Link>
										<button
											className="inline-flex items-center px-4 py-2 border border-primary text-base font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white transition-colors duration-200 cursor-pointer"
											onClick={() => {
												setBungalow(bungalow.title);
												setOpen(true);
											}}
										>
											Book Now
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Booking Modal */}
			{open && <BookingModal bungalow={bungalow} setOpen={setOpen} />}
		</>
	);
};

export default FeaturedBunglaws;
