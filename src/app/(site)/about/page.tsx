import MainHeader from "@/components/common/MainHeader";
import Heading from "@/components/global/heading";
import OurAdvertise from "@/components/home/OurAdvertise";
import Testimonials from "@/components/home/Testimonials";
import VideoSection from "@/components/home/VideoSection";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { Award, Building2, CheckCircle2, Target, Users } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "About Us - Our Story & Mission",
	description:
		"Learn about MyDearCity Builders' journey, mission, and vision. With over 10 years of experience, we've completed 500+ projects and served 1000+ happy clients with excellence in construction.",
	openGraph: {
		title: "About Us - Our Story & Mission",
		description:
			"Learn about MyDearCity Builders' journey,  mission, and vision. With over 10 years of experience, we've completed 500+ projects and served 1000+ happy clients with excellence in construction.",
		images: [
			{
				url: "/about-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MyDearCity Builders - About Us",
			},
		],
	},
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />
         
			{/* Hero Section */}
			{/* <section className="relative h-[500px]">
				<div className="absolute inset-0">
					<Image
						src="/assets/home/banner/banner_2.jpeg"
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
							Building Dreams, Creating Reality
						</h1>
						<p className="text-xl text-gray-200 max-w-2xl mx-auto">
							With over a decade of excellence in construction and renovation,
							we{"'"}ve been transforming spaces and lives across the nation.
						</p>
					</div>
				</div>
			</section> */}
            <MainHeader
			  title="Building Trust,Shaping Futures"
			  description="Trusted builders of sustainable and modern homes."
			/>
	

			{/* Our Story Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="relative h-[400px] rounded-xl overflow-hidden">
							<Image
								src="/assets/home/front-gate.jpeg"
								alt="Our Story"
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
								Our Story
							</h2>
							<p className="text-gray-600 mb-6 leading-relaxed">
								Founded in 2021, MyDearCity Builders began with a simple
								mission: to revolutionize the construction industry through
								transparency, quality, and customer satisfaction. What started
								as a small team of passionate builders has grown into one of the
								most trusted names in construction and renovation.
							</p>
							<p className="text-gray-600 leading-relaxed mb-6">
								Today, we stand proud of our journey, having successfully
								completed hundreds of projects while maintaining the highest
								standards of quality and safety. Our commitment to excellence
								has earned us the trust of countless clients and numerous
								industry accolades.
							</p>
							<p className="text-gray-600 leading-relaxed">
								At MyDearCity Builders, we believe that great construction is
								built on strong relationships, innovative solutions, and a
								relentless focus on detail.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision Section */}
			<section className="py-20 bg-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div className="bg-white p-8 rounded-xl shadow-lg">
							<div className="flex items-center mb-6">
								<Target className="w-8 h-8  mr-4 text-black" />
								<h3 className="text-3xl font-bold text-gray-900">
									Our Mission
								</h3>
							</div>
							<p className="text-gray-600 leading-relaxed">
								To deliver exceptional construction and renovation services that
								exceed client expectations, while maintaining the highest
								standards of safety, quality, and sustainability.
							</p>
						</div>
						<div className="bg-white p-8 rounded-xl shadow-lg">
							<div className="flex items-center mb-6">
								<Building2 className="w-8 h-8 text-black mr-4" />
								<h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
							</div>
							<p className="text-gray-600 leading-relaxed">
								To be the most trusted and innovative construction company,
								setting new standards in the industry and creating spaces that
								inspire and endure.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<Heading
						title="Why Choose Us"
						subtitle="We build quality, comfortable, and affordable homes—crafted with trust, smart locations, and care."
					/>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<CheckCircle2 className="w-12 h-12 text-black mb-4" />
							<h3 className="text-xl font-semibold mb-4 text-black">
								Quality Assurance
							</h3>
							<p className="text-gray-600">
								We maintain the highest standards of quality in every project,
								using premium materials and expert craftsmanship.
							</p>
						</div>
						<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<Users className="w-12 h-12 text-black mb-4" />
							<h3 className="text-xl font-semibold mb-4 text-black">
								Expert Team
							</h3>
							<p className="text-gray-600">
								Our team consists of experienced professionals who are
								passionate about delivering excellence.
							</p>
						</div>
						<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
							<Award className="w-12 h-12 text-black mb-4 " />
							<h3 className="text-xl font-semibold mb-4 text-black">
								Award-Winning Service
							</h3>
							<p className="text-gray-600">
								Recognized for our outstanding work and commitment to customer
								satisfaction.
							</p>
						</div>
					</div>
				</div>
			</section>

			<VideoSection />

			<OurAdvertise />

			<Testimonials />

			{/* CTA Section */}
			<section className="py-20 bg-primary">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<Heading
						title="Ready to Start Your Project?"
						subtitle="Lets work together to bring your vision to life. Contact us
						today for a free consultation."
					/>
					<a
						href="/contact"
						className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#1E2023] cursor-pointer"
					>
						Get in Touch
					</a>
				</div>
			</section>

			<Footer />
		</div>
	);
}
