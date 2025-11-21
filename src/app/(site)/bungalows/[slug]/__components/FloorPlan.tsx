"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FloorPlanDesign = ({ image, title, link, setOpenPlan }) => {
	return (
		<motion.div
			className="fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center p-10 bg-black/60 backdrop-blur-sm"
			onClick={() => setOpenPlan(false)}
		>
			<motion.div
				className="bg-white rounded-2xl p-8 shadow-2xl relative max-w-7xl w-full max-h-[90vh] max-sm:h-[50vh] overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={() => setOpenPlan(false)}
					className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
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
				<h2 className="flex items-center justify-center gap-4 text-2xl max-sm:text-sm font-bold text-gray-900 text-center mb-6 sticky top-5 bg-white py-2 z-5">
					{title}
					{link && (
						<Link
							href={link}
							className="px-4 py-2 border border-primary text-base font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white cursor-pointer"
						>
							Download
						</Link>
					)}
				</h2>

				<div className="relative w-full h-[500px] max-sm:h-auto flex justify-center">
					<Image
						src={image}
						alt={`Zoomed ${title} floor plan`}
						width={800}
						height={500}
						className="object-contain max-w-full h-auto"
						priority
					/>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default FloorPlanDesign;
