"use client";
import MainHeader from "@/components/common/MainHeader";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/global/heading";


const services = [
	{
		title: "Installation of Doors & Windows",
		description:
			"Expert installation of durable and stylish doors and windows.",
		image: "/assets/home/services/doors-windows.jpg",
		slug: "/details/doors-windows",
	},
	{
		title: "Painting & Putty Work",
		description: "Creating the ideal base and finish for long-lasting beauty.",
		image: "/assets/home/services/painting.jpg",
		slug: "/details/painting-putty",
	},
	{
		title: "Renovation & Restructuring",
		description:
			"Ensuring lasting value and modern appeal with every transformation.",
		image: "/assets/home/services/renovation.jpg",
		slug: "/details/renovation-restructuring",
	},
	{
		title: "Waterproofing & Termite Proofing",
		description:
			"Ensuring leak-proof solutions to keep your spaces dry and secure.",
		image: "/assets/home/services/waterproofing.jpg",
		slug: "/details/waterproofing-termite",
	},
	{
		title: "Planning & Design",
		description:
			"Crafting sustainable and functional designs that shape the future.",
		image: "/assets/home/services/planning.jpg",
		slug: "/details/planning-design",
	},
	{
		title: "Interior Design",
		description:
			"Creating interiors that embody luxury, warmth, and character.",
		image: "/assets/home/services/interior.jpg",
		slug: "/details/interior-design",
	},
	{
		title: "Structural Design",
		description:
			"Combining precision and creativity to shape resilient spaces.",
		image: "/assets/home/services/structural.jpg",
		slug: "/details/structural-design",
	},
	{
		title: "Electrical Design",
		description:
			"Delivering safe, reliable, and future-ready electrical systems.",
		image: "/assets/home/services/electrical.jpg",
		slug: "/details/electrical-design",
	},
	{
		title: "Plumbing Work",
		description:
			"Delivering seamless water flow with durable and innovative solutions.",
		image: "/assets/home/services/plumbing.jpg",
		slug: "/details/plumbing-work",
	},
	{
		title: "Flooring & Tiling Work",
		description: "Seamless, durable spaces.",
		image: "/assets/home/services/kitchen-1336160_640.jpg",
		slug: "/details/flooring-tiling",
	},
	{
        title: "Loan & Legal Assistance",
		description: "Support with paperwork & approvals.",
		image: "/assets/home/services/hammer-802301_640.jpg",
		slug: "/details/loan-legal",
	},
	{
		title: "All Civil Works",
		description: "Efficient work from brick to finish.",
		image: "/assets/home/services/All-Civil-Works.jpg",
		slug: "/details/civil-works",
	},
	{
		title: "Local Authority Compliance",
		description: "Compliant with all standards.",
		image: "/assets/home/services/Local-Authority-Compliance.jpg",
		slug: "/details/authority-compliance",
	},
	{
		title: "Installation Of Electrical Systems",
		description: "Strengthening with smart fittings.",
		image: "/assets/home/services/construction-1044574_640.jpg",
		slug: "/details/electrical-installation",
	},
	// {
	// 	title: "Installation Of Plumbing Systems",
	// 	description: "Ensuring professional sanitation systems.",
	// 	image: "/assets/home/services/plumbing.jpg",
	// 	slug: "/details/plumbing-installation",
	// }
	   
];

const stats = [
	{
		id: 1,
		value: "500+",
		label: "Projects Completed",
		icon: CheckCircle2,
	},
	{
		id: 2,
		value: "10+",
		label: "Years Experience",
		icon: Clock,
	},
	{
		id: 3,
		value: "50+",
		label: "Expert Team Members",
		icon: Users,
	},
	{
		id: 4,
		value: "100%",
		label: "Client Satisfaction",
		icon: Award,
	},
];

export default function ServicesPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />

			{/* Hero Section */}
			<section >
				{/* <div className="absolute inset-0">
					<Image
						src="/assets/home/services/construction-1044574_640.jpg"
						alt="Services Hero"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/60" />
				</div>
				<div className="relative h-full flex items-center justify-center text-center px-4">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
							Our Services
						</h1>
						<p className="text-xl text-gray-200">
							Comprehensive construction and renovation solutions tailored to
							your needs
						</p>
					</div>
				</div> */}

				 <MainHeader
					title="Our Services"
					description="Comprehensive construction and renovation solutions tailored to
							your needs."
			     />
			</section>
            
			{/* Stats Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat) => (
							<motion.div
								key={stat.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="text-center"
							>
								<div className="flex justify-center mb-4">
									<stat.icon className="w-12 h-12 text-gray-600" />
								</div>
								<div className="text-3xl font-bold text-gray-900 mb-2">
									{stat.value}
								</div>
								<div className="text-gray-600">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                
					<Heading
				      title="All Services"
				      subtitle="One Place For All Your Trusted Service Requirements "
			        />
					
					<div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{services.map((service, index) => (
							<div
								key={index}
								className="bg-white border rounded-4xl overflow-hidden "
							>
								<div className="relative h-72">
									<Image
										src={service.image}
										alt={service.title}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-6">
									<h3 className="text-xl max-sm:text-lg font-medium text-gray-800 mb-2">
										{service.title}
									</h3>
									<p className="text-gray-500 text-sm mb-4 space-x-4">{service.description}</p>
									<div className="mt-4">
									  <Link href={service.slug}>
										<button
											className="px-4 py-2 border border-primary text-base font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white transition-colors duration-200 cursor-pointer"
										>
											Explore More 
										</button>
									 </Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-primary">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
	

					<Heading
				      title="Ready to Start Your Project?"
				      subtitle="Contact us today for a free consultation and lets bring your
						vision to life"
			        />
					<Link
						href="/contact"
						className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#1E2023] cursor-pointer"
					>
						Get Started
					</Link>
				</div>
			</section>

			<Footer />
		</div>
	);
}
