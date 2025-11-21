"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Clock,
	Heart,
	Mail,
	MapPin,
	Phone,
	Share2,
	X,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FloorPlanDesign from "./FloorPlan";
import IconSelector from "./iconComponent";

interface AccordionProps {
	title: string;
	children: ReactNode;
	isOpen: boolean;
	onToggle: () => void;
}

// types/bungalow.ts
export interface Bungalow {
	slug: string;
	areA: string;
	title: string;
	images: (StaticImageData | string)[];
	bhk: number;
	floors: number;
	location: string;
	price: string;
	description?: string;
	plans: {
		title: string;
		image: StaticImageData | string;
		link: string;
	}[];
	structure: {
		materials: string;
		brands: string[];
	}[];
	tiles?: {
		materials: string;
		brands: string[];
	}[];
	doors?: {
		materials: string;
		brands: string[];
	}[];
	windows?: {
		materials: string;
		brands: string[];
	}[];
	brands?: string[];
	electrical: {
		area?: string;
		points?: Record<string, number>;
		rooms?: {
			name: string;
			points: Record<string, number>;
		}[];
		brands?: string[] | string;
		materials?: string;
	}[];
	plumbing?: {
		materials?: string;
		brands?: string[];
		area?: string;
		points?: Record<string, number>;
		rooms?: {
			name: string;
			points: Record<string, number>;
		}[];
	}[];
	paint?: {
		workType: string;
		brands: string[];
	}[];
	guests?: number;
}

// Type guard for StaticImageData
function isStaticImageData(img: unknown): img is StaticImageData {
	return typeof img === "object" && img !== null && "src" in img;
}

const Accordion = ({ title, children, isOpen, onToggle }: AccordionProps) => {
	return (
		<div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
			>
				<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				{isOpen ? (
					<ChevronUp className="h-5 w-5 text-gray-500" />
				) : (
					<ChevronDown className="h-5 w-5 text-gray-500" />
				)}
			</button>
			{isOpen && (
				<div className="p-4 bg-gray-50 border-t border-gray-200">
					{children}
				</div>
			)}
		</div>
	);
};

type AccordionSection = "bedrooms" | "drawing" | "bathroom";

const WishlistShareButtons = ({ bungalow }: { bungalow: Bungalow }) => {
	const [isWishlisted, setIsWishlisted] = useState(false);

	useEffect(() => {
		// Check if bungalow is in wishlist on component mount
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		setIsWishlisted(wishlist.includes(bungalow.slug));
	}, [bungalow.slug]);

	const toggleWishlist = () => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		let newWishlist;

		if (isWishlisted) {
			newWishlist = wishlist.filter((slug: string) => slug !== bungalow.slug);
			toast.success("Removed from wishlist");
		} else {
			newWishlist = [...wishlist, bungalow.slug];
			toast.success("Added to wishlist");
		}

		localStorage.setItem("wishlist", JSON.stringify(newWishlist));
		setIsWishlisted(!isWishlisted);

		// Dispatch custom event to update wishlist count
		window.dispatchEvent(new Event("wishlistUpdated"));
	};

	const handleShare = async () => {
		const shareData = {
			title: bungalow.title,
			text: `Check out this ${bungalow.bhk} BHK bungalow at ${bungalow.location}`,
			url: window.location.href,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
				toast.success("Shared successfully");
			} else {
				// Fallback for browsers that don't support Web Share API
				await navigator.clipboard.writeText(window.location.href);
				toast.success("Link copied to clipboard");
			}
		} catch (error) {
			if (error instanceof Error && error.name !== "AbortError") {
				toast.error("Failed to share");
			}
		}
	};

	return (
		<div className="flex items-center space-x-4">
			<button
				onClick={handleShare}
				className="p-2 text-gray-600 hover:text-primary transition-colors"
				title="Share"
			>
				<Share2 className="w-6 h-6" />
			</button>
			<button
				onClick={toggleWishlist}
				className={`p-2 transition-colors ${
					isWishlisted ? "text-red-500" : "text-gray-600 hover:text-primary"
				}`}
				title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
			>
				<Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
			</button>
		</div>
	);
};

