import { Metadata } from "next";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
	title: "Privacy Policy - Data Protection & Privacy",
	description:
		"Learn about how MyDearCity Builders protects your privacy and handles your personal information. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.",
	openGraph: {
		title: "Privacy Policy - Data Protection & Privacy",
		description:
			"Learn about how MyDearCity Builders protects your privacy and handles your personal information. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.",
		images: [
			{
				url: "/privacy-policy-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MyDearCity Builders - Privacy Policy",
			},
		],
	},
};

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />

			{/* Hero Section */}
			<section className="bg-[#1E2023] text-white py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Privacy Policy
					</h1>
					<p className="text-xl text-gray-300">Effective Date: May 26, 2025</p>
					<p className="text-xl text-gray-300">Last Revised: May 26, 2025</p>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-xl shadow-lg p-8 text-black">
						<div className="prose prose-lg max-w-none">
							<h2 className="text-2xl font-bold mb-6">
								1. INTRODUCTION AND SCOPE
							</h2>
							<p className="mb-4">
								MyDearCity Builders (&quot;the Company&quot;, &quot;We&quot;,
								&quot;Us&quot;, or &quot;Our&quot;) is committed to maintaining
								the highest standards of data protection and privacy in
								accordance with applicable laws and industry best practices.
								This Privacy Policy (&quot;Policy&quot;) governs the collection,
								processing, storage, and disclosure of personal information
								obtained through our website{" "}
								<a
									href="https://mydearcitybuilders.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline font-semibold text-sky-500"
								>
									mydearcitybuilders.com
								</a>{" "}
								and in connection with our construction and development services
								(&quot;Services&quot;).
							</p>
							<p className="mb-4">
								This Policy applies to all individuals who interact with our
								Company, including prospective clients, current clients, website
								visitors, contractors, suppliers, and other business associates.
								By engaging with our Services or accessing our Website, you
								acknowledge that you have read, understood, and consent to the
								practices described in this Policy.
							</p>

							<h2 className="text-2xl font-bold mb-6">
								2. CONTROLLER INFORMATION
							</h2>
							<p className="mb-4">
								MyDearCity Builders serves as the data controller for personal
								information collected under this Policy. Our registered office
								and principal place of business is located at RA - 31, Tara
								Shankar Sarani, City Center, Durgapur, West Bengal, 713216. For
								data protection inquiries, our designated Data Protection
								Officer can be reached at info@mydearcitybuilders.com.
							</p>

							<h2 className="text-2xl font-bold mb-6">
								3. CATEGORIES OF PERSONAL INFORMATION COLLECTED
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								3.1 Client and Prospect Information
							</h3>
							<p className="mb-4">
								We collect and process the following categories of personal
								information from our clients and prospective clients:
							</p>
							<ul className="list-disc pl-6 mb-6">
								<li>
									<strong>Identity Data:</strong> Full legal name, title, date
									of birth, and government-issued identification numbers (e.g.,
									Passport, Aadhaar, PAN).
								</li>
								<li>
									<strong>Contact Data:</strong> Current residential and
									business addresses, telephone numbers, email addresses, and
									emergency contact details.
								</li>
								<li>
									<strong>Address Information:</strong> Specific mailing and
									physical addresses, including permanent, temporary, and
									correspondence addresses, as provided by the individual.
								</li>
								<li>
									<strong>Financial Data:</strong> Includes credit history,
									audited or unaudited financial statements, banking details,
									payment card information, and tax identification numbers.
								</li>
								<li>
									<strong>Transactional Data:</strong> Includes contract and
									agreement details, payment history, billing records, purchase
									transactions, and related financial activities.
								</li>
							</ul>

							<h3 className="text-xl font-semibold mb-4">
								3.2 Project-Specific Information
							</h3>
							<ul className="list-disc pl-6 mb-6">
								<li>
									<strong>Property Data:</strong> Legal property descriptions,
									site surveys, architectural plans, engineering specifications.
								</li>
								<li>
									<strong>Technical Data:</strong> Construction requirements,
									material specifications, regulatory compliance documentation.
								</li>
								<li>
									<strong>Visual Documentation:</strong> Property photographs,
									site imagery, progress documentation, completion records.
								</li>
								<li>
									<strong>Permit and Regulatory Data:</strong>Building permits,
									inspection records, compliance certifications, regulatory
									correspondence.
								</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								4. LAWFUL BASIS FOR PROCESSING
							</h2>
							<ul className="list-disc pl-6 mb-6">
								<li>Contractual Performance</li>
								<li>Legitimate Business Interests</li>
								<li>Legal Compliance</li>
								<li>Vital Interests</li>
								<li>Explicit Consent</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								5. PURPOSES OF PROCESSING
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								5.1 Service Delivery and Project Management
							</h3>
							<ul className="list-disc pl-6 mb-6">
								<li>
									Executing construction projects and delivering contracted
									services
								</li>
								<li>Coordinating with subcontractors and suppliers</li>
								<li>Managing project schedules and quality control</li>
								<li>Facilitating permit applications and compliance</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								6. INFORMATION SHARING AND DISCLOSURE
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								6.1 Service Providers and Business Partners
							</h3>
							<ul className="list-disc pl-6 mb-6">
								<li>Construction Partners</li>
								<li>Professional Services</li>
								<li>Supply Chain Partners</li>
								<li>Technology Services</li>
								<li>Financial Services</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								7. DATA SECURITY AND PROTECTION MEASURES
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								7.1 Technical Safeguards
							</h3>
							<ul className="list-disc pl-6 mb-6">
								<li>Advanced encryption protocols</li>
								<li>Multi-factor authentication</li>
								<li>Regular security assessments</li>
								<li>Secure data centers</li>
								<li>Automated backup procedures</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								8. DATA RETENTION AND DISPOSAL
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								8.1 Retention Periods
							</h3>
							<ul className="list-disc pl-6 mb-6">
								<li>Construction Records: 10 years post-project completion</li>
								<li>Financial Records: 7 years</li>
								<li>
									Safety and Compliance Records: As required by regulations
								</li>
								<li>Marketing Data: Until consent withdrawal</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								9. INDIVIDUAL RIGHTS AND CHOICES
							</h2>
							<ul className="list-disc pl-6 mb-6">
								<li>Access Rights</li>
								<li>Rectification and Correction</li>
								<li>Erasure and Deletion</li>
								<li>Processing Restrictions</li>
								<li>Data Portability</li>
								<li>Objection Rights</li>
							</ul>

							<h2 className="text-2xl font-bold mb-6">
								15. CONTACT INFORMATION AND COMPLAINTS
							</h2>
							<h3 className="text-xl font-semibold mb-4">
								15.1 General Inquiries
							</h3>
							<p className="mb-4">
								MyDearCity Builders
								<br />
								RA - 31, Tara Shankar Sarani, City Center,
								<br />
								Durgapur, West Bengal – 713216
								<br />
								Phone: +91 78118 31313
								<br />
								Email: info@mydearcitybuilders.com
							</p>

							<h3 className="text-xl font-semibold mb-4">
								15.2 Privacy and Data Protection
							</h3>
							<p className="mb-4">
								Data Protection Officer (DPO)
								<br />
								Phone: +91 78118 31313
								<br />
								Email: info@mydearcitybuilders.com
							</p>

							<h3 className="text-xl font-semibold mb-4">
								15.3 Business Hours
							</h3>
							<p className="mb-4">Monday to Sunday: 10:00 AM – 7:00 PM</p>

							<div className="mt-8 pt-8 border-t border-gray-200">
								<p className="text-sm text-gray-600">
									© {new Date().getFullYear()} MyDearCity Builders. All rights
									reserved.
								</p>
								<p className="text-sm text-gray-600 mt-2">
									This document constitutes a legally binding agreement and
									should be retained for your records.
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
