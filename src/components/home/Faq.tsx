"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
	{
		question: "Do you offer customization for residential projects?",
		answer:
			"Yes, we offer tailored solutions to meet your specific requirements for your dream home, including design customization and material selection. Our team works closely with you to understand your vision and bring it to life with personalized attention to detail.",
	},
	{
		question: "Can you share details of your quality assurance process?",
		answer:
			"Our quality assurance process includes regular inspections, material testing, and adherence to industry standards to ensure the highest quality in every project. We maintain strict quality control at every stage of construction, from foundation to finishing touches.",
	},
	{
		question: "What are your payment plans or financing options?",
		answer:
			"We offer flexible payment plans and can assist you with various financing options to make your dream project more accessible. Our team will work with you to create a payment schedule that suits your budget and requirements.",
	},
	{
		question: "Do you offer post-construction support or maintenance services?",
		answer:
			"Yes, we provide comprehensive post-construction support and maintenance services to ensure your property remains in excellent condition. Our commitment to customer satisfaction extends beyond project completion.",
	},
	{
		question: "How long does a typical construction project take?",
		answer:
			"Project timelines vary depending on the scope and complexity. A typical residential project can take 6-12 months, while larger commercial projects may take 12-24 months. We provide detailed timelines during the planning phase.",
	},
	{
		question: "What areas do you serve?",
		answer:
			"We currently serve major metropolitan areas and surrounding regions. Our team can handle projects in both urban and suburban locations, with a focus on delivering quality construction services wherever you are.",
	},
];

const Faq = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="w-1/2 max-sm:w-full">
			{/* Section Header */}
			<div className="mb-5">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Frequently Asked Questions
				</h1>
				<p className="text-sm text-gray-600 max-w-2xl">
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
							className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
						>
							<button
								onClick={() => toggleFaq(index)}
								className="w-full px-4 py-2 text-left focus:outline-none cursor-pointer"
							>
								<div className="flex items-center justify-between">
									<h3 className="text-xs sm:text-sm font-semibold text-gray-900 cursor-pointer">
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
								<p className="text-gray-600 leading-relaxed text-xs">
									{faq.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Faq;
