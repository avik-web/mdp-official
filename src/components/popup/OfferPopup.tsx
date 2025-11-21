"use client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OfferPopup = () => {
	const [isOpen, setIsOpen] = useState(true);

	// useEffect(() => {
	// 	// Check if popup has been shown before
	// 	const hasSeenPopup = localStorage.getItem("hasSeenOfferPopup");
	// 	if (!hasSeenPopup) {
	// 		setIsOpen(true);
	// 	}
	// }, []);

	const handleClose = () => {
		setIsOpen(false);
		// Set flag in localStorage
		// localStorage.setItem("hasSeenOfferPopup", "true");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div className="bg-white/10 backdrop-blur-md rounded-2xl max-w-md w-full relative overflow-hidden border border-white/20 shadow-2xl">
				{/* Close button */}
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-white hover:text-gray-200 z-10 bg-black/20 rounded-full p-1 backdrop-blur-sm"
				>
					<X size={24} />
				</button>

				{/* Content */}
				<div className="relative">
					{/* Background Image */}
					<div className="relative w-full">
						<Image
							src="/assets/offer/offer.png"
							alt="Special Offer"
							width={800}
							height={500}
							className="object-cover"
						/>
						{/* <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" /> */}
						{/* <div className="absolute inset-0 flex items-center justify-center">
							<h2 className="text-3xl font-bold text-white text-center drop-shadow-lg">
								Special Offer!
							</h2>
						</div> */}
					</div>

					{/* Offer Details */}
					<div className="p-6 bg-white/5 backdrop-blur-md">
						<h3 className="text-xl font-semibold text-white mb-4 drop-shadow-md">
							Rath Yatra Special Launch Offer
						</h3>
						<p className="text-gray-200 mb-6 drop-shadow-sm">
							Enjoy this Shubh Muhurat Offer with a slashed booking amount of just  ₹50,000 <br/> (50% OFF from ₹1 Lakh).
						</p>
						<div className="space-y-4">
							<Link
								href="/elevations"
								className="block w-full text-center bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/30"
								onClick={handleClose}
							>
								Book Now
							</Link>
							<button
								onClick={handleClose}
								className="block w-full text-center text-gray-200 hover:text-white transition-colors cursor-pointer"
							>
								Maybe Later
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferPopup;
