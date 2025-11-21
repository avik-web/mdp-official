"use client";

import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { bungalowsDetails } from "@/constants/bunglows-details";

export default function WishlistPage() {
	const [wishlistedBungalows, setWishlistedBungalows] = useState([]);

	useEffect(() => {
		// Get wishlist from localStorage
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

		// Filter bungalows that are in the wishlist
		const wishlistedItems = bungalowsDetails.filter((bungalow) =>
			wishlist.includes(bungalow.slug)
		);

		setWishlistedBungalows(wishlistedItems);
	}, []);

	const removeFromWishlist = (slug: string) => {
		const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
		const newWishlist = wishlist.filter((item: string) => item !== slug);
		localStorage.setItem("wishlist", JSON.stringify(newWishlist));
		setWishlistedBungalows((prev) =>
			prev.filter((bungalow) => bungalow.slug !== slug)
		);
		toast.success("Removed from wishlist");

		// Dispatch custom event to update wishlist count
		window.dispatchEvent(new Event("wishlistUpdated"));
	};

	return (
		<>
			<Nav />
			<main className="min-h-screen bg-gray-50 py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							My Wishlist
						</h1>
						<p className="text-gray-600">
							Your saved bungalows and dream homes
						</p>
					</div>

					{wishlistedBungalows.length === 0 ? (
						<div className="text-center py-12">
							<Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<h2 className="text-2xl font-semibold text-gray-900 mb-2">
								Your wishlist is empty
							</h2>
							<p className="text-gray-600 mb-6">
								Start adding your favorite bungalows to your wishlist
							</p>
							<Link
								href="/mdc-ecohomes"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1E2023] hover:bg-[#2a2e32] transition-colors"
							>
								Browse Bungalows
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{wishlistedBungalows.map((bungalow) => (
								<div
									key={bungalow.slug}
									className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
								>
									<div className="relative h-48">
										<Image
											src={bungalow.images[0]}
											alt={bungalow.title}
											fill
											className="object-cover"
										/>
									</div>
									<div className="p-6">
										<div className="flex justify-between items-start mb-4">
											<h3 className="text-xl font-semibold text-gray-900">
												{bungalow.title}
											</h3>
											<button
												onClick={() => removeFromWishlist(bungalow.slug)}
												className="text-gray-400 hover:text-red-500 transition-colors"
												title="Remove from wishlist"
											>
												<Trash2 className="w-5 h-5" />
											</button>
										</div>
										<div className="flex items-center text-gray-600 mb-4">
											<span className="mr-4">{bungalow.bhk} BHK</span>
											<span>{bungalow.location}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-2xl font-bold text-[#1E2023]">
												₹{bungalow.price.toLocaleString()}
											</span>
											<Link
												href={`/bungalows/${bungalow.slug}`}
												className="inline-flex items-center px-4 py-2 border border-[#1E2023] text-base font-medium rounded-md text-[#1E2023] hover:bg-[#1E2023] hover:text-white transition-colors"
											>
												View Details
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
