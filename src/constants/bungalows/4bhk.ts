import { Bungalow } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
import elevation_1600 from "../../../public/assets/elevations/4_BHK_1600/elevation.png";
import elevation_1600_1 from "../../../public/assets/elevations/4_BHK_1600/first-floor.png";
import elevation_1600_2 from "../../../public/assets/elevations/4_BHK_1600/ground-floor.png";
import floorplan_1600 from "../../../public/assets/elevations/4_BHK_1600/floor-plan.jpg";

// `````````````````````````````````````````````````````````````````````````````````````````````````````

import bhk4_elevation1_1600 from "../../../public/assets/elevations/4_BHK_1600/2nd model/elevation2-4bhk.png";
import bhk4_elevation2_1600 from "../../../public/assets/elevations/4_BHK_1600/2nd model/4bhk-3.png";
import bhk4_elevation3_1600 from "../../../public/assets/elevations/4_BHK_1600/2nd model/4bhk-4.png";
import bhk4_second_floorplan_1600 from "../../../public/assets/elevations/4_BHK_1600/2nd model/floor-plan.jpg";

export const bungalows4BHK: Bungalow[] = [
	// 4bhk-premium-elevation
	{
		slug: "4bhk-premium-elevation",
		title: "4BHK Premium Elevation",
		images: [elevation_1600, elevation_1600_1, elevation_1600_2],
		bhk: 4,
		floors: 2,
		location: "Durgapur",
		price: "49.99 Lakh",
		areA: "1763 sqft",
		description:
			"Experience luxury living in this 4BHK premium home with stunning elevation design, modern architecture, and spacious interiors. Perfectly crafted for elegance and comfort, this residence offers top-tier amenities and a sophisticated lifestyle in every detail.",
		plans: [
			{
				title: "4 BHK floor plan",
				image: floorplan_1600,
				link: "https://drive.google.com/file/d/1PCpOa5GhPM8gTThYOwHswoGeqb429UTs/view?usp=sharing"
			},
			// {
			// 	title: "4 BHK master plan",
			// 	image: bhk4_floorplan2_1600,
			// },
		],
		structure: [
			{
				materials: "cement",
				brands: ["Ultra Tech"],
			},
			{
				materials: "steel",
				brands: ["Shyam Steel", "TATA"],
			},
			{
				materials: "Aggregate",
				brands: ["20 mm to 40 mm"],
			},
			{
				materials: "Bricks",
				brands: ["AAC block"],
			},
			{
				materials: "RCC design mix",
				brands: ["M20"],
			},
			{
				materials: "Ceiling height",
				brands: ["10 Feet"],
			},
		],
		tiles: [
			{
				materials: "Flooring And Wall",
				brands: ["Nitco", "Johnson", "Kajaria"],
			},
			{
				materials: "Floor Tile Sizes",
				brands: ["30×30 cm", "60×60 cm", "80×80 cm", "60×120 cm", "80×160 cm"],
			},
			{
				materials: "Wall Tile Sizes",
				brands: [
					"30×60 cm",
					"40×80 cm",
					"60×120 cm",
					"30×45 cm",
					"80×240 cm",
					"120×240 cm",
				],
			},
		],
		doors: [
			{
				materials: "Door Type",
				brands: ["Flush Door"],
			},
			{
				materials: "Frame",
				brands: ["Pine & Kapoor wood of 4 inches by 2.5 inches"],
			},
		],
		windows: [
			{
				materials: "Window Type",
				brands: ["UPVC window with glass shutter"],
			},
		],
		electrical: [
			{
				materials: "Electrical Brands",
				brands: ["Havells", "Reo", "Pritam", "Kolors King"],
			},
			{
				area: "Bedroom 1",
				points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bedroom 2",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bedroom 3",
				points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bedroom 4",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Kitchen",
				points: {
					LightPoint: 1,
					ChimneyPoint: 1,
					PlugPoint: 1,
					MixturePoint: 1,
				},
			},
			{
				area: "Dinning",
				points: {
					LightPoint: 1,
					FanPoint: 1,
					PlugPoint: 1,
				},
			},
			{
				area: "Living",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Parking",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Balcony",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Hall",
				points: { LightPoint: 1, PlugPoint: 1, FanPoint: 1 },
			},
			{
				area: "Washing",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bathroom 1",
				points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
			},
			{
				area: "Bathroom 2",
				points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
			},
			{
				area: "Bathroom 3",
				points: { LightPoint: 1, ExhaustFanPoint: 1 },
			},
			{
				area: "Staircase",
				points: { LightPoint: 2, TwoWaySwitchPoint: 1 },
			},
		],
		plumbing: [
			{
				materials: "Plumbing Brands",
				brands: ["Supreme", "Finolex", "R Classic", "Prince"],
			},
			{
				area: "Bathroom 1",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					GeyserPoint: 1,
					Shower: 1,
					BasinPoint: 1,
				},
			},
			{
				area: "Bathroom 2",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					GeyserPoint: 1,
					Shower: 1,
				},
			},
			{
				area: "Bathroom 3",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					GeyserPoint: 1,
					Shower: 1,
					BasinPoint: 1,
				},
			},
			{
				area: "Kitchen",
				points: {
					TapPoint: 1,
					SinkPoint: 1,
				},
			},
			{
				area: "Roof",
				points: {
					OverHeadWaterTank: 1,
				},
			},
		],
		paint: [
			{
				workType: "Wall putty",
				brands: ["Asian Paint", "Nerolac Paint", "Birla Opus"],
			},
			{
				workType: "Exterior Paint",
				brands: ["Asian Paint", "Nerolac Paint", "Birla Opus"],
			},
			{
				workType: "Interior Paint",
				brands: ["Asian Paint", "Nerolac Paint", "Birla Opus"],
			},
		],
	},
	// 4bhk-premium-elevation-2
	{
		slug: "4bhk-premium-elevation-2",
		title: "4BHK Economic Elevation",
		images: [bhk4_elevation1_1600, bhk4_elevation2_1600, bhk4_elevation3_1600],
		bhk: 4,
		floors: 2,
		location: "Durgapur",
		price: "38.99 Lakh",
		areA: "1722 sqft",
		description:
			"The 4BHK Economic Elevation offers a simple yet modern façade with clean lines, spacious balconies, and cost-effective finishes—designed for functionality, comfort, and elegant family living.",
		plans: [
			{
				title: "4 BHK floor plan",
				image: bhk4_second_floorplan_1600,
				link: "https://drive.google.com/file/d/1fFMqhs_lTCpIeGiypGN4HxMXOwQnShbW/view?usp=sharing",
			},
			// {
			// 	title: "4 BHK master plan",
			// 	image: bhk4_second_floorplan2_1600,
			// },
		],
		structure: [
			{
				materials: "cement",
				brands: ["Birla Unique"],
			},
			{
				materials: "steel",
				brands: ["Shyam Steel", "TATA"],
			},
			{
				materials: "Aggregate",
				brands: ["12 mm to 40 mm"],
			},
			{
				materials: "Bricks",
				brands: ["AAC block"],
			},
			{
				materials: "RCC design mix",
				brands: ["M20"],
			},
			{
				materials: "Ceiling height",
				brands: ["10 Feet"],
			},
		],
		tiles: [
			{
				materials: "Flooring And Wall",
				brands: ["Nitco", "Johnson", "Kajaria"],
			},
			{
				materials: "Floor Tile Sizes",
				brands: ["30×30 cm", "60×60 cm", "80×80 cm", "60×120 cm", "80×160 cm"],
			},
			{
				materials: "Wall Tile Sizes",
				brands: [
					"30×60 cm",
					"40×80 cm",
					"60×120 cm",
					"30×45 cm",
					"80×240 cm",
					"120×240 cm",
				],
			},
		],
		doors: [
			{
				materials: "Door Type",
				brands: ["Flush Door"],
			},
			{
				materials: "Frame",
				brands: ["Pine & Kapoor wood of 4 inches by 2.5 inches"],
			},
		],
		windows: [
			{
				materials: "Window Type",
				brands: ["UPVC window with glass shutter"],
			},
		],
		electrical: [
			{
				materials: "Electrical Brands",
				brands: ["Havells", "Reo", "Pritam", "Kolors King"],
			},
			{
				area: "Bedroom 1",
				points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bedroom 2",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bedroom 3",
				points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bedroom 4",
				points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Living",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Parking",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Balcony",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Din cum Kit / Drawing",
				points: { LightPoint: 1, PlugPoint: 1, FanPoint: 1, MixturePoint: 1 },
			},
			{
				area: "Passage",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Bathroom 1",
				points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
			},
			{
				area: "Bathroom 2",
				points: { LightPoint: 1, ExhaustFanPoint: 1 },
			},
			{
				area: "Bathroom 3",
				points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
			},
			{
				area: "Bathroom 4",
				points: { LightPoint: 1, ExhaustFanPoint: 1 },
			},
			{
				area: "Staircase",
				points: { LightPoint: 2, TwoWaySwitchPoint: 1 },
			},
		],
		plumbing: [
			{
				materials: "Plumbing Brands",
				brands: ["Supreme", "Finolex", "R Classic", "Prince"],
			},
			{
				area: "Bathroom 1",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					GeyserPoint: 1,
					Shower: 1,
					BasinPoint: 1,
				},
			},
			{
				area: "Bathroom 2",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					Shower: 1,
				},
			},
			{
				area: "Bathroom 3",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					GeyserPoint: 1,
					Shower: 1,
					BasinPoint: 1,
				},
			},
			{
				area: "Bathroom 4",
				points: {
					HealthFaucet: 1,
					Commode: 1,
					TapPoint: 1,
					Shower: 1,
				},
			},
			{
				area: "Kitchen",
				points: {
					TapPoint: 1,
					SinkPoint: 1,
				},
			},
			{
				area: "Roof",
				points: {
					OverHeadWaterTank: 1,
				},
			},
		],
		paint: [
			{
				workType: "Wall putty",
				brands: ["Asian Paint", "Nerolac Paint", "Birla Opus"],
			},
			{
				workType: "Exterior Paint",
				brands: ["Asian Paint", "Nerolac Paint", "Birla Opus"],
			},
			{
				workType: "Interior Paint",
				brands: ["Asian Paint", "Nerolac Paint", "Birla Opus"],
			},
		],
	},
];
