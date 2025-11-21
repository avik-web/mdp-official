import { services } from "@/constants/services";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						What We Offer
					</h2>
					<p className="mt-4 text-lg text-gray-500">
						Create The Building You Want Here
					</p>
			    </div>
			
				<div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{services.map((service, index) => (
						<div
							key={index}
							className="bg-white rounded-lg shadow-lg overflow-hidden"
						>
							<div className="relative h-48">
								<Image
									src={service.image}
									alt={service.title}
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-medium text-gray-900">
									{service.title}
								</h3>
								<p className="mt-2 text-gray-500">{service.description}</p>
								<div className="mt-4">
									<Link
										href={`/details/${service.slug}`}
										className="text-indigo-600 hover:text-indigo-500"
									>
										Explore More →
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
