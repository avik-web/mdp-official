"use client";
import { ImagesSlider } from "@/components/ui/HomeHero/images-slider";
import { motion } from "motion/react";
import Link from "next/link";

const slides = [
	{
		image: "/assets/home/banner/banner_1.jpg",
		title: "Create Your Dream Building With Us",
		description:
			"Transform your vision into reality with our expert construction services. We bring innovation, quality, and excellence to every project.",
		stats: [
			{ value: "15+", label: "Years Experience" },
			{ value: "500+", label: "Projects Completed" },
			{ value: "100%", label: "Client Satisfaction" },
			{ value: "24/7", label: "Support Available" },
		],
	},
	{
		image: "/assets/home/banner/banner_2.jpeg",
		title: "Eco-Friendly Homes",
		description:
			"Build sustainable and modern homes with us. Our eco-friendly solutions ensure a better tomorrow.",
		stats: [
			{ value: "10+", label: "Green Projects" },
			{ value: "50+", label: "Awards Won" },
			{ value: "99%", label: "Energy Efficient" },
			{ value: "100%", label: "Renewable Materials" },
		],
	},
	{
		image: "/assets/home/banner/banner_3.jpg",
		title: "Luxury Living Spaces",
		description:
			"Experience luxury and comfort in every corner. We design and build premium living spaces.",
		stats: [
			{ value: "200+", label: "Luxury Homes" },
			{ value: "5 Star", label: "Customer Rating" },
			{ value: "30+", label: "Expert Designers" },
			{ value: "24/7", label: "Concierge Service" },
		],
	},
	{
		image: "/assets/home/banner/banner_1.jpg",
		title: "Innovative Architecture",
		description:
			"Our innovative designs set new standards in architecture. Let us build your future.",
		stats: [
			{ value: "50+", label: "Unique Designs" },
			{ value: "20+", label: "Patents Filed" },
			{ value: "100+", label: "Happy Clients" },
			{ value: "10 Years", label: "Of Innovation" },
		],
	},
];

const images = slides.map((slide) => slide.image);

const Hero = () => {
	return (
		<section className="relative min-h-[80vh] flex items-center overflow-hidden">
			<ImagesSlider
				images={images}
				className="absolute inset-0 w-full h-full"
				overlay
				overlayClassName={undefined}
			>
				{(currentIndex) => {
					const slide = slides[currentIndex];
					return (
						<motion.div
							initial={{ opacity: 0, y: -80 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-50 flex items-center min-h-[80vh]"
						>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
								{/* Left Column - Text Content */}
								<div className="text-left space-y-6 animate-fade-in-up">
									<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
										{slide.title}
									</h1>
									<p className="text-lg sm:text-xl text-gray-200 max-w-2xl">
										{slide.description}
									</p>
									<div className="flex flex-col sm:flex-row gap-4 pt-4">
										<Link
											href="#start"
											className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-[#1E2023] transition-all duration-300 rounded-lg"
										>
											Get Started
										</Link>
									</div>
								</div>

								{/* Right Column - Stats or Features */}
								<div className="hidden lg:block">
									<div className="grid grid-cols-2 gap-6">
										{slide.stats.map((stat, idx) => (
											<div
												key={idx}
												className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white"
											>
												<h3 className="text-3xl font-bold text-primary">
													{stat.value}
												</h3>
												<p className="text-gray-200">{stat.label}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					);
				}}
			</ImagesSlider>
		</section>
	);
};

export default Hero;
