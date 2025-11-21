import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { bungalowsDetails } from "@/constants/bunglows-details";
import { notFound } from "next/navigation";
import BungalowDetailsClient from "./__components/BungalowDetailsClient";
export default async function BungalowDetails({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const bungalow = bungalowsDetails.find((b) => b.slug === slug);
	if (!bungalow) return notFound();

	return (
		<>
			<Nav />
			<BungalowDetailsClient bungalow={bungalow} />
			<Footer />
		</>
	);
}
