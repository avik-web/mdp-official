import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function OurProjects() {
	const projects = [
		{
			id: 1,
			title: "Select Bungalows",
			description:
				"Expertise in delivering top-notch construction with precision, quality, and transparency.",
			image: "/assets/ecohomes.png",
			link: "/mdc-ecohomes",
		},
		{
			id: 2,
			title: "Select your bungalow anywhere",
			description:
				"From cities to coastlines, your dream home knows no bounds. We're here to help you find it, wherever you go.",
			image: "/assets/dreamhome.png",
			link: "/contact",
		},
	];

	return (
		<div className="bg-gray-50 p-4 mt-10" id="start">
			{/* Header Section */}
			<div className="text-center mb-16">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
					Our Projects
				</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Expertise in delivering top-notch construction with precision,
					quality, and transparency.
				</p>
			</div>

			{/* Projects Grid */}
			<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
				{projects.map((project) => {
					const CardContent = (
						<>
							{/* Project Image */}
							<div className="relative w-full h-64">
								{project.image ? (
									<Image
										src={project.image}
										alt={project.title}
										fill
										style={{ objectFit: "cover" }}
										sizes="(max-width: 768px) 100vw, 50vw"
										priority
									/>
								) : (
									<div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
										<span className="text-gray-600 text-sm font-medium">
											&lt;img/gif&gt;
										</span>
									</div>
								)}
							</div>

							{/* Project Content */}
							<div className="p-8">
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									{project.title}
								</h3>
								<p className="text-gray-600 leading-relaxed mb-5">
									{project.description}
								</p>
								<Link
									href={project.link}
									className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center text-sm sm:text-base"
								>
									See More
								</Link>{" "}
							</div>
						</>
					);

					// if (project.link) {
					// 	return (
					// 		<Link
					// 			key={project.id}
					// 			href={project.link}
					// 			className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
					// 		>
					// 			{CardContent}
					// 		</Link>
					// 	);
					// }

					return (
						<div
							key={project.id}
							className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
						>
							{CardContent}
						</div>
					);
				})}
			</div>
		</div>
	);
}
