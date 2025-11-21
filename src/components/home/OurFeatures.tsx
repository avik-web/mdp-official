"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const featuresData = [
	{
		src: "/assets/features/quality_control.png",
		title: "Quality Control",
		description: "Over 470+ expert checks to ensure top construction standards",
	},
	{
		src: "/assets/features/transaction.png",
		title: "Safe Payment",
		description:
			"No advance required pay securely only after the work completed",
	},
	{
		src: "/assets/features/transparency.png",
		title: "Transparency",
		description:
			"Get clear quotations with full online tracking of your project",
	},
	{
		src: "/assets/features/zero_delays.png",
		title: "On-Time Delivery",
		description: "Strict zero-delay policy to deliver your project as promised",
	},
	{
		title: "Trusted Materials",
		description:
			"Only certified, high-quality materials are used in every project",
		src: "/assets/features/trusted-materials.png",
	},
	{
		title: "Customer Support",
		description: "Support throughout your project for peace of mind",
		src: "/assets/features/customer-support.png",
	},
];

export default function OurFeatures() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startAutoScroll = useCallback(() => {
		const el = scrollContainerRef.current;
		if (!el || intervalRef.current) return;

		intervalRef.current = setInterval(() => {
			const { scrollLeft, scrollWidth, clientWidth } = el;
			const next = scrollLeft + 1;
			if (next >= scrollWidth - clientWidth) {
				el.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
			} else {
				el.scrollTo({ left: next, behavior: "instant" as ScrollBehavior });
			}
		}, 20);
	}, []);

	const stopAutoScroll = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	useEffect(() => {
		const el = scrollContainerRef.current;
		if (!el) return;

		const handleEnter = () => stopAutoScroll();
		const handleLeave = () => startAutoScroll();

		el.addEventListener("mouseenter", handleEnter);
		el.addEventListener("mouseleave", handleLeave);

		startAutoScroll();

		return () => {
			stopAutoScroll();
			el.removeEventListener("mouseenter", handleEnter);
			el.removeEventListener("mouseleave", handleLeave);
		};
	}, [startAutoScroll, stopAutoScroll]);

	return (
		<section className="relative w-1/2 max-sm:w-full px-4 sm:px-6 lg:px-8">
			<div className="mb-5">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Our Promise, Your Peace of Mind
				</h1>
				<p className="text-sm text-gray-600 max-w-2xl">
					We ensure lasting quality, complete safety, and on-time delivery —
					building trust with every home.
				</p>
			</div>

			<div className="relative">
				<div
					ref={scrollContainerRef}
					className="flex gap-6 pb-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
				>
					{featuresData.map((item, index) => (
						<article
							key={index}
							className="shrink-0 w-[300px]! sm:w-[24rem] bg-white/70 rounded-xl border border
							-slate-200/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300"
						>
							<div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center">
								<Image
									src={item.src}
									alt={item.title}
									className="object-cover mt-4"
									width={200}
									height={200}
								/>
							</div>
							<div className="p-4 text-center">
								<h3 className="text-lg font-semibold tracking-tight text-slate-900">
									{item.title}
								</h3>
								<p className="mt-1 text-slate-600 leading-relaxed">
									{item.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
