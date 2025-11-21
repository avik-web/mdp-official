"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Show loading state while checking authentication
	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	// Don't show the admin layout on the login page
	if (pathname === "/admin/login") {
		return <>{children}</>;
	}

	// If not authenticated, don't render the admin layout
	if (!session) {
		return null;
	}

	const navigation = [
		{ name: "Dashboard", href: "/admin" },
		{ name: "Contact Responses", href: "/admin/contact-response" },
		{ name: "Property Visits", href: "/admin/property-visits" },
		{ name: "Booking Forms", href: "/admin/booking-forms" },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm print:hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div
								className="flex-shrink-0 flex items-center cursor-pointer"
								onClick={() => router.push("/admin")}
							>
								<div className="relative h-8 w-32">
									<Image
										src="/logo.svg"
										alt="Company Logo"
										fill
										className="object-contain"
										priority
									/>
								</div>
							</div>
							{/* Desktop Navigation */}
							<div className="hidden md:ml-8 md:flex md:space-x-4">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
											pathname === item.href
												? "bg-indigo-50 text-indigo-600"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										}`}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>

						{/* Mobile menu button */}
						<div className="flex items-center md:hidden">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							>
								<span className="sr-only">Open main menu</span>
								{isMobileMenuOpen ? (
									<X className="block h-6 w-6" aria-hidden="true" />
								) : (
									<Menu className="block h-6 w-6" aria-hidden="true" />
								)}
							</button>
						</div>

						{/* Desktop Sign Out Button */}
						<div className="hidden md:flex items-center">
							<button
								onClick={() => signOut({ callbackUrl: "/admin/login" })}
								className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
							>
								Sign out
							</button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`block px-3 py-2 rounded-md text-base font-medium ${
										pathname === item.href
											? "bg-indigo-50 text-indigo-600"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
							<button
								onClick={() => signOut({ callbackUrl: "/admin/login" })}
								className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							>
								Sign out
							</button>
						</div>
					</div>
				)}
			</nav>

			<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
