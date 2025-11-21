"use client";

import { BookingModal } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
import { bungalowsDetails } from "@/constants/bunglows-details";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
	return (
		<div className={`relative ${className}`}>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full cursor-pointer"
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</div>
	);
};

export default function FloorPlans() {
	const [showAll, setShowAll] = useState(false);
	const [filters, setFilters] = useState({
		location: "",
		bhk: "",
		area: "",
	});
	const [open, setOpen] = useState(false);
	const [selectedBungalow, setSelectedBungalow] = useState("");

	const bungalowsRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		setShowAll(false);
	}, [filters]);

	const visibleBungalows = showAll
		? filteredBungalows
		: filteredBungalows.slice(0, 4);

	return (
		<main ref={bungalowsRef} className="flex flex-col items-center">
			{/* Filter Bar */}
			<div className="w-full mb-8 flex flex-wrap gap-3">
				{/* Location Filter */}
				<CustomDropdown
					options={[...uniqueLocations]}
					value={filters.location}
					onChange={(value) =>
						setFilters((prev) => ({
							...prev,
							location: value === "All Locations" ? "" : value,
						}))
					}
					placeholder="All Locations"
					className="w-full sm:w-48"
				/>

				{/* BHK Filter */}
				<CustomDropdown
					options={[...uniqueBHKs.map((bhk) => `${bhk} BHK`)]}
					value={filters.bhk ? `${filters.bhk} BHK` : ""}
					onChange={(value) =>
						setFilters((prev) => ({
							...prev,
							bhk: value === "Property Types" ? "" : value.split(" ")[0],
						}))
					}
					placeholder="Property Types"
					className="w-full sm:w-48"
				/>

				{/* Area Filter */}
				<CustomDropdown
					options={[...uniqueAreas]}
					value={filters.area}
					onChange={(value) =>
						setFilters((prev) => ({
							...prev,
							area: value === "All Areas" ? "" : value,
						}))
					}
					placeholder="All Areas"
					className="w-full sm:w-48"
				/>

				{/* Reset Filters Button */}
				{/* <button
					onClick={() => setFilters({ location: "", bhk: "", area: "" })}
					className="group relative inline-flex items-center px-8 py-2 text-base font-semibold rounded-xl text-black  hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 active:scale-95 overflow-hidden border border-gray-200 w-full sm:w-auto cursor-pointer"
				>
					<span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
					<X className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-180 relative z-10" />
					<span className="relative z-10">Reset Filters</span>
				</button> */}
			</div>

			{/* No Results Message */}
			{filteredBungalows.length === 0 ? (
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
						No Elevations Found
					</h3>
					<p className="text-gray-500 mb-6">
						We couldn&apos;t find any elevations matching your selected filters
					</p>
					<button
						onClick={() => setFilters({ location: "", bhk: "", area: "" })}
						className="group relative inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-xl text-black bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden cursor-pointer"
					>
						<span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
						<X className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-180 relative z-10" />
						<span className="relative z-10">Reset Filters</span>
					</button>
				</div>
			) : (
				<>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
						{visibleBungalows.map((bungalow, idx) => (
							<div
								key={idx}
								className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
							>
								<div className="relative w-full md:w-44 h-44 md:h-auto">
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

								<div className="flex flex-col p-6">
									<h3 className="text-sm font-semibold text-gray-900 mb-2">
										{bungalow.title}
									</h3>
									<div className="flex flex-wrap items-center text-gray-500 text-sm mb-2 gap-2 md:space-x-4">
										<span className="flex items-center">
											{bungalow.floors} Floors
										</span>
										<span className="flex items-center text-sm text-gray-700">
											{bungalow.areA}
										</span>
									</div>
									<div className="mb-2">
										<span className="text-black text-lg font-bold">
											₹{bungalow.price}
										</span>
									</div>
									<div className="w-full mt-auto flex  gap-2 md:space-x-2">
										<Link
											href={`/bungalows/${bungalow.slug}`}
											className="flex items-center justify-center px-3 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-[#1E2023]"
										>
											View Details
										</Link>
										<button
											onClick={() => {
												setSelectedBungalow(bungalow.title);
												setOpen(true);
											}}
											className="flex items-center justify-center px-2 py-1 border text-xs font-medium rounded-lg text-black bg-white border-black cursor-pointer"
										>
											Enquiry
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					{!showAll && filteredBungalows.length > 4 && (
						<button
							onClick={() => setShowAll(true)}
							className="mt-4 px-6 py-2 bg-primary text-green-700 rounded-lg font-medium cursor-pointer"
						>
							View All Plans
						</button>
					)}
				</>
			)}

			{/* Booking Modal */}
			{open && <BookingModal bungalow={selectedBungalow} setOpen={setOpen} />}
		</main>
	);
}