// Add this new component before the main component
const FullScreenGallery = ({
	images,
	isOpen,
	onClose,
	initialIndex,
}: {
	images: (StaticImageData | string)[];
	isOpen: boolean;
	onClose: () => void;
	initialIndex: number;
}) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const handlePrev = useCallback(() => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	}, [images.length]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	}, [images.length]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") handlePrev();
			if (e.key === "ArrowRight") handleNext();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentIndex, handleNext, handlePrev, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
					onClick={onClose}
				>
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-4
						 right-4 z-10 text-white hover:text-gray-300 transition-colors"
					>
						<X className="w-8 h-8" />
					</button>

					{/* Navigation Buttons */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							handlePrev();
						}}
						className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/30 p-2 rounded-full"
					>
						<ChevronLeft className="w-8 h-8" />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleNext();
						}}
						className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/30 p-2 rounded-full"
					>
						<ChevronRight className="w-8 h-8" />
					</button>

					{/* Main Image */}
					<div className="relative w-full h-full flex items-center justify-center p-4">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className="relative w-full h-full max-w-7xl"
						>
							{isStaticImageData(images[currentIndex]) ? (
								<Image
									src={images[currentIndex]}
									alt={`Full screen view - Image ${currentIndex + 1}`}
									fill
									className="object-contain"
									priority
								/>
							) : (
								<Image
									src={images[currentIndex] as string}
									alt={`Full screen view - Image ${currentIndex + 1}`}
									fill
									className="object-contain"
									priority
								/>
							)}
						</motion.div>
					</div>

					{/* Thumbnails */}
					<div className="flex gap-2 max-w-[90%] py-2 px-4">
						{images.map((img, idx) => (
							<button
								key={idx}
								onClick={(e) => {
									e.stopPropagation();
									setCurrentIndex(idx);
								}}
								className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
									currentIndex === idx
										? "border-white scale-110"
										: "border-transparent hover:border-white/50"
								}`}
							>
								{isStaticImageData(img) ? (
									<Image
										src={img}
										alt={`Thumbnail ${idx + 1}`}
										width={64}
										height={64}
										className="object-cover"
									/>
								) : (
									<Image
										src={img as string}
										alt={`Thumbnail ${idx + 1}`}
										width={64}
										height={64}
										className="object-cover"
									/>
								)}
							</button>
						))}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default function BungalowDetailsClient({
	bungalow,
}: {
	bungalow: Bungalow;
}) {
	const [open, setOpen] = useState(false);
	const [openAccordions, setOpenAccordions] = useState({
		bedrooms: false,
		drawing: false,
		bathroom: false,
		openSpace: false,
		passage: false,
	});
	const [openPlan, setOpenPlan] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [fullScreenIndex, setFullScreenIndex] = useState(0);
	const [zoomedPlan, setZoomedPlan] = useState<{
		image: StaticImageData | string;
		title: string;
		link: string;
	} | null>(null);

	const toggleAccordion = (section: AccordionSection | string) => {
		setOpenAccordions((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleImageClick = (index: number) => {
		setSelectedImage(index);
		setFullScreenIndex(index);
		setIsFullScreen(true);
	};

	return (
		<div className="min-h-screen bg-gray-50 pb-5">
			{/* Hero Section with Image Gallery */}
			<div className="relative min-h-[95vh] bg-white">
				{/* Top Thumbnails */}
				<div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
					<div className="flex justify-center gap-3 overflow-x-auto pb-4 px-4 scrollbar-hide">
						{bungalow.images.slice(0, 10).map((img, idx) => (
							<button
								key={idx}
								onClick={() => setSelectedImage(idx)}
								className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
									selectedImage === idx
										? "border-black scale-110 shadow-lg"
										: "border-transparent hover:border-gray-300"
								}`}
							>
								{isStaticImageData(img) ? (
									<Image
										src={img}
										alt={`${bungalow.title} thumbnail ${idx + 1}`}
										width={96}
										height={96}
										className="object-cover w-full h-full"
									/>
								) : (
									<Image
										src={img as string}
										alt={`${bungalow.title} thumbnail ${idx + 1}`}
										width={96}
										height={96}
										className="object-cover w-full h-full"
									/>
								)}
							</button>
						))}
					</div>
				</div>

				{/* Bento Grid */}
				<div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 pt-24 sm:pt-28 md:pt-32">
					{bungalow.images.slice(0, 6).map((img, idx) => (
						<div
							key={idx}
							className={`relative overflow-hidden rounded-xl group cursor-pointer ${
								idx === 0
									? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2"
									: idx === 1 || idx === 2
									? "col-span-1 row-span-1"
									: "col-span-1 row-span-1"
							}`}
							onClick={() => handleImageClick(idx)}
						>
							{isStaticImageData(img) ? (
								<Image
									src={img}
									alt={`${bungalow.title} - Image ${idx + 1}`}
									fill
									className={`object-cover transition-all duration-500 ${
										selectedImage === idx
											? "scale-105"
											: "group-hover:scale-105"
									}`}
									priority={idx === 0}
									sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								/>
							) : (
								<Image
									src={img as string}
									alt={`${bungalow.title} - Image ${idx + 1}`}
									fill
									className={`object-cover transition-all duration-500 ${
										selectedImage === idx
											? "scale-105"
											: "group-hover:scale-105"
									}`}
									priority={idx === 0}
									sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								/>
							)}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
								<p className="text-white text-xs sm:text-sm font-medium">
									View Full Screen
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Back Button */}
				<Link
					href="/mdc-ecohomes"
					className="absolute top-4 left-4 z-10 flex items-center text-white hover:text-gray-200 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
				>
					<ArrowLeft className="w-5 h-5 mr-2" />
					Back to Listings
				</Link>
			</div>

			{/* Full Screen Gallery Modal */}
			<FullScreenGallery
				images={bungalow.images}
				isOpen={isFullScreen}
				onClose={() => setIsFullScreen(false)}
				initialIndex={fullScreenIndex}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
				{/* Main Content */}
				<div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
					<div className="flex flex-wrap items-start justify-between gap-4 mb-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								{bungalow.title}
							</h1>
							<div className="flex items-center text-gray-600">
								<MapPin className="w-5 h-5 mr-2" />
								<span>{bungalow.location}</span>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<WishlistShareButtons bungalow={bungalow} />
							<span className="text-2xl font-bold text-black">
								₹{bungalow.price.toLocaleString()}
							</span>
						</div>
					</div>

					{/* Key Features */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
						<div className="bg-gray-50 p-4 rounded-xl">
							<div className="text-sm text-gray-600 mb-1">Type</div>
							<div className="font-semibold text-black">{bungalow.bhk} BHK</div>
						</div>
						<div className="bg-gray-50 p-4 rounded-xl">
							<div className="text-sm text-gray-600 mb-1">Floors</div>
							<div className="font-semibold text-black">{bungalow.floors}</div>
						</div>
						<div className="bg-gray-50 p-4 rounded-xl">
							<div className="text-sm text-gray-600 mb-1">Location</div>
							<div className="font-semibold text-black">
								{bungalow.location}
							</div>
						</div>
						<div className="bg-gray-50 p-4 rounded-xl">
							<div className="text-sm text-gray-600 mb-1">Status</div>
							<div className="font-semibold text-green-600">Available</div>
						</div>
					</div>

					{/* Description */}
					<div className="prose max-w-none mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Description
						</h2>
						<p className="text-gray-600 leading-relaxed">
							{bungalow.description}
						</p>
					</div>

					{/* Plans */}
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Floor Plans
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{bungalow.plans.map((plan, idx) => (
								<div
									key={idx}
									className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer"
									onClick={() => {
										setZoomedPlan({
											image: plan.image,
											title: plan.title,
											link: plan.link,
										});
										setOpenPlan(true);
									}}
								>
									<div className="p-4">
										<h3 className="text-lg font-semibold text-gray-900 mb-2">
											{plan?.title}
										</h3>
									</div>
									<div className="relative h-64">
										{isStaticImageData(plan.image) ? (
											<Image
												src={plan?.image}
												alt={plan?.title}
												fill
												className="object-contain hover:scale-105 transition-transform duration-300"
											/>
										) : (
											<Image
												src={plan?.image}
												alt={plan?.title}
												fill
												className="object-contain hover:scale-105 transition-transform duration-300"
											/>
										)}
									</div>
								</div>
							))}
							{openPlan && (
								<FloorPlanDesign
									image={zoomedPlan?.image}
									title={zoomedPlan?.title}
									setOpenPlan={setOpenPlan}
									link={zoomedPlan?.link}
								/>
							)}
						</div>
					</div>

					{/* Structure */}
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Structure & Materials
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{bungalow.structure.map((item, idx) => (
								<div key={idx} className="bg-gray-50 p-4 rounded-xl">
									<h3 className="font-semibold text-gray-900 mb-2 capitalize">
										{item?.materials}
									</h3>
									<p className="text-gray-600">{item?.brands.join(", ")}</p>
								</div>
							))}
						</div>
					</div>
					{/* Peripherals */}
					<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Peripherals
						</h2>
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold text-gray-900 mb-4">
									Tiles
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
									{bungalow?.tiles?.map((item, idx) => (
										<div
											key={idx}
											className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
										>
											<p className="text-gray-700 font-medium capitalize">
												{item?.materials}
											</p>
											<p className="text-gray-600">{item?.brands.join(", ")}</p>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold text-gray-900 mb-4">
									Doors
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{bungalow?.doors?.map((item, idx) => (
										<div
											key={idx}
											className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
										>
											<p className="text-gray-700 font-medium capitalize">
												{item?.materials}
											</p>
											<p className="text-gray-600 capitalize">
												{item?.brands.join(", ")}
											</p>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold text-gray-900 mb-4">
									Windows
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
									{bungalow?.windows?.map((item, idx) => (
										<div
											key={idx}
											className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
										>
											<p className="text-gray-700 font-medium capitalize">
												{item?.materials}
											</p>
											<p className="text-gray-600 capitalize">
												{item?.brands.join(", ")}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Electrical */}
					<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Electrical
						</h2>

						{/* Brands Section */}
						{(() => {
							const brandsArr = bungalow?.electrical?.find(
								(item) => item?.materials
							)?.brands;
							return Array.isArray(brandsArr) && brandsArr.length > 0 ? (
								<div className="mb-6">
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										Brands
									</h3>
									<ul className="list-disc ml-5 text-gray-600 text-sm">
										{brandsArr.map((brand, idx) => (
											<li key={idx}>{brand}</li>
										))}
									</ul>
								</div>
							) : null;
						})()}

						{/* Rooms with Sub-Rooms */}
						{[
							"Bedrooms",
							"Drawing",
							"Bathroom",
							"Balcony",
							"Open Space",
							"Passage",
						].map((areaKey) => {
							const item = bungalow?.electrical?.find(
								(item) => item.area === areaKey
							);
							if (!item || !item.rooms) return null;

							return (
								<Accordion
									key={areaKey}
									title={areaKey}
									isOpen={openAccordions[areaKey.toLowerCase()]}
									onToggle={() => toggleAccordion(areaKey.toLowerCase())}
								>
									<div className="space-y-4">
										{item.rooms.map((room, idx) => (
											<div
												key={idx}
												className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
											>
												<h4 className="text-lg font-medium text-gray-900">
													{room.name}
												</h4>
												<ul className="space-y-1 flex flex-col md:flex-row gap-4 py-2">
													{Object.entries(room.points).map(
														([pointName, count], pointIdx) => (
															<IconSelector
																pointName={pointName}
																key={pointIdx}
																count={count}
															/>
														)
													)}
												</ul>
											</div>
										))}
									</div>
								</Accordion>
							);
						})}

						{/* Other Areas */}
						<div className="mt-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Other Areas
							</h3>
							<div className="space-y-4">
								{bungalow?.electrical
									?.filter((item) => item.points && !item.rooms)
									.map((item, idx) => (
										<div
											key={idx}
											className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
										>
											<h4 className="text-lg font-medium text-gray-900 mb-2 capitalize">
												{item.area}
											</h4>
											<ul className="space-y-1 flex flex-col md:flex-row gap-4 py-2">
												{Object.entries(item.points).map(
													([pointName, count], pointIdx) => (
														<IconSelector
															pointName={pointName}
															key={pointIdx}
															count={count}
														/>
													)
												)}
											</ul>
										</div>
									))}
							</div>
						</div>
					</div>

					{/* Plumbing */}
					<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Plumbing</h2>

						{/* Brands Section */}
						{bungalow?.plumbing?.find((item) => item.materials) && (
							<div className="mb-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									Brands
								</h3>
								<ul className="list-disc ml-5 text-gray-600 text-sm">
									{bungalow?.plumbing
										?.find((item) => item.materials)
										?.brands.map((brand, idx) => (
											<li key={idx}>{brand}</li>
										))}
								</ul>
							</div>
						)}

						{/* Bathrooms Accordion */}
						<Accordion
							title="Bathrooms"
							isOpen={openAccordions.bathroom}
							onToggle={() => toggleAccordion("bathroom")}
						>
							<div className="space-y-4">
								{bungalow?.plumbing
									?.find((item) => item.area === "Bathrooms")
									?.rooms.map((room, idx) => (
										<div
											key={idx}
											className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
										>
											<h4 className="text-lg font-medium text-gray-900 mb-2">
												{room.name}
											</h4>
											<ul className="space-y-1 flex flex-col md:flex-row gap-4 py-2">
												{Object.entries(room.points).map(
													([pointName, count], pointIdx) => (
														<IconSelector
															pointName={pointName}
															key={pointIdx}
															count={count}
														/>
													)
												)}
											</ul>
										</div>
									))}
							</div>
						</Accordion>

						{/* Other Areas */}
						<div className="mt-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Other Areas
							</h3>
							<div className="space-y-4">
								{bungalow?.plumbing
									?.filter((item) => item?.points && !item?.rooms)
									.map((item, idx) => (
										<div
											key={idx}
											className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
										>
											<h4 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
												{item?.area}
											</h4>
											<ul className="space-y-1 flex flex-col md:flex-row gap-4 py-2">
												{Object.entries(item.points).map(
													([pointName, count], pointIdx) => (
														<IconSelector
															pointName={pointName}
															key={pointIdx}
															count={count}
														/>
													)
												)}
											</ul>
										</div>
									))}
							</div>
						</div>
					</div>

					{/* Paints */}
					<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Painting</h2>
						<div>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
								{bungalow?.paint?.map((item, idx) => (
									<div
										key={idx}
										className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
									>
										<p className="text-gray-700 font-medium capitalize">
											{item?.workType}
										</p>
										<p className="text-gray-600 capitalize">
											{item?.brands.join(", ")}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Contact Section */}
					<div className="bg-gray-50 rounded-xl p-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Contact Us
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="flex items-center space-x-4">
								<div className="bg-white p-3 rounded-lg">
									<Phone className="w-6 h-6 text-black" />
								</div>
								<div>
									<div className="text-sm text-gray-600">Phone</div>
									<div className="font-semibold text-black text-xs">
										<a href="tel:+917811831313">+91 7811 831 313</a>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="bg-white p-3 rounded-lg">
									<Mail className="w-6 h-6 text-black" />
								</div>
								<div>
									<div className="text-sm text-gray-600">Email</div>
									<div className="font-semibold text-black text-xs">
										<a href="mailto:info@mydearcitybuilders.com">info@mydearcitybuilders.com</a>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="bg-white p-3 rounded-lg">
									<Clock className="w-6 h-6 text-black" />
								</div>
								<div>
									<div className="text-sm text-gray-600">Working Hours</div>
									<div className="font-semibold text-black text-xs">
										Mon-Sun: 10AM-6:30PM
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Book Now Button */}
				<div className="sticky bottom-6 left-0 right-0 z-50 flex justify-center">
					<button
						onClick={() => setOpen(true)}
						className=" text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold bg-[#1E2023] cursor-pointer"
					>
						Enquiry Now
					</button>
				</div>
			</div>

			{/* Booking Modal */}
			{open && <BookingModal bungalow={bungalow?.title} setOpen={setOpen} />}
		</div>
	);
}

export const BookingModal = ({ bungalow, setOpen }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		visitDate: "",
		visitTime: "",
		notes: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Special handling for phone number
		if (name === "phone") {
			// Remove any non-digit characters
			const digitsOnly = value.replace(/\D/g, "");
			// Limit to 10 digits
			const truncated = digitsOnly.slice(0, 10);
			setFormData((prev) => ({
				...prev,
				[name]: truncated,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch("/api/property-visit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					propertyTitle: bungalow,
					visitDate: formData.visitDate,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to submit booking");
			}

			// Show success message with more details
			toast.success(
				`Booking confirmed for ${formData.visitDate} at ${formData.visitTime}! We'll contact you shortly.`,
				{
					duration: 5000,
					position: "top-center",
				}
			);
			setOpen(false);
		} catch (err) {
			setError(err.message);
			toast.error(
				"Failed to submit booking. Please try again or contact support.",
				{
					duration: 5000,
					position: "top-center",
				}
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
			onClick={() => setOpen(false)}
		>
			<motion.div
				initial={{ scale: 0.95, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 20 }}
				transition={{ type: "spring", duration: 0.5 }}
				className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close Button */}
				<button
					onClick={() => setOpen(false)}
					className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Header */}
				<div className="text-center mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Provisional Details <br /> {bungalow}
					</h2>
					<p className="text-gray-600">
						Schedule a visit to explore this beautiful property
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Full Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							placeholder="Enter your name"
							required
							className="w-full px-4 py-3 text-gray-600 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Enter your email"
							required
							className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50"
						/>
					</div>

					{/* Phone Number Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Phone Number
						</label>
						<div className="relative">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
								+91
							</span>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								placeholder="9876543210"
								required
								pattern="[6-9][0-9]{9}"
								title="Please enter a valid Indian phone number starting with 6, 7, 8, or 9"
								className="w-full pl-12 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50"
							/>
						</div>
						<p className="mt-1 text-sm text-gray-500">
							Enter a valid 10-digit Indian phone number
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Preferred Visit Date
							</label>
							<input
								type="date"
								name="visitDate"
								value={formData.visitDate}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Preferred Time
							</label>
							<select
								name="visitTime"
								value={formData.visitTime}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50"
							>
								<option value="">Select a time</option>
								<option value="morning">Morning (9AM - 12PM)</option>
								<option value="afternoon">Afternoon (12PM - 3PM)</option>
								<option value="evening">Evening (3PM - 6PM)</option>
							</select>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Additional Notes
						</label>
						<textarea
							name="notes"
							value={formData.notes}
							onChange={handleInputChange}
							placeholder="Any specific requirements or questions?"
							rows={3}
							className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 resize-none"
						/>
					</div>

					{error && <div className="text-red-500 text-sm">{error}</div>}

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold bg-[#1E2023] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Submitting..." : "Enquiry Now"}
					</button>
				</form>
			</motion.div>
		</motion.div>
	);
};
