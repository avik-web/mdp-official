import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services - Construction & Renovation Solutions",
    description: "Explore our comprehensive construction and renovation services including interior design, structural design, electrical work, plumbing, waterproofing, and more. Expert solutions for your dream home.",
    openGraph: {
        title: "Our Services - Construction & Renovation Solutions",
        description: "Explore our comprehensive construction and renovation services including interior design, structural design, electrical work, plumbing, waterproofing, and more. Expert solutions for your dream home.",
        images: [
            {
                url: "/services-og-image.jpg",
                width: 1200,
                height: 630,
                alt: "MyDearCity Builders - Our Services",
            },
        ],
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 