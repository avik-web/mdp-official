import { Bungalow } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";

const bhk2_elevation1 = "/assets/elevations/2_BHK_812/elevation.png";
const bhk2_elevation2 = "/assets/elevations/2_BHK_812/firstfloor.png";
const bhk2_elevation3 = "/assets/elevations/2_BHK_812/groundfloor.png";
const bhk2_floorplan1 = "/assets/elevations/2_BHK_812/2BHK_812.jpg";
const bhk2_premium1 = "/assets/elevations/2_BHK_1070/ele.png";
const bhk2_premium2 = "/assets/elevations/2_BHK_1070/elevation.png";
const bhk2_premium3 = "/assets/elevations/2_BHK_1070/ground_floor.png";
const bhk2_premium_floor_plan = "/assets/elevations/2_BHK_1070/floor_plan.jpg";

export const bungalows2BHK: Bungalow[] = [
	{
		slug: "2-bhk-812-sqft",
		title: "2BHK Economic Elevation",
		images: [bhk2_elevation1, bhk2_elevation2, bhk2_elevation3],
		bhk: 2,
		floors: 2,
		location: "Durgapur",
		price: "16.99 Lakh",
		areA: "812 sqft",
		description:
			"Compact and efficient 2BHK bungalow with modern amenities, featuring a total area of 812 sqft spread across ground floor and first floor. Designed for comfortable living with quality construction materials and thoughtful space planning.",
		plans: [
			{
				title: "2 BHK floor plan",
				image: bhk2_floorplan1,
				link: "https://drive.google.com/file/d/1fU2T-gIpeKPy0soiFxRB1fDdD1F8bn6g/view?usp=sharing",
			},
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
				brands: ["12 mm", "40 mm"],
			},
			{
				materials: "Bricks",
				brands: ["AAC Block"],
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
				brands: ["Pine & Kapoor wood - 4x2.5 inch"],
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
				area: "Bedrooms",
				rooms: [
					{
						name: "Bedroom 1",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Bedroom 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
				],
			},
			{
				area: "Living",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Terrace",
				points: { LightPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Open Terrace",
				points: { LightPoint: 1 },
			},
			{
				area: "Passage",
				rooms: [
					{
						name: "Passage 1",
						points: { LightPoint: 1 },
					},
					{
						name: "Passage 2",
						points: { LightPoint: 1 },
					},
				],
			},
			{
				area: "Open Kitchen",
				points: {
					LightPoint: 1,
					ChimneyPoint: 1,
					MixturePoint: 1,
					PlugPoint: 1,
				},
			},
			{
				area: "Bathroom",
				rooms: [
					{
						name: "Bathroom 1",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
					{
						name: "Bathroom 2",
						points: { LightPoint: 1, ExhaustFanPoint: 1 },
					},
				],
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
				area: "Bathrooms",
				rooms: [
					{
						name: "Bathroom 1",
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
						name: "Bathroom 2",
						points: {
							HealthFaucet: 1,
							Commode: 1,
							TapPoint: 1,
							Shower: 1,
						},
					},
				],
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
	{
		slug: "2-bhk-1070-sqft",
		title: "2BHK Premium Elevation",
		images: [bhk2_premium2, bhk2_premium1, bhk2_premium3],
		bhk: 2,
		floors: 2,
		location: "Durgapur",
		price: "21.99 Lakh",
		areA: "1070 sqft",
		description:
			"2BHK premium bungalow with modern design, spacious rooms, elegant interiors, and serene green surroundings for a comfortable lifestyle.",
		plans: [
			{
				title: "2 BHK floor plan",
				image: bhk2_premium_floor_plan,
				link: "https://drive.google.com/file/d/1hxSR9wuxvtetlgFVXd5mM_PBcrhla5lU/view?usp=sharing",
			},
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
				brands: ["12 mm", "40 mm"],
			},
			{
				materials: "Bricks",
				brands: ["AAC Block"],
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
				brands: ["Pine & Kapoor wood - 4x2.5 inch"],
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
				area: "Bedrooms",
				rooms: [
					{
						name: "Bedroom 1",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Bedroom 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1, AcPoint: 1 },
					},
				],
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
				area: "Open Terrace",
				points: { LightPoint: 1 },
			},
			{
				area: "Balcony",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Passage",
				rooms: [
					{
						name: "Passage 1",
						points: { LightPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Passage 2",
						points: { LightPoint: 1, PlugPoint: 1 },
					},
				],
			},
			{
				area: "Open Kitchen",
				points: {
					LightPoint: 1,
					ChimneyPoint: 1,
					MixturePoint: 1,
					PlugPoint: 1,
				},
			},
			{
				area: "Bathroom",
				rooms: [
					{
						name: "Bathroom 1",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
					{
						name: "Bathroom 2",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
				],
			},
			{
				area: "Staircase",
				points: { LightPoint: 2, TwoWaySwitchPoint: 1 },
			},
		],
		plumbing: [
			{
				materials: "Plumbing Brands",
				brands: [
					"Supreme",
					"Finolex",
					"R Classic",
					"Prince",
					"Cera",
					"Parryware",
					"Hindware",
					"Mark",
					"Muskan",
				],
			},
			{
				area: "Bathrooms",
				rooms: [
					{
						name: "Bathroom 1",
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
						name: "Bathroom 2",
						points: {
							HealthFaucet: 1,
							Commode: 1,
							TapPoint: 1,
							Shower: 1,
							GeyserPoint: 1,
							BasinPoint: 1,
						},
					},
				],
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
