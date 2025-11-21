"use client";

import MainHeader from "@/components/common/MainHeader";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface GalleryImage {
	src: string;
	alt: string;
	category: string;
	description: string;
}

const galleryImages: GalleryImage[] = [
	{
		src: "/assets/gallery/RESIDENTIAL/1.png",
		alt: "Modern Residential Project",
		category: "Residential",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},
	{
		src: "/assets/gallery/RESIDENTIAL/2.png",
		alt: "Modern Residential Project",
		category: "Residential",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},
	
	{
		src: "/assets/gallery/RESIDENTIAL/4.png",
		alt: "Modern Residential Project",
		category: "Residential",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},
	{
		src: "/assets/gallery/RESIDENTIAL/5.png",
		alt: "Modern Residential Project",
		category: "Residential",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},
	{
		src: "/assets/gallery/landscape/6.jpg",
		alt: "Modern Residential Project",
		category: "Landscape",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},
	{
		src: "/assets/gallery/landscape/7.jpg",
		alt: "Modern Residential Project",
		category: "Landscape",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},

	{
		src: "/assets/gallery/landscape/8.jpg",
		alt: "Modern Residential Project",
		category: "Landscape",
		description:
			"A stunning modern residential project showcasing contemporary architecture and design.",
	},


	{
		src: "/assets/gallery/COMMERCIAL.png",
		alt: "Commercial Building Construction",
		category: "Commercial",
		description:
			"State-of-the-art commercial building with innovative design elements.",
	},
	{
		src: "/assets/gallery/INTERIOR.png",
		alt: "Interior Renovation Project",
		category: "Interior",
		description:
			"Complete interior transformation with premium finishes and modern aesthetics.",
	},
	{
		src: "/assets/gallery/exterior/1.png",
		alt: "Architectural Design",
		category: "Exterior",
		description:
			"Award-winning architectural design combining form and function.",
	},
	{
		src: "/assets/gallery/CONSTRUCTION.jpg",
		alt: "Construction Site",
		category: "Construction",
		description: "Our team in action, delivering excellence in construction.",
	},

	{
		src: "/assets/gallery/completed/2.png",
		alt: "Completed Project",
		category: "Completed",
		description: "A beautiful example of our completed project portfolio.",
	},
	{
		src: "/assets/gallery/completed/1.jpg",
		alt: "Completed Project",
		category: "Completed",
		description: "A beautiful example of our completed project portfolio.",
	},
];

const categories = [
	"All",
	...new Set(galleryImages.map((img) => img.category)),
];

export default function GalleryPage() {
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
	const [currentCategory, setCurrentCategory] = useState("All");
	const [filteredImages, setFilteredImages] = useState(galleryImages);

	useEffect(() => {
		if (currentCategory === "All") {
			setFilteredImages(galleryImages);
		} else {
			setFilteredImages(
				galleryImages.filter((img) => img.category === currentCategory)
			);
		}
	}, [currentCategory]);

	const openPreview = (image: GalleryImage) => {
		setSelectedImage(image);
		document.body.style.overflow = "hidden";
	};

	const closePreview = useCallback(() => {
		setSelectedImage(null);
		document.body.style.overflow = "auto";
	}, []);

	const navigateImage = useCallback(
		(direction: "prev" | "next") => {
			if (!selectedImage || filteredImages.length === 0) return;

			const currentIndex = filteredImages.findIndex(
				(img) => img.src === selectedImage.src
			);
			let newIndex;

			if (direction === "next") {
				newIndex = currentIndex + 1 >= filteredImages.length ? 0 : currentIndex + 1;
			} else {
				newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;
			}

			setSelectedImage(filteredImages[newIndex]);
		},
		[selectedImage, filteredImages]
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (selectedImage) {
				if (e.key === "ArrowRight") {
					navigateImage("next");
				} else if (e.key === "ArrowLeft") {
					navigateImage("prev");
				} else if (e.key === "Escape") {
					closePreview();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedImage, navigateImage, closePreview]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />

			{/* Hero Section */}
			<section >
				{/* <div className="absolute inset-0">
					<Image
						src="/assets/home/front-gate.jpeg"
						alt="Project Gallery"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black opacity-60"></div>
				</div>
				<div className="relative h-full flex items-center justify-center">
					<div className="text-center px-4">
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
							Project Gallery
						</h1>
						<p className="text-xl text-gray-200">
							Explore our portfolio of exceptional projects
						</p>
					</div>
				</div> */}
				<MainHeader
					title="Project Gallery"
					description="Explore our portfolio of exceptional projects."
			     />
			</section>

			{/* Gallery Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Category Filter */}
					<div className="flex flex-wrap justify-center gap-4 mb-12">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setCurrentCategory(category)}
								className={`px-6 py-2 rounded-full transition-colors cursor-pointer ${
									currentCategory === category
										? "border text-gray-500"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Image Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{filteredImages.map((image, index) => (
							<div
								key={index}
								className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
								onClick={() => openPreview(image)}
							>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
									<h3 className="text-xl font-semibold mb-2">{image.alt}</h3>
									<p className="text-sm text-gray-200">{image.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Full Screen Preview Modal */}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 animate-fadeIn"
					onClick={closePreview}
				>
					<button
						className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
						onClick={closePreview}
					>
						<X className="w-8 h-8" />
					</button>

					{/* Navigation Buttons */}
					<button
						className="absolute left-4 text-white hover:text-gray-300 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							navigateImage("prev");
						}}
					>
						<ChevronLeft className="w-12 h-12" />
					</button>
					<button
						className="absolute right-4 text-white hover:text-gray-300 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							navigateImage("next");
						}}
					>
						<ChevronRight className="w-12 h-12" />
					</button>

					{/* Image Container */}
					<div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4">
						<Image
							src={selectedImage.src}
							alt={selectedImage.alt}
							fill
							className="object-contain animate-scaleIn"
							onClick={(e) => e.stopPropagation()}
						/>
						{/* Image Info */}
						<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
							<h3 className="text-2xl font-semibold mb-2">
								{selectedImage.alt}
							</h3>
							<p className="text-gray-200">{selectedImage.description}</p>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
}
