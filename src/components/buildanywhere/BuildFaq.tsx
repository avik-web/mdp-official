"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
	{
		question:
			"What types of construction and renovation services do you offer?",
		answer:
			"MyDearCity Builders provides a full range of services including interior design, structural design, electrical systems, plumbing, waterproofing, termite proofing, painting & putty work, flooring & tiling, door & window installation, renovation, restructuring, and civil works.",
	},
	{
		question: "Do you provide design and planning services?",
		answer:
			"Yes! The company offers professional planning and design services as a foundational stage—turning your ideas into actionable architectural blueprints for your home.",
	},
	{
		question:
			"Can you guide me through local regulatory and compliance requirements?",
		answer:
			"Absolutely. They assist with zoning, land use regulations, and ensuring all plans align with local authority requirements.",
	},
	{
		question: "What quality assurance processes do you follow?",
		answer:
			"They maintain high standards via regular inspections, material testing, and adherence to industry benchmarks, from foundation through finishing.",
	},
	{
		question: "What are your typical project timelines?",
		answer:
			"Residential projects generally take around 6–12 months, while larger or commercial projects may span 12–24 months.",
	},
	{
		question: "Where do you operate?",
		answer:
			"They serve major metropolitan and surrounding regions, offering services across urban and suburban areas.",
	},
];

const BuildFaq = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="py-20 bg-gradient-to-b from-white to-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Frequently Asked <span className="text-primary">Questions</span>
					</h2>
					<p className="text-lg text-gray-600">
						Find answers to common questions about our services, process, and
						commitment to quality.
					</p>
				</div>

				{/* FAQ Grid */}
				<div className="max-w-4xl mx-auto">
					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
							>
								<button
									onClick={() => toggleFaq(index)}
									className="w-full px-6 py-5 text-left focus:outline-none"
								>
									<div className="flex items-center justify-between">
										<h3 className="text-lg sm:text-xl font-semibold text-gray-900">
											{faq.question}
										</h3>
										<ChevronDown
											className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
												openIndex === index ? "transform rotate-180" : ""
											}`}
										/>
									</div>
								</button>
								<div
									className={`px-6 transition-all duration-300 ease-in-out ${
										openIndex === index
											? "max-h-96 opacity-100 pb-6"
											: "max-h-0 opacity-0"
									}`}
								>
									<p className="text-gray-600 leading-relaxed">{faq.answer}</p>
								</div>
							</div>
						))}
					</div>

					{/* CTA Section */}
					<div className="mt-12 text-center">
						<p className="text-gray-600 mb-4">
							Still have questions? We&apos;re here to help!
						</p>
						<Link href="/contact">
							<button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
								Contact Us
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BuildFaq;
