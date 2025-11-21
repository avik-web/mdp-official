import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://mydearcitybuilderss.com"; // Replace with your actual domain

	// Define all your static routes
	const routes = [
		"",
		"/about",
		"/services",
		"/gallery",
		"/contact",
		"/wishlist",
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: route === "" ? 1 : 0.8,
	}));

	// Add dynamic bungalow routes
	const bungalowRoutes = [
		"/bungalows/5bhk-premium-elevation",
		// Add more bungalow routes as needed
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.9,
	}));

	return [...routes, ...bungalowRoutes];
}
