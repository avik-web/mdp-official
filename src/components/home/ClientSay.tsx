"use client";

import { useEffect, useRef } from "react";
import Heading from "../global/heading";

const YT_ID = [
	"nW3jF35U0DY",
	"0zuVz_WI93c",
	"xL6QjGo7zIk",
	"V4fDPZrhMsw",
	"vMdcT1GyVhY",
];

type Review = {
	name: string;
	location?: string;
	rating: number;
	comment: string;
};

const REVIEWS: Review[] = [
	{
		name: "Debasish Garai, Durgapur",
		rating: 4,
		comment: "Smooth, transparent",
	},
	{
		name: "S. K. Sinha & Shyamali Sinha, Durgapur",
		rating: 5,
		comment: "Great team, perfect home!",
	},
	{
		name: "S. K. Sengupata & Anjali Sengupta, Kolkata",
		rating: 4,
		comment: "Clear plan, great interiors!",
	},
	{
		name: "Mr. Amal Kumar Dutta, Durgapur",
		rating: 4,
		comment: "Shares his heartfelt journey of owning a stunning 5BHK home",
	},
	{
		name: "Mr. Pallab Mondal & Sayoni Mondal , Durgapur",
		rating: 4,
		comment: "Dream team, dream home",
	},
];

const ClientSay = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		const startAutoScroll = () => {
			scrollIntervalRef.current = setInterval(() => {
				if (scrollContainer) {
					const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
					const nextScrollLeft = scrollLeft + 1;

					if (nextScrollLeft >= scrollWidth - clientWidth) {
						scrollContainer.scrollTo({ left: 0, behavior: "instant" });
					} else {
						scrollContainer.scrollTo({
							left: nextScrollLeft,
							behavior: "instant",
						});
					}
				}
			}, 30);
		};

		const stopAutoScroll = () => {
			if (scrollIntervalRef.current) {
				clearInterval(scrollIntervalRef.current);
				scrollIntervalRef.current = null;
			}
		};

		const handleMouseEnter = () => stopAutoScroll();
		const handleMouseLeave = () => startAutoScroll();

		scrollContainer.addEventListener("mouseenter", handleMouseEnter);
		scrollContainer.addEventListener("mouseleave", handleMouseLeave);

		startAutoScroll();

		return () => {
			stopAutoScroll();
			scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
			scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<section
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
			id="client"
		>
			<Heading
				title="In Our Clients' Words"
				subtitle="Hear from families who found their dream homes with MyDearCity
          Builders stories of trust, joy, and comfort."
			/>

			<div className="relative">
				<div
					ref={scrollContainerRef}
					className="flex overflow-x-auto space-x-8 py-4 [&::-webkit-scrollbar]:hidden"
				>
					{YT_ID.map((id, idx) => {
						const r = REVIEWS[idx];
						if (!r) return null;

						return (
							<article
								key={id}
								className="flex-shrink-0 w-[300px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col"
							>
								<div className="relative w-full bg-black h-[160px] sm:h-[180px]">
									<iframe
										className="absolute inset-0 w-full h-full"
										src={`https://www.youtube.com/embed/${id}?autoplay=0&mute=1&rel=0&modestbranding=1&playsinline=1&loop=0&playlist=${id}&start=0`}
										title={`Client Testimonial ${idx + 1}`}
										allow="autoplay; encrypted-media; fullscreen"
										allowFullScreen
										loading="lazy"
									/>
								</div>

								<div className="p-4 flex flex-col flex-1">
									<p className="font-semibold text-sm text-gray-900 line-clamp-1">
										{r?.name}
									</p>
									<p className="text-gray-700 text-xs leading-relaxed mt-1 flex-1 line-clamp-1">
										{r?.comment}
									</p>
									{r?.rating != null ? (
										<div
											className="flex items-center gap-1 text-yellow-500 mt-2"
											aria-label={`Rating: ${r.rating} out of 5`}
										>
											{Array.from({ length: 5 }).map((_, i) => (
												<span key={i} className="text-sm">
													{i < r.rating ? "★" : "☆"}
												</span>
											))}
										</div>
									) : null}
								</div>
							</article>
						);
					})}
				</div>

				<div className="pointer-events-none absolute inset-y-0 left-0 w-16 " />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-16" />
			</div>

			<div className="text-center mt-12">
				<p className="text-gray-600 mb-6">
					Join Us for the Latest Updates & Exclusive Content!
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<a
						href="https://youtube.com/@mydearcitybuilders?feature=shared"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
					>
						Follow us on YouTube
					</a>
					<a
						href="/contact"
						className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50"
					>
						Contact Us
					</a>
				</div>
			</div>
		</section>
	);
};

export default ClientSay;
