import { Metadata } from "next";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
	title: "Terms and Conditions - Service Agreement",
	description:
		"Review MyDearCity Builders' terms and conditions. Our comprehensive service agreement outlines project engagement, pricing, warranties, and client responsibilities for construction services.",
	openGraph: {
		title: "Terms and Conditions - Service Agreement",
		description:
			"Review MyDearCity Builders' terms and conditions. Our comprehensive service agreement outlines project engagement, pricing, warranties, and client responsibilities for construction services.",
		images: [
			{
				url: "/terms-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MyDearCity Builders - Terms and Conditions",
			},
		],
	},
};

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />
			{/* Hero Section */}
			<section className="bg-[#1E2023] text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Terms and Conditions
					</h1>
					<p className="text-xl text-gray-300">Last Updated: May 26, 2025</p>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-xl shadow-lg p-8 text-black">
						<div className="prose prose-lg max-w-none">
							<h2 className="text-2xl font-bold mb-6">ACCEPTANCE OF TERMS</h2>
							<p className="mb-4">
								These Terms and Conditions (&quot;Agreement&quot;) constitute a
								legally binding contract between you (&quot;Client,&quot;
								&quot;Customer,&quot; or &quot;You&quot;) and MyDearCity
								Builders, a construction company (&quot;Company,&quot;
								&quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;). By engaging
								our services, visiting our website at{" "}
								<a
									href="https://mydearcitybuilders.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline font-semibold text-sky-500"
								>
									mydearcitybuilders.com
								</a>{" "}
								or entering into any agreement with us, you acknowledge that you
								have read, understood, and agree to be bound by these terms.
							</p>

							<h2 className="text-2xl font-bold mb-6">COMPANY OVERVIEW</h2>
							<p className="mb-4">
								MyDearCity Builders operates as a full-service construction
								company providing residential, commercial, and industrial
								construction services. Our expertise encompasses new
								construction, renovations, remodeling, and specialized building
								solutions. We maintain all necessary licenses, permits, and
								insurance coverage required for construction operations in our
								service areas.
							</p>

							<h2 className="text-2xl font-bold mb-6">SCOPE OF SERVICES</h2>
							<h3 className="text-xl font-semibold mb-4">
								Construction Services
							</h3>
							<p className="mb-4">
								Our services include but are not limited to:
							</p>
							<ul className="list-disc pl-6 mb-6">
								<li>New residential and commercial construction</li>
								<li>Building renovations and additions</li>
								<li>Interior and exterior remodelling</li>
								<li>Structural repairs and modifications</li>
								<li>Custom building solutions</li>
								<li>Project management and supervision</li>
								<li>Design-build services</li>
								<li>Maintenance and warranty services</li>
							</ul>

							<h3 className="text-xl font-semibold mb-4">
								Service Limitations
							</h3>
							<p className="mb-4">Services are provided subject to:</p>
							<ul className="list-disc pl-6 mb-6">
								<li>Availability of qualified personnel and subcontractors</li>
								<li>Procurement of necessary materials and equipment</li>
								<li>Obtaining required permits and regulatory approvals</li>
								<li>Site accessibility and working conditions</li>
								<li>Client compliance with project requirements</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								PROJECT ENGAGEMENT PROCESS
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								Initial Consultation
							</h3>
							<p className="mb-4">
								All projects begin with a comprehensive consultation to assess
								requirements, site conditions, and project feasibility. Initial
								consultations may involve site visits, preliminary assessments,
								and discussion of client objectives.
							</p>

							<h3 className="text-xl font-semibold mb-4">
								Proposal and Contract
							</h3>
							<p className="mb-4">
								Following consultation, we provide detailed proposals outlining:
							</p>
							<ul className="list-disc pl-6 mb-6">
								<li>Project scope and specifications</li>
								<li>Materials and labour requirements</li>
								<li>Timeline and milestones</li>
								<li>Cost breakdown and payment schedule</li>
								<li>Terms specific to the project</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">PRICING AND PAYMENT</h2>
							<h3 className="text-xl font-semibold mb-4">Cost Structure</h3>
							<p className="mb-4">Project costs are determined based on:</p>
							<ul className="list-disc pl-6 mb-6">
								<li>Labour requirements and skilled trade involvement</li>
								<li>Material specifications and current market pricing</li>
								<li>Equipment needs and specialized tool requirements</li>
								<li>Permit fees and regulatory compliance costs</li>
								<li>Project complexity and timeline considerations</li>
							</ul>

							<h3 className="text-xl font-semibold mb-4">Payment Terms</h3>
							<p className="mb-4">Standard payment structure includes:</p>
							<ul className="list-disc pl-6 mb-6">
								<li>
									Initial deposit upon contract signing (typically 10-20%)
								</li>
								<li>Progress payments tied to completion milestones</li>
								<li>Material costs may require advance payment</li>
								<li>Final payment upon project completion and acceptance</li>
								<li>Retention amounts as specified in individual contracts</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								CLIENT RESPONSIBILITIES
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								Site Access and Preparation
							</h3>
							<p className="mb-4">Clients must ensure:</p>
							<ul className="list-disc pl-6 mb-6">
								<li>Unobstructed site access for personnel and equipment</li>
								<li>Utilities are properly located and marked</li>
								<li>Existing structures are cleared as required</li>
								<li>Adequate parking and staging areas are available</li>
								<li>
									Compliance with neighbourhood and community requirements
								</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								WARRANTIES AND GUARANTEES
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								Workmanship Warranty
							</h3>
							<p className="mb-4">We provide warranties on:</p>
							<ul className="list-disc pl-6 mb-6">
								<li>Structural work: Two years from completion</li>
								<li>General construction: One year from completion</li>
								<li>Specialized trades work: Per industry standards</li>
								<li>Corrections of defects in workmanship</li>
								<li>Compliance with building codes and permits</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">CONTACT INFORMATION</h2>
							<div className="bg-gray-50 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-4">
									MyDearCity Builders
								</h3>
								<p className="mb-4">
									Main Office:
									<br />
									MyDearCity Builders
									<br />
									RA - 31, Tara Shankar Sarani, City Center,
									<br />
									Durgapur, West Bengal – 713216
									<br />
									Phone: +91 78118 31313
									<br />
									Email: info@mydearcitybuilders.com
									<br />
									Website:{" "}
									<a
										href="https://mydearcitybuilders.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary underline font-semibold text-sky-500"
									>
										mydearcitybuilders.com
									</a>
								</p>
								<p className="mb-4">
									<strong>Business Hours:</strong>
									<br />
									Monday to Sunday: 10:00 AM to 7:00 PM
								</p>
							</div>

							<div className="mt-8 pt-8 border-t border-gray-200">
								<p className="text-sm text-gray-600">
									EFFECTIVE DATE: These Terms and Conditions are effective as of
									May 26, 2025 and supersede all previous versions.
								</p>
								<p className="text-sm text-gray-600 mt-2">
									ACKNOWLEDGMENT: By engaging our services, you acknowledge
									receipt and acceptance of these terms.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
