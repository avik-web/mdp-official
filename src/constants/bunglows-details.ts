import { Bungalow } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
import { bungalows3BHK } from "./bungalows/3bhk";
import { bungalows4BHK } from "./bungalows/4bhk";
import { bungalows5BHK } from "./bungalows/5bhk";
import { bungalows2BHK } from "./bungalows/2bhk";

export const bungalowsDetails: Bungalow[] = [
	...bungalows2BHK,
	...bungalows3BHK,
	...bungalows4BHK,
	...bungalows5BHK,
];
