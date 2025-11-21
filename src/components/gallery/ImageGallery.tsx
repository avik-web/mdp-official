"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryImage {
	src: string;
	alt: string;
}

interface ImageGalleryProps {
	images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

	const openPreview = (image: GalleryImage) => {
		setSelectedImage(image);
		document.body.style.overflow = "hidden";
	};

	const closePreview = () => {
		setSelectedImage(null);
		document.body.style.overflow = "auto";
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{images.map((image, index) => (
					<div
						key={index}
						className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
						onClick={() => openPreview(image)}
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
					</div>
				))}
			</div>

			{/* Full Screen Preview Modal */}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 animate-fadeIn"
					onClick={closePreview}
				>
					<button
						className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
						onClick={closePreview}
					>
						<X className="w-8 h-8" />
					</button>
					<div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4">
						<Image
							src={selectedImage.src}
							alt={selectedImage.alt}
							fill
							className="object-contain animate-scaleIn"
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
				</div>
			)}
		</>
	);
} 