import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
	return (
		<section className="py-16 bg-white mt-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					{/* Left: Text and Features */}
					<div>
						<div className="text-left md:text-left">
							<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
								Building Your Dreams
							</h2>
							<p className="mb-6 text-lg text-gray-500">
								At MyDearCity Builders Private Limited, we transform your
								architectural dreams into reality. Whether you&apos;re
								envisioning a modern home, a sprawling commercial complex, or a
								bespoke retail space, we&apos;re here to bring your vision to
								life.
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="flex items-start space-x-4">
								<Image
									src="/about/feature1.png"
									alt="Personalized Solutions"
									width={56}
									height={56}
									className="rounded-lg shadow"
								/>
								<div>
									<h3 className="text-lg font-semibold text-primary mb-1">
										Personalized Solutions
									</h3>
									<p className="text-gray-600 text-sm">
										Tailored building solutions for every vision.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-4">
								<Image
									src="/about/feature2.png"
									alt="Quality & Expertise"
									width={56}
									height={56}
									className="rounded-lg shadow"
								/>
								<div>
									<h3 className="text-lg font-semibold text-primary mb-1">
										Quality & Expertise
									</h3>
									<p className="text-gray-600 text-sm">
										Unmatched quality and years of experience.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-4">
								<Image
									src="/about/feature3.png"
									alt="Sustainable & Timely"
									width={56}
									height={56}
									className="rounded-lg shadow"
								/>
								<div>
									<h3 className="text-lg font-semibold text-primary mb-1">
										Sustainable & Timely
									</h3>
									<p className="text-gray-600 text-sm">
										Eco-friendly practices and efficient execution.
									</p>
								</div>
							</div>
						</div>
						<div className="mt-8">
							<Link
								href="/about"
								className="text-primary hover:underline font-medium"
							>
								Read more →
							</Link>
						</div>
					</div>
					{/* Right: Main Image */}
					<div className="flex justify-center">
						<Image
							src="/assets/home/gate.jpeg"
							alt="gate-img"
							width={600}
							height={700}
							className="rounded-lg object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
