"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Heading from "../global/heading";

type Testimonial = {
	text: string;
	name: string;
	role: string;
	avatar: string;
	rating: number;
};

const testimonials: Testimonial[] = [
	{
		text: "I was amazed by the innovative designs and modern amenities MyDearCity Builders incorporated into our new apartment. Their team is skilled, approachable, and always willing to go the extra mile to meet customer needs. I couldn't be happier!",
		name: "Sumit Das",
		role: "Homeowner",
		avatar: "/assets/home/testimonials/avatar1.jpg",
		rating: 5,
	},
	{
		text: "MyDearCity Builders exceeded our expectations by delivering our dream home with outstanding quality and within the promised timeline. Their attention to detail and commitment to customer satisfaction are truly commendable. Highly recommended!",
		name: "Rakesh Mondal",
		role: "Property Investor",
		avatar: "/assets/home/testimonials/avatar2.jpg",
		rating: 4,
	},
	{
		text: "From the initial consultation to the handover, MyDearCity Builders maintained transparency and professionalism throughout the process. They addressed all our concerns and ensured. Thank you for building our perfect home!",
		name: "Chinmoy Samanta",
		role: "Property Owner",
		avatar: "/assets/home/testimonials/avatar3.jpg",
		rating: 4,
	},
	{
		text: "The customer service and communication from MyDearCity Builders were excellent. They kept us updated at every stage, making the entire journey stress-free and enjoyable.",
		name: "Priya Sen",
		role: "First-time Buyer",
		avatar: "/assets/home/testimonials/avatar4.jpg",
		rating: 5,
	},
	{
		text: "Their eco-friendly construction practices and sustainable design features really impressed us. It feels good to live in a home that cares about the environment too.",
		name: "Arindam Chatterjee",
		role: "Environmentalist",
		avatar: "/assets/home/testimonials/avatar5.png",
		rating: 4,
	},
	{
		text: "The interiors and finishing exceeded our expectations. Attention to detail and craftsmanship are visible everywhere. Truly premium quality!",
		name: "Shreya Mukherjee",
		role: "Designer",
		avatar: "/assets/home/testimonials/avatar6.jpg",
		rating: 5,
	},
	{
		text: "They delivered exactly what they promised, without hidden costs or delays. It’s rare to find such reliability in the real estate market today.",
		name: "Debashis Ghosh",
		role: "Retired Professional",
		avatar: "/assets/home/testimonials/avatar7.jpg",
		rating: 5,
	},
];

const useVisibleCount = () => {
	const [count, setCount] = useState(3);
	useEffect(() => {
		const calc = () => {
			const w = window.innerWidth;
			if (w < 640) setCount(1);
			else if (w < 1024) setCount(2);
			else setCount(3);
		};
		calc();
		window.addEventListener("resize", calc);
		return () => window.removeEventListener("resize", calc);
	}, []);
	return count;
};

const Testimonials = () => {
	const visibleCount = useVisibleCount();
	const [startIndex, setStartIndex] = useState(0);
	const touchStartX = useRef<number | null>(null);

	const handlePrev = () => {
		setStartIndex(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length
		);
	};

	const handleNext = () => {
		setStartIndex((prev) => (prev + 1) % testimonials.length);
	};

	const finalTestimonials = useMemo(() => {
		const items: Testimonial[] = [];
		for (let i = 0; i < visibleCount; i++) {
			items.push(testimonials[(startIndex + i) % testimonials.length]);
		}
		return items;
	}, [startIndex, visibleCount]);

	const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		if (touchStartX.current === null) return;
		const delta = e.changedTouches[0].clientX - touchStartX.current;
		if (Math.abs(delta) > 40) (delta > 0 ? handlePrev : handleNext)();
		touchStartX.current = null;
	};

	return (
		<section className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<Heading
					title="What Our Clients Say About Us"
					subtitle="Discover why our clients trust us with their dream projects and how
						we deliver exceptional results every time."
				/>

				{/* Carousel */}
				<div
					className="flex items-center gap-4 sm:gap-6"
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					{/* Prev */}
					<button
						type="button"
						onClick={handlePrev}
						aria-label="Previous testimonials"
						className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
					>
						<ChevronLeft className="h-5 w-5" />
					</button>

					<div
						className={`grid gap-6 sm:gap-8 flex-1 grid-cols-1 ${
							visibleCount >= 2 ? "sm:grid-cols-2" : ""
						} ${visibleCount >= 3 ? "lg:grid-cols-3" : ""}`}
					>
						{finalTestimonials.map((t, i) => (
							<div
								key={`${t.name}-${i}`}
								className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
							>
								{/* Stars */}
								<div
									className="flex gap-1 mb-4"
									aria-label={`${t.rating} star rating`}
								>
									{Array.from({ length: t.rating }).map((_, j) => (
										<Star
											key={j}
											className="h-5 w-5 fill-current text-primary"
											fill="currentColor"
										/>
									))}
								</div>

								{/* Text */}
								<blockquote className="text-gray-600 text-lg mb-6">
									&ldquo;{t.text}&rdquo;
								</blockquote>

								{/* Author */}
								<div className="flex items-center">
									<div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary">
										<Image
											src={t.avatar}
											alt={t.name}
											fill
											className="object-cover"
										/>
									</div>
									<div className="ml-4">
										<p className="text-lg font-semibold text-gray-900">
											{t.name}
										</p>
										<p className="text-sm text-gray-500">{t.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Next */}
					<button
						type="button"
						onClick={handleNext}
						aria-label="Next testimonials"
						className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
					>
						<ChevronRight className="h-5 w-5" />
					</button>
				</div>

				{/* Trust Indicators */}
				<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div className="p-4">
						<h3 className="text-3xl font-bold text-gray-300">98%</h3>
						<p className="text-gray-600">Client Satisfaction</p>
					</div>
					<div className="p-4">
						<h3 className="text-3xl font-bold text-gray-300">500+</h3>
						<p className="text-gray-600">Projects Completed</p>
					</div>
					<div className="p-4">
						<h3 className="text-3xl font-bold text-gray-300">15+</h3>
						<p className="text-gray-600">Years Experience</p>
					</div>
					<div className="p-4">
						<h3 className="text-3xl font-bold text-gray-300">100%</h3>
						<p className="text-gray-600">Quality Assurance</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
