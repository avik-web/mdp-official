import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Us - Get in Touch",
	description:
		"Contact mydearcitybuilderss for your construction and renovation needs. Reach out to our expert team through phone, email, or visit our office in Durgapur, West Bengal.",
	openGraph: {
		title: "Contact Us - Get in Touch",
		description:
			"Contact mydearcitybuilderss for your construction and renovation needs. Reach out to our expert team through phone, email, or visit our office in Durgapur, West Bengal.",
		images: [
			{
				url: "/contact-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MyDearCity Builders - Contact Us",
			},
		],
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
