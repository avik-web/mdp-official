"use client";
import {
	Facebook,
	Heart,
	InstagramIcon,
	Mail,
	Menu,
	Phone,
	X,
	Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Nav = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [wishlistCount, setWishlistCount] = useState(0);

	// useRouter to gives the current path
	const pathname = usePathname();

	useEffect(() => {
		// Function to update wishlist count
		const updateWishlistCount = () => {
			const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
			setWishlistCount(wishlist.length);
		};

		// Initial count
		updateWishlistCount();

		// Listen for storage changes
		window.addEventListener("storage", updateWishlistCount);

		// Listen for custom event when wishlist is updated
		window.addEventListener("wishlistUpdated", updateWishlistCount);

		return () => {
			window.removeEventListener("storage", updateWishlistCount);
			window.removeEventListener("wishlistUpdated", updateWishlistCount);
		};
	}, []);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			{/* Top Bar */}
			<div className="bg-[#1E2023] text-white py-2">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
						{/* Left Section - Working Hours and Social Media */}
						<div className="hidden sm:flex items-center space-x-4">
							<span className="text-sm">10:00 am - 06:30 pm</span>
							<div className="hidden sm:flex items-center space-x-4">
								<span>|</span>
								<span>Follow Us:</span>
								<div className="flex space-x-2">
									<Link
										href="https://www.facebook.com/MyDearCityBuilders"
										className="hover:text-primary"
									>
										<Facebook size={20} />
									</Link>
									<Link
										href="https://www.instagram.com/mydearcitybuilders_official/"
										className="hover:text-primary"
									>
										<InstagramIcon size={20} />
									</Link>
									<Link
										href="https://youtube.com/@mydearcitybuilders?feature=shared"
										className="hover:text-primary"
									>
										<Youtube size={20} />
									</Link>
								</div>
							</div>
						</div>

						{/* Right Section - Contact Information */}
						<div className="flex items-center space-x-4">
							<div className="flex items-center gap-2">
								<Phone size={18} />
								<a
									href="tel:+917811831313"
									className="text-sm max-sm:text-xs hover:text-primary transition-colors"
								>
									+91 7811 831 313
								</a>
							</div>
							<div className="flex items-center gap-2">
								<Mail size={18} className="sm:hidden" />
								<a
									href="mailto:info@mydearcitybuilders.com"
									className="text-sm max-sm:text-xs hover:text-primary transition-colors"
								>
									info@mydearcitybuilders.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Header */}
			<header className="bg-white shadow-xs sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<Link href="/" className="flex-shrink-0">
							<Image
								src="/assets/logo-mdc.png"
								alt="MyDearCity Builders"
								width={400}
								height={60}
								className="h-12 w-auto"
							/>
						</Link>
						<nav className="hidden md:flex space-x-8">
							<Link
								href="/"
								className={`${
									pathname === "/"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
							>
								Home
							</Link>

							<Link
								href="/about"
								className={`${
									pathname === "/about"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
							>
								About Us
							</Link>

							<div className="relative group">
								<Link
									href="/mdc-ecohomes"
									className={`${
										pathname === "/mdc-ecohomes"
											? "text-black border-b-2 border-red-400"
											: "text-gray-900 hover:text-primary"
									}`}
								>
									Bungalows
								</Link>
							</div>

							<Link
								href="/services"
								className={`${
									pathname === "/services"
										? "text-black border-b-2 border-red-400"
										: "text-gray-900 hover:text-primary"
								}`}
							>
								Services
							</Link>

							<Link
								href="/gallery"
								className={`${
									pathname === "/gallery"
										? "text-black border-b-2 border-red-400"
										: "text-gray-900 hover:text-primary"
								}`}
							>
								Gallery
							</Link>

							<Link
								href="/contact"
								className={`${
									pathname === "/contact"
										? "text-black border-b-2 border-red-400"
										: "text-gray-900 hover:text-primary"
								}`}
							>
								Contact Us
							</Link>
						</nav>
						<div className="hidden md:flex items-center space-x-4">
							<Link
								href="/wishlist"
								className="relative p-2 text-gray-600 hover:text-primary transition-colors"
								title="View Wishlist"
							>
								<Heart className="w-6 h-6" />
								{wishlistCount > 0 && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
										{wishlistCount}
									</span>
								)}
							</Link>
							{/* Brochure Download Dropdown */}
							{/* <div className="relative group">
								<button
									className="inline-flex items-center px-4 py-2 border border-primary text-base font-medium rounded-md text-[#1E2023] bg-white hover:bg-[#f3f3f3] transition-colors duration-200 focus:outline-none"
								>
									Download Brochure
									<svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
								</button>
								<div className="absolute right-0 mt-0 w-64 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50 border border-gray-100">
									
									<a
										href="/assets/offer/gated-community-brochure.pdf"
										download
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
									>
										Download Gated Community Brochure
									</a>
									<a
										href="/assets/offer/stand-alone-brochure.pdf"
										download
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
									>
										Download Stand Alone Brochure
									</a>
								</div>
							</div> */}
							<a
								href="https://app.mydearcitybuilders.com/auth/login"
								className="inline-flex items-center px-4 py-2 border border-primary text-base font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white transition-colors duration-200"
							>
								Login
							</a>
							<a
								href="https://app.mydearcitybuilders.com/auth/register"
								className="inline-flex items-center px-4 py-2 border border-primary text-base font-medium rounded-md text-white bg-black hover:bg-[#1E2023] hover:text-white transition-colors duration-200"
							>
								Book Now
							</a>
						</div>
						{/* Mobile menu button */}
						<button
							onClick={toggleSidebar}
							className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
						>
							<Menu className="h-6 w-6" />
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Sidebar */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
					isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={toggleSidebar}
			>
				<div
					className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex justify-end p-4">
						<button
							onClick={toggleSidebar}
							className="text-gray-700 hover:text-primary focus:outline-none"
						>
							<X className="h-6 w-6" />
						</button>
					</div>
					<nav className="px-4 py-2 space-y-4">
						<div className="space-y-2">
							<Link
								href="/"
								className={`${
									pathname === "/"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
								onClick={toggleSidebar}
							>
								Home
							</Link>
						</div>

						<div className="space-y-2">
							<Link
								href="/about"
								className={`${
									pathname === "/about"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
								onClick={toggleSidebar}
							>
								About Us
							</Link>
						</div>

						<div className="space-y-2">
							<Link
								href="/mdc-ecohomes"
								className={`${
									pathname === "/mdc-ecohomes"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
								onClick={toggleSidebar}
							>
								Bungalows
							</Link>
						</div>

						<div className="space-y-2">
							<Link
								href="/services"
								className={`${
									pathname === "/services"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
								onClick={toggleSidebar}
							>
								Services
							</Link>
						</div>

						<div className="space-y-2">
							<Link
								href="/gallery"
								className={`${
									pathname === "/gallery"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
								onClick={toggleSidebar}
							>
								Gallery
							</Link>
						</div>

						<div className="space-y-2">
							<Link
								href="/contact"
								className={`${
									pathname === "/contact"
										? "text-black border-b-2 border-red-400 "
										: "text-gray-900 hover:text-primary"
								}`}
								onClick={toggleSidebar}
							>
								Contact Us
							</Link>
						</div>

						<div className="space-y-2">
							<Link
								href="/wishlist"
								className="block text-gray-900 hover:text-primary py-2"
								onClick={toggleSidebar}
							>
								<div className="flex items-center justify-between">
									<span>Wishlist</span>
									{wishlistCount > 0 && (
										<span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
											{wishlistCount}
										</span>
									)}
								</div>
							</Link>
						</div>
						<div className="pt-4 space-y-4 flex flex-col">
							<a
								href="https://app.mydearcitybuilders.com/auth/login"
								className="w-full text-center bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
								onClick={toggleSidebar}
							>
								Login
							</a>
							<a
								href="https://app.mydearcitybuilders.com/auth/register"
								className="w-full text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-50"
								onClick={toggleSidebar}
							>
								Book Now
							</a>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Nav;
