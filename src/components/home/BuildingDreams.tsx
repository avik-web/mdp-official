import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const BuildingDreams = () => {
	const features = [
		"Expert architectural design",
		"Premium building materials",
		"Timely project completion",
		"Professional team",
		"Modern amenities",
		"Eco-friendly solutions",
	];

	return (
		<section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-72 h-72 bg-gray-900/5 rounded-full blur-3xl" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Column - Image */}
					<div className="relative h-[450px] lg:h-[650px] rounded-3xl overflow-hidden group">
						<Image
							src="/assets/home/gate.jpeg"
							alt="Building Dreams"
							fill
							className="object-cover transition-all duration-700 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
							<p className="text-lg font-light">
								Experience luxury living at its finest
							</p>
						</div>
					</div>

					{/* Right Column - Content */}
					<div className="space-y-10">
						<div className="space-y-6">
							<div className="inline-block">
								<span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium text-gray-600">
									Premium Living
								</span>
							</div>
							<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
								Building Your{" "}
								<span className="text-primary relative">
									Dreams
									<span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
								</span>{" "}
								Into Reality
							</h2>
							<p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
								We transform your vision into exceptional living spaces with
								unmatched expertise and dedication. Every project is a testament
								to our commitment to quality and innovation.
							</p>
						</div>

						{/* Features Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-black">
							{features.map((feature, index) => (
								<div
									key={index}
									className="flex items-center space-x-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
								>
									<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
										<CheckCircle2 className="h-5 w-5 text-primary" />
									</div>
									<span className="text-gray-700 font-medium">{feature}</span>
								</div>
							))}
						</div>

						{/* CTA Section */}
						{/* <div className="flex flex-col sm:flex-row gap-5 pt-8">
							<Link
								href="/contact"
								className="group flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-[#1E2023] hover:bg-[#1E2023]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								Start Your Project
								<ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								href="/gallery"
								className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-xl"
							>
								View Our Work
							</Link>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default BuildingDreams;
