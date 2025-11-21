"use client";
import Image from "next/image";
import Link from "next/link";

export default function ElectricalDesign() {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">
					Electrical Design
				</h1>

				{/* Hero Section */}
				<div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
					<Image
						src="/assets/home/main-banner.jpg"
						alt="Electrical Design"
						fill
						className="object-cover"
					/>
				</div>

				{/* Main Content */}
				<div className="prose prose-lg max-w-none">
					<p className="text-gray-700 mb-8">
						At MyDearCity Builders Pvt Ltd, we understand the importance of a
						reliable electrical system in modern living. With our expertise as
						architects and builders, we deliver comprehensive electrical design
						and installation services, ensuring your home is not only visually
						appealing but also highly functional and safe.
					</p>

					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Why Professional Electrical Design and Installation Matters
					</h2>
					<p className="text-gray-700 mb-8">
						A well-designed electrical system forms the foundation of a
						functional and comfortable home. From powering lighting to running
						essential appliances, it plays a pivotal role in your daily life. At
						MyDearCity Builders Pvt Ltd, our electrical design and installation
						services focus on safety, efficiency, and convenience to meet your
						modern living needs.
					</p>

					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Our Approach to Electrical Design and Installation
					</h2>
					<p className="text-gray-700 mb-4">
						Our multidisciplinary team of architects and electrical engineers
						work together to seamlessly integrate electrical systems into your
						home&apos;s design. Here&apos;s how we approach electrical design
						and installation at MyDearCity Builders Pvt Ltd:
					</p>

					<ul className="list-disc pl-6 mb-8 space-y-2">
						<li>
							<strong>Customized Design:</strong> We begin by understanding your
							lifestyle and unique requirements. Our team customizes the
							electrical design to provide optimal placement of outlets,
							lighting, and wiring, accommodating both traditional needs and
							modern technology demands.
						</li>
						<li>
							<strong>Safety First:</strong> Safety is our top priority. We
							strictly adhere to all relevant codes and regulations to ensure a
							secure and reliable electrical system.
						</li>
						<li>
							<strong>Energy Efficiency:</strong> We prioritize energy-efficient
							solutions to minimize your electricity consumption, reducing both
							your carbon footprint and utility bills.
						</li>
						<li>
							<strong>Smart Home Integration:</strong> If desired, we can
							integrate smart home technology into your electrical system,
							enabling seamless control of lighting, HVAC, security, and even
							entertainment systems with ease.
						</li>
						<li>
							<strong>Seamless Integration:</strong> Our electrical systems are
							seamlessly integrated into your home&apos;s architecture,
							minimizing visual clutter and maximizing aesthetics.
						</li>
					</ul>

					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Types of Electrical Design and Installation Services We Offer
					</h2>
					<ul className="list-disc pl-6 mb-8 space-y-2">
						<li>
							<strong>New Home Construction:</strong> For new homes, we design
							and install electrical systems from the ground up, incorporating
							modern standards for safety, efficiency, and scalability.
						</li>
						<li>
							<strong>Home Renovations:</strong> During home renovations, we
							upgrade your electrical system to meet current standards, improve
							safety, and accommodate new appliances or technology upgrades.
						</li>
						<li>
							<strong>Electrical Panel Upgrades:</strong> We provide electrical
							panel upgrades to increase capacity and ensure your home can
							handle today&apos;s electrical demands.
						</li>
						<li>
							<strong>Lighting Design:</strong> Our experts create customized
							lighting designs that enhance the ambiance and functionality of
							your living spaces, incorporating energy-efficient and smart
							lighting options where desired.
						</li>
					</ul>

					{/* Process Steps */}
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						3 Simple Steps to Process
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className="text-center">
							<div className="relative h-48 mb-4">
								<Image
									src="/assets/home/gate.jpeg"
									alt="Planning"
									fill
									className="object-cover rounded-lg"
								/>
							</div>
							<h3 className="text-xl font-bold mb-2">Planning</h3>
							<p className="text-gray-700">
								We create a detailed roadmap, handle permits, and ensure every
								aspect of the electrical design is planned for seamless
								execution.
							</p>
						</div>
						<div className="text-center">
							<div className="relative h-48 mb-4">
								<Image
									src="/assets/home/gate.jpeg"
									alt="Design"
									fill
									className="object-cover rounded-lg"
								/>
							</div>
							<h3 className="text-xl font-bold mb-2">Design</h3>
							<p className="text-gray-700">
								Our experts craft innovative designs tailored to your vision
								using advanced tools and technology.
							</p>
						</div>
						<div className="text-center">
							<div className="relative h-48 mb-4">
								<Image
									src="/assets/home/gate.jpeg"
									alt="Get Paid"
									fill
									className="object-cover rounded-lg"
								/>
							</div>
							<h3 className="text-xl font-bold mb-2">Get Paid</h3>
							<p className="text-gray-700">
								We deliver exceptional results with transparent invoicing and
								flexible payment options.
							</p>
						</div>
					</div>

					{/* Categories */}
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
						{[
							"Planning & Design",
							"Interior Design",
							"Structural Design",
							"Electrical Design",
							"Plumbing Work",
							"Flooring & Tiling Work",
							"Loan & Legal Assistance",
							"All Civil Works",
							"Local Authority Compliance",
							"Installation of Electrical Systems",
							"Installation of Plumbing Systems",
							"Installation of Doors & Windows",
							"Painting & Putty Work",
							"Renovation & Restructuring",
							"Waterproofing & Termite Proofing",
						].map((category, index) => (
							<Link
								key={index}
								href="#"
								className="text-primary hover:text-primary-dark transition-colors"
							>
								{category}
							</Link>
						))}
					</div>

					{/* Download Section */}
					<div className="bg-white rounded-lg shadow p-6 mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Download</h2>
						<div className="space-y-4">
							<Link
								href="#"
								className="flex items-center text-primary hover:text-primary-dark transition-colors"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
								Our Brochures
							</Link>
							<Link
								href="#"
								className="flex items-center text-primary hover:text-primary-dark transition-colors"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
								Company Details
							</Link>
						</div>
					</div>

					{/* Contact Section */}
					<div className="bg-primary text-white rounded-lg p-8 text-center">
						<h2 className="text-2xl font-bold mb-4">
							Do You Need Help? We&apos;re Here to Support You
						</h2>
						<Link
							href="/contact"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 transition-colors"
						>
							Contact us now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
