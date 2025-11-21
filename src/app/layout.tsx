import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://mydearcitybuilderss.com"),
	title: {
		default: "MyDearCity Builders | Premium Home Construction",
		template: "%s | MyDearCity Builders",
	},
	description:
		"Transform your dream home into reality with MyDearCity Builders. Expert construction services, premium quality, and personalized solutions for your perfect home.",
	keywords: [
		"home construction",
		"building contractors",
		"luxury homes",
		"residential construction",
		"custom homes",
		"MyDearCity Builders",
	],
	authors: [{ name: "MyDearCity Builders" }],
	creator: "MyDearCity Builders",
	publisher: "MyDearCity Builders",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://mydearcitybuilderss.com",
		siteName: "MyDearCity Builders",
		title: "MyDearCity Builders | Premium Home Construction",
		description:
			"Transform your dream home into reality with MyDearCity Builders. Expert construction services, premium quality, and personalized solutions for your perfect home.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MyDearCity Builders",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Script id="meta-pixel" strategy="afterInteractive">
				{`!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window, document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '1015041963783817');
				fbq('track', 'PageView');`}
			</Script>
			<head />
			<body className={inter.className} suppressHydrationWarning>
				<noscript>
					<Image
						height={1}
						width={1}
						src="https://www.facebook.com/tr?id=1015041963783817&ev=PageView&noscript=1"
						alt=""
						style={{ display: 'none' }}
						unoptimized
						priority
					/>
				</noscript>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
			<GoogleAnalytics gaId="G-WKQWXX0Q8D" />
		</html>
	);
}
