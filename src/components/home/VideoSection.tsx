"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BackgroundLines } from "../ui/background-lines";
import Heading from "../global/heading";

const YOUTUBE_VIDEO_ID = "0jEvSgq3d0E";

// Lazy load the YouTube iframe to improve initial page load
const YouTubePlayer = dynamic(
	() =>
		Promise.resolve(({ videoId }: { videoId: string }) => (
			<iframe
				className="w-full h-full"
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
				title="Company Introduction Video"
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
				<div className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
			</div>
		),
	}
);

export default function VideoSection() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handlePlayClick = useCallback(() => {
		setIsLoading(true);
		// Small delay for smooth transition
		setTimeout(() => {
			setIsPlaying(true);
			setIsLoading(false);
		}, 300);
	}, []);

	return (
		<BackgroundLines className="relative bg-gradient-to-br from-slate-50 to-gray-100 py-6 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-6 overflow-hidden">
			<div className="relative z-10 w-full max-w-4xl mx-auto">
				{/* Header */}
					<Heading
						title="Our Popular Project"
						subtitle="Discover how we are transforming the industry through innovation
						and dedication."
					/>

				{/* Video Container */}                                                                                                                                                                       
				<div className="relative group w-full">
					<div className="relative w-full mx-auto rounded-lg sm:rounded-2xl overflow-hidden shadow-md sm:shadow-2xl">
						{/* Mobile optimized container */}
						<div className="w-full h-0 pb-[56.25%] relative">
							{" "}
							{/* 16:9 aspect ratio using padding-bottom */}
							{!isPlaying ? (
								<>
									{/* Thumbnail with overlay */}
									<div className="absolute inset-0 w-full h-full">
										<Image
											src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
											width={1200}
											height={675}
											alt="Watch our company introduction video"
											className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
											loading="eager"
											priority
											quality={90}
											placeholder="blur"
											blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
										/>

										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

										{/* Loading state */}
										{isLoading && (
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
												<div className="w-6 h-6 sm:w-12 sm:h-12 border-2 sm:border-4 border-white border-t-transparent rounded-full animate-spin"></div>
											</div>
										)}
									</div>

									{/* Play button */}
									<button
										className="absolute inset-0 flex items-center justify-center outline-none group/btn z-20 w-full h-full"
										onClick={handlePlayClick}
										aria-label="Play video"
										disabled={isLoading}
									>
										<div className="relative flex items-center justify-center">
											{/* Ripple effect */}
											<div className="absolute inset-0 bg-white/20 rounded-full animate-ping w-12 h-12 sm:w-20 sm:h-20"></div>
											<div className="absolute inset-0 bg-white/10 rounded-full animate-pulse w-12 h-12 sm:w-20 sm:h-20"></div>

											{/* Main play button */}
											<div className="relative bg-white/95 backdrop-blur-sm rounded-full p-3 sm:p-5 lg:p-6 shadow-lg transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white z-30">
												<svg
													width="20"
													height="20"
													viewBox="0 0 48 48"
													fill="none"
													className="ml-0.5 transition-colors duration-300 sm:w-8 sm:h-8 lg:w-12 lg:h-12"
												>
													<polygon
														points="18,14 34,24 18,34"
														fill="currentColor"
														className="text-red-500 group-hover/btn:text-red-600"
													/>
												</svg>
											</div>
										</div>

										{/* Play text */}
										<div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
											<span className="hidden sm:inline-block bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												Click to Play
											</span>
										</div>
									</button>

									{/* Video duration badge */}
									<div className="absolute bottom-1 sm:bottom-4 right-1 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-medium z-10">
										<svg
											className="inline w-2.5 h-2.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="hidden sm:inline">HD Quality</span>
										<span className="sm:hidden">HD</span>
									</div>
								</>
							) : (
								/* YouTube iframe */
								<div className="absolute inset-0 w-full h-full">
									<YouTubePlayer videoId={YOUTUBE_VIDEO_ID} />
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Call to action - responsive layout */}
				{!isPlaying && (
					<div className="text-center mt-6 sm:mt-10 lg:mt-12">
						<p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-6 px-2">
							Get inspired by our journey and vision for the future
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 px-2">
							<Link
								href="/mdc-ecohomes"
								className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center text-sm sm:text-base"
							>
								Book Now
							</Link>
							<Link
								href="/contact"
								className="w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 text-center text-sm sm:text-base"
							>
								Contact Us
							</Link>
						</div>
					</div>
				)}
			</div>
		</BackgroundLines>
	);
}
