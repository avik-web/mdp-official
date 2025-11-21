import { bungalowsDetails } from "@/constants/bunglows-details";
import services from "@/constants/service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-100 text-gray-600">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<nav className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
					{/* Company Info */}
					<div className="space-y-4">
						<div className="relative w-80 h-50 rounded-2xl md:-left-10">
							<Image
								src="/logo2.png"
								alt="Company Logo"
								fill
								className="object-contain"
								priority
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-black mb-2 mt-10">
								About Company
							</h3>
							<p>
								MyDearCity Builders creates quality spaces with innovation,
								expertise, and customer satisfaction.
							</p>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold text-black mb-4">
							Quick Link
						</h3>
						<ul className="space-y-2">
							{[
								{ name: "Home", href: "/" },
								{ name: "About", href: "/about" },
								{ name: "Services", href: "/services" },
								{ name: "Gallery", href: "/gallery" },
								{ name: "Contact Us", href: "/contact" },
							].map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="hover:text-primary">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services List */}
					<div>
						<h3 className="text-lg font-semibold text-black mb-4">
							Our Services
						</h3>
						<ul className="space-y-2">
							{services.slice().map((service, index) => (
								<li key={index}>
									<Link href={service.slug} className="hover:text-primary">
										{service.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info **/}
					<div>
						<h3 className="text-lg font-semibold text-black mb-4">
							Contact Info
						</h3>
						<ul className="space-y-2">
							<li>
								RA - 31, Tara Shankar Sarani, City Center,
								<br />
								Durgapur, West Bengal, 713216
							</li>
							<li>
								<a
									href="mailto:info@mydearcitybuilders.com"
									className="hover:text-primary"
								>
									info@mydearcitybuilders.com
								</a>
							</li>
							<li>10:00am - 06:30pm</li>
							<li>
								<a href="tel:+917811831313" className="hover:text-primary">
									+91 7811 831 313
								</a>
							</li>
						</ul>
					</div>
				</nav>

				<div className="mt-8 pt-8 border-t border-gray-300">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-4 md:space-y-0">
						<p className="text-center md:text-left">
							© {new Date().getFullYear()} MyDearCity Builders. All Rights
							Reserved | Developed &amp; Maintained by{" "}
							<a
								href="https://www.maityinnovations.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-primary transition-colors"
							>
								Maity Innovations Pvt. Ltd.
							</a>
						</p>

						<div className="flex space-x-6">
							<Link
								href="/privacy-policy"
								className="hover:text-primary transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="hover:text-primary transition-colors"
							>
								Terms & Conditions
							</Link>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-300">
					<h1 className="text-lg font-semibold">Our Bungalows</h1>

					<div className="mt-4 flex items-center flex-wrap gap-2 text-xs text-gray-600">
						{bungalowsDetails.map((item, index) => (
							<Link key={index} href={`/bungalows/${item?.slug}`}>
								{item.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
