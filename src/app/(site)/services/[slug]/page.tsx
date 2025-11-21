import { services } from "@/constants/services";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const service = services.find((s) => s.slug === slug);
	if (!service) return notFound();

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">
					{service.title}
				</h1>

				{/* Hero Section */}
				<div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
					<Image
						src={service.image}
						alt={service.title}
						fill
						className="object-cover"
					/>
				</div>

				{/* Main Content */}
				<div className="prose prose-lg max-w-none">
					<p className="text-gray-700 mb-8">{service.description}</p>

					{/* Categories */}
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						{/* Our Services */}
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
						{services.map((s) => (
							<Link
								key={s.slug}
								href={`/services/${s.slug}`}
								className={`text-primary hover:text-primary-dark transition-colors ${
									s.slug === service.slug ? "font-bold" : ""
								}`}
							>
								{s.title}
							</Link>
						))}
					</div>

					{/* Download Section */}
					<div className="bg-white rounded-lg shadow p-6 mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Download</h2>
						<div className="space-y-4">
							<Link
								href="#"
								className="flex items-center text-primary hover:text-primary-dark transition-colors"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
								Our Brochures
							</Link>
							<Link
								href="#"
								className="flex items-center text-primary hover:text-primary-dark transition-colors"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
								Company Details
							</Link>
						</div>
					</div>

					{/* Contact Section */}
					<div className="bg-primary text-white rounded-lg p-8 text-center">
						<h2 className="text-2xl font-bold mb-4">
							Do You Need Help? We&apos;re Here to Support You
						</h2>
						<Link
							href="/contact"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 transition-colors"
						>
							Contact us now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
