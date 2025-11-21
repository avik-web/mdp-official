import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { services } from "@/constants/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ThreeStepProcess from "@/components/common/ThreeStepProcess";
import { Download, FileText } from "lucide-react";

interface PageProps {
	params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
	const slug = (await params).slug;
	const service = services.find((s) => s.slug === slug);

	if (!service) {
		return notFound();
	}

	// Get related services
	// const relatedServices = service.relatedServices
	// 	? services.filter((s) => service.relatedServices?.includes(s.slug))
	// 	: [];

	return (
		<>
			<Nav />
			<div className="min-h-screen bg-gray-50">
				{/* Hero Section */}
				<div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
					<div className="absolute inset-0 bg-black bg-opacity-40"></div>
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
						<div className="text-white">
							<h1 className="text-5xl font-bold mb-4">{service.title}</h1>
							<p className="text-xl max-w-3xl">{service.description}</p>
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-12">
							{/* Service Image */}
							<div className="bg-white rounded-lg shadow-lg overflow-hidden">
								<Image
									src={service.image}
									alt={service.title}
									width={800}
									height={400}
									className="w-full h-64 object-cover"
								/>
							</div>

							{/* Long Description */}
							{service.longDescription && (
								<div className="bg-white rounded-lg shadow-sm p-8">
									<p className="text-lg text-gray-700 leading-relaxed">
										{service.longDescription}
									</p>
								</div>
							)}

							{/* Significance */}
							{service.significance && (
								<div className="bg-white rounded-lg shadow-sm p-8">
									<h2 className="text-3xl font-bold text-gray-900 mb-6">
										The Significance of Professional {service.title}
									</h2>
									<p className="text-lg text-gray-700 leading-relaxed">
										{service.significance}
									</p>
								</div>
							)}

							{/* Our Approach */}
							{service.approach && (
								<div className="bg-white rounded-lg shadow-sm p-8">
									<h2 className="text-3xl font-bold text-gray-900 mb-6">
										Our Approach to {service.title}
									</h2>
									<p className="text-lg text-gray-700 leading-relaxed mb-6">
										{service.approach}
									</p>
									{service.approachSteps && (
										<div className="space-y-3">
											{service.approachSteps.map((step, index) => {
												const [heading, ...descParts] = step.split(":");
												const description = descParts.join(":").trim();
												return (
													<div key={index}>
														{description ? (
															<>
																<span className="font-bold text-lg text-black">
																	{heading}
																	{":"}
																</span>
																<span className="text-gray-700">
																	{" "}
																	{description}
																</span>
															</>
														) : (
															<span className="text-gray-700">{step}</span>
														)}
													</div>
												);
											})}
										</div>
									)}
								</div>
							)}

							{/* Service Types */}
							{service.serviceTypes && (
								<div className="bg-white rounded-lg shadow-sm p-8">
									<h2 className="text-3xl font-bold text-gray-900 mb-6">
										Types of {service.title} Services We Offer
									</h2>
									<div className="space-y-3">
										{service.serviceTypes.map((type, index) => {
											// Split at the first colon
											const [heading, ...descParts] = type.split(":");
											const description = descParts.join(":").trim();
											return (
												<div key={index}>
													<span className="font-bold text-lg text-black">
														{heading}
														{description ? ":" : ""}
													</span>
													{description && (
														<span className="text-gray-700">
															{" "}
															{description}
														</span>
													)}
												</div>
											);
										})}
									</div>
								</div>
							)}

							{/* 3 Simple Steps Process */}
							<ThreeStepProcess />
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Download Brochure Card */}
							<div className="bg-gray-50 rounded-lg p-6 mb-2">
								<h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 border-red-500 inline-block">
									Download
								</h3>
								<div className="space-y-4 mt-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<span className="text-red-500">
												<FileText size={32} />
											</span>
											<div>
												<div className="font-semibold text-black">
													Our Brochures
												</div>
												<div className="text-xs text-gray-500">Download</div>
											</div>
										</div>
										<a
											href="/assets/brochure.pdf"
											download
											className="bg-black rounded p-2 hover:bg-gray-800 transition-colors"
										>
											<Download size={20} stroke="white" />
										</a>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<span className="text-red-500">
												<FileText size={32} />
											</span>
											<div>
												<div className="font-semibold text-black">
													Company Details
												</div>
												<div className="text-xs text-gray-500">Download</div>
											</div>
										</div>
										<a
											href="/assets/company-details.pdf"
											download
											className="bg-red-500 rounded p-2 hover:bg-red-600 transition-colors"
										>
											<Download size={20} stroke="white" />
										</a>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm p-6">
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									Categories
								</h3>
								<div className="space-y-3">
									{services
										.filter((s) => s.slug !== slug)
										.map((category) => (
											<Link
												key={category.slug}
												href={`/details/${category.slug}`}
												className="block p-3 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-colors"
											>
												<h4 className="font-semibold text-gray-900">
													{category.title}
												</h4>
												<p className="text-sm text-gray-600 mt-1">
													{category.description}
												</p>
											</Link>
										))}
								</div>
							</div>

							{/* Contact CTA */}
							<div className="rounded-xl shadow-2xl overflow-hidden">
								<div
									className="relative h-80 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
									style={{
										backgroundImage: "url(/assets/home/main-banner.jpg)",
										backgroundSize: "cover",
										backgroundPosition: "center",
										backgroundBlendMode: "overlay",
									}}
								>
									{/* Static gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-900/60 to-black/80"></div>

									<div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 text-center">
										{/* Enhanced heading with text effects */}
										<h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-6 leading-tight tracking-tight drop-shadow-lg">
											Do You Need Help?
											<span className="block text-xl md:text-2xl font-bold text-blue-200 mt-2">
												We&apos;re Here to Support You
											</span>
										</h3>

										{/* Logo with enhanced styling */}
										<div className="relative mb-6">
											<Image
												src="/logo2.png"
												alt="MyDearCity Builders Pvt. Ltd."
												width={144}
												height={72}
												className="w-36 h-18 object-contain bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 p-2"
											/>
										</div>

										{/* Enhanced CTA button */}
										<Link
											href="/contact"
											className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white px-2 py-2 rounded-2xl font-bold text-lg transition-colors duration-300 shadow-2xl hover:shadow-red-500/50 border border-red-400/30"
										>
											<span className="flex items-center gap-2 font-black tracking-wide">
												CONTACT US NOW
												<span className="transform transition-transform duration-300 hover:translate-x-1">
													→
												</span>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default page;
