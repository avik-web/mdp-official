"use client";
import BuildFaq from "@/components/buildanywhere/BuildFaq";
import MapViewClientWrapper from "@/components/home/MapViewClientWrapper";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import Image from "next/image";

const BuildAnywhere = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />

			{/* Hero Section */}
			<section className="relative h-[500px]">
				<div className="absolute inset-0">
					<Image
						src="/assets/home/side-gate.jpeg"
						alt="About Us"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black opacity-60"></div>
				</div>
				<div className="relative h-full flex items-center justify-center">
					<div className="text-center px-4">
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
							From Anywhere to Everywhere
						</h1>
						<p className="text-xl text-gray-200 max-w-2xl mx-auto">
							We turn your dream home into reality — no matter where you are or
							where you want to be.
						</p>
					</div>
				</div>
			</section>
			<MapViewClientWrapper />
			<BuildFaq />
			<Footer />
		</div>
	);
};

export default BuildAnywhere;
