import BrowsePlans from "@/components/browse-plans/BrowsePlans";
import ClientSay from "@/components/home/ClientSay";
import LatestHero from "@/components/home/LatestHero";
import Partners from "@/components/home/Partners";
import Solution from "@/components/home/Solution";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	// title: "Premium Home Construction & Design",
	description:
		"Discover exceptional home construction services with MyDearCity Builders. From luxury bungalows to custom designs, we bring your dream home to life with expert craftsmanship and attention to detail.",
	openGraph: {
		title: "Premium Home Construction & Design",
		description:
			"Discover exceptional home construction services with MyDearCity Builders. From luxury bungalows to custom designs, we bring your dream home to life with expert craftsmanship and attention to detail.",
		images: [
			{
				url: "/home-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MyDearCity Builders - Premium Home Construction",
			},
		],
	},
};

export default function Home() {
	return (
		<div className="bg-white">
			<Nav />
			{/* <Hero /> */}
			<LatestHero />
			{/* <OurServices /> */}
			{/* <Elevations /> */}
			<BrowsePlans />
			<Partners />
			{/* <BuildingDreams /> */}
			{/* <About /> */}
			{/* <FeaturedBunglaws /> */}
			{/* <OurProjects /> */}
			{/* <VideoSection /> */}
			{/* <ProjectLocations /> */}
			{/* <Services /> */}
			{/* <ClientPeach /> */}
			<ClientSay />
			{/* <OurAdvertise /> */}
			{/*<MapViewClientWrapper /> */}
			{/* <Testimonials /> */}
			{/* <Faq /> */}
			<Solution />
			{/* <Contact /> */}
			{/* CTA Section */}
			<div className="my-12 text-center">
				<p className="text-gray-600 mb-4">
					Still have questions? We&apos;re here to help!
				</p>
				<Link href="/contact">
					<button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
						Contact Us
					</button>
				</Link>
			</div>
			<Footer />
		</div>
	);
}
