"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { BackgroundLines } from "../ui/background-lines";
import Heading from "../global/heading";

const shorts = [
	"https://youtube.com/shorts/RHqMn8WMTkM?feature=shared",
	"https://youtube.com/shorts/xlv1uL6lYqY?feature=shared",
	"https://youtube.com/shorts/r5z4WcZPRDo?feature=shared",
	"https://youtube.com/shorts/iSOy7u3jnD0?feature=shared",
	"https://youtube.com/shorts/2n4rbLUrR4g?feature=shared",
	"https://youtube.com/shorts/BdjLttVEMR8?feature=shared",
	"https://youtube.com/shorts/SCpIzunnOXw?feature=shared",
	"https://youtube.com/shorts/N-MGUyqLWIQ?feature=shared",
	"https://youtube.com/shorts/piK0QdRWHYQ?feature=shared",
	"https://youtube.com/shorts/v-0kjDqI6w4?feature=shared",
	"https://youtube.com/shorts/2017KgpcByg?feature=shared",
];

function getYouTubeId(shortUrl: string) {
	const match = shortUrl.match(/shorts\/([\w-]+)/);
	return match && match[1] ? match[1] : null;
}

const YouTubeShortPlayer = dynamic(
	() =>
		Promise.resolve(({ videoId }: { videoId: string }) => (
			<iframe
				className="w-full h-full"
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
				title="YouTube Short"
				frameBorder="0"
				allow="autoplay; encrypted-media; fullscreen"
				allowFullScreen
				loading="lazy"
			/>
		)),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-full bg-gray-100 flex items-center justify-center">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
			</div>
		),
	}
);

const OurAdvertise = () => {
	const [playingIdx, setPlayingIdx] = useState<number>(0);
	const [fade, setFade] = useState<"in" | "out">("in");
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Automatic switching logic
	useEffect(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			handleNext();
		}, 6000);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [playingIdx]);

	const handlePlay = (idx: number) => {
		setFade("out");
		setTimeout(() => {
			setPlayingIdx(idx);
			setFade("in");
		}, 400);
	};

	const handlePrev = () => {
		setFade("out");
		setTimeout(() => {
			setPlayingIdx((prev) => (prev - 1 + shorts.length) % shorts.length);
			setFade("in");
		}, 400);
	};

	const handleNext = () => {
		setFade("out");
		setTimeout(() => {
			setPlayingIdx((prev) => (prev + 1) % shorts.length);
			setFade("in");
		}, 400);
	};

	return (
		<BackgroundLines className="!h-auto min-h-0 relative bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4 overflow-hidden">
			<div className="relative z-10 max-w-5xl mx-auto">
				{/* Header */}
				<Heading
					title="Our Social Shorts"
					subtitle="Watch our latest YouTube and Facebook Shorts to see our work and
						updates in action!"
				/>
				{/* Shorts Slider */}
				<div className="relative w-full flex flex-col items-center justify-center">
					{/* Slider container */}
					<div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-visible">
						{/* Flex row for previews and main (7 slots) */}
						<div className="flex w-full h-full items-center justify-center">
							{[...Array(7)].map((_, i) => {
								// i: 0-2 = prev3, prev2, prev1; 3 = current; 4-6 = next1, next2, next3
								const offset = i - 3;
								const idx =
									(playingIdx + offset + shorts.length) % shorts.length;
								const videoId = getYouTubeId(shorts[idx]);
								// Center/main video
								if (i === 3) {
									return (
										<div
											key={i}
											className="w-full h-full flex items-center justify-center z-20"
										>
											<div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
												<div
													className={`w-full h-full transition-opacity duration-400 ${
														fade === "in" ? "opacity-100" : "opacity-0"
													}`}
												>
													{videoId ? (
														<YouTubeShortPlayer videoId={videoId} />
													) : null}
												</div>
											</div>
										</div>
									);
								}
								// Side previews (hide on mobile, show on lg+)
								return (
									<div
										key={i}
										className="hidden lg:flex h-2/3 items-center justify-center pointer-events-none"
										style={{ width: "10%" }}
									>
										<div className="relative w-full h-full rounded-xl overflow-hidden scale-90 opacity-40 bg-black">
											{videoId && (
												<Image
													src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
													alt={`Short video preview`}
													fill
													className="object-cover w-full h-full"
													sizes="10vw"
													priority={false}
												/>
											)}
										</div>
									</div>
								);
							})}
						</div>
						{/* Navigation arrows */}
						<button
							className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md z-30"
							style={{ transform: "translateY(-50%)" }}
							onClick={handlePrev}
							aria-label="Previous short"
						>
							{/* Left Chevron SVG */}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15 18L9 12L15 6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md z-30"
							style={{ transform: "translateY(-50%)" }}
							onClick={handleNext}
							aria-label="Next short"
						>
							{/* Right Chevron SVG */}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9 6L15 12L9 18"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
					{/* Dots navigation */}
					<div className="flex justify-center gap-2 mt-4">
						{shorts.map((_, idx) => (
							<button
								key={idx}
								className={`w-3 h-3 rounded-full ${
									playingIdx === idx ? "bg-blue-600" : "bg-gray-300"
								} transition-colors`}
								onClick={() => handlePlay(idx)}
								aria-label={`Go to short ${idx + 1}`}
							/>
						))}
					</div>
				</div>
				{/* Call to action */}
				<div className="text-center mt-12">
					<p className="text-gray-600 mb-6">
						Stay connected with us for more updates and exclusive content!
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="https://youtube.com/@mydearcitybuilders?feature=shared"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Subscribe on YouTube
						</Link>
						<Link
							href="/contact"
							className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</div>
		</BackgroundLines>
	);
};

export default OurAdvertise;
