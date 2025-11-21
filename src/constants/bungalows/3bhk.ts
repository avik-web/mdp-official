import { Bungalow } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
const bhk3_elevation_d2_1202 =
	"/assets/elevations/3_BHK_1202/Economic Elevations/updateelevation.png";
const bhk3_elevation_d3_1202 =
	"/assets/elevations/3_BHK_1202/Economic Elevations/ele.png";
const bhk3_elevation_d4_1202 =
	"/assets/elevations/3_BHK_1202/Economic Elevations/new.png";
const floorplan_1202 = "/assets/elevations/3_BHK_1202/floor_plan.jpg";
const bhk3_elevation1_1500 =
	"/assets/elevations/3_BHK_1500/elevation1-3bhk.png";
const bhk3_elevation2_1500 =
	"/assets/elevations/3_BHK_1500/elevation2-3bhk.png";
const bhk3_elevation3_1500 =
	"/assets/elevations/3_BHK_1500/elevation3-3bhk.png";
const bk3_floorplan2_1500 = "/assets/elevations/3_BHK_1500/floor.jpg";
const bhk3_elevation2_1600 =
	"/assets/elevations/3_BHK_1600/800+800=1600-elevation1-3bhk.png";
const bhk3_elevation3_1600 =
	"/assets/elevations/3_BHK_1600/800+800=1600-elevation2-3bhk-1.png";
const bhk3_elevation4_1600 = "/assets/elevations/3_BHK_1600/ground-floor.png";
const bhk3_floorplan_1600 = "/assets/elevations/3_BHK_1600/floor_plan.jpg";

export const bungalows3BHK: Bungalow[] = [
	// 3bhk-economic-elevation
	{
		slug: "3bhk-economic-elevation",
		title: "3BHK Economic Elevation",
		images: [
			bhk3_elevation_d4_1202,
			bhk3_elevation_d2_1202,
			bhk3_elevation_d3_1202,
		],
		bhk: 3,
		floors: 2,
		location: "Durgapur",
		price: "28.99 Lakh",
		areA: "1306 sqft",
		description:
			"The 3BHK Economic Elevation offers a simple, modern design with clean lines, ample ventilation, and cost-effective finishes. It balances style and functionality, making it ideal for families seeking affordability with elegance.",
		plans: [
			{
				title: "3 BHK floor plan",
				image: floorplan_1202,
				link: "https://drive.google.com/file/d/112au2n6FeD55ZXyqi1IO_UoWIB1lLccN/view?usp=sharing",
			},
			// {
			// 	title: "3 BHK master plan",
			// 	image: bhk3_floorplan2_1202,
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
				brands: ["20 mm", "40 mm"],
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
				brands: ["Pine & Kapoor wood", "4 inch by 2.5 inch"],
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
					{
						name: "Bedroom 3",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
				],
			},
			{
				area: " Kitchen",
				points: {
					LightPoint: 1,
					ChimneyPoint: 1,
					PlugPoint: 1,
					MixturePoint: 1,
				},
			},
			{
				area: "Living",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Balcony",
				rooms: [
					{
						name: "Balcony 1",
						points: { LightPoint: 1, PlugPoint: 1 },
					},
				],
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
	// 3-bhk-premium-elevation
	{
		slug: "3-bhk-premium-elevation",
		title: "3BHK Premium Elevation",
		images: [bhk3_elevation2_1600, bhk3_elevation3_1600, bhk3_elevation4_1600],
		bhk: 3,
		floors: 2,
		location: "Durgapur",
		price: "44.99 Lakh",
		areA: "1722 sqft",
		description:
			"Experience luxury living in this 3BHK premium home with stunning elevation design, modern architecture, and spacious interiors. Perfectly crafted for elegance and comfort, this residence offers top-tier amenities and a sophisticated lifestyle in every detail.",
		plans: [
			{
				title: "3 BHK floor plan",
				image: bhk3_floorplan_1600,
				link: "https://drive.google.com/file/d/1q-T9V01TcHzB0UFZFrhWGfzHocuD7xBV/view?usp=sharing",
			},
			// {
			// 	title: "3 BHK master plan",
			// 	image: bhk3_floorplan2_1600,
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
					{
						name: "Bedroom 3",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
				],
			},
			{
				area: "Dinning cum Kitchen",
				points: {
					LightPoint: 2,
					ChimneyPoint: 1,
					PlugPoint: 1,
					MixturePoint: 1,
				},
			},
			{
				area: "Drawing",
				rooms: [
					{
						name: "Dining cum Drawing",
						points: {
							LightPoint: 1,
							FanPoint: 1,
							PlugPoint: 1,
							MixturePoint: 1,
						},
					},
				],
			},
			{
				area: "Living",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Balcony",
				rooms: [
					{
						name: "Balcony ",
						points: { LightPoint: 1, PlugPoint: 1 },
					},
				],
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
					{
						name: "Bathroom 3",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
					{ name: "Bathroom 4", points: { LightPoint: 1, ExhaustFanPoint: 1 } },
				],
			},
			{
				area: "Staircase",
				points: { LightPoint: 2, TwoWaySwitchPoint: 1 },
			},
			{
				area: "Passage",
				points: { LightPoint: 1 },
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
					{
						name: "Bathroom 3",
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
						name: "Bathroom 4",
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
	// 3-bhk-comfort-elevation-1500
	{
		slug: "3-bhk-comfort-elevation-1500",
		title: "3BHK Comfort Elevation",
		images: [bhk3_elevation1_1500, bhk3_elevation2_1500, bhk3_elevation3_1500],
		bhk: 3,
		floors: 2,
		location: "Durgapur",
		price: "32.99 Lakh",
		areA: "1602 sqft",
		description:
			"The 3BHK Comfort Elevation features a modern, attractive façade with stylish balconies, premium finishes, and spacious openings. Its elegant design blends functionality with contemporary appeal, making it a customer favorite.",
		plans: [
			{
				title: "3 BHK floor plan",
				image: bk3_floorplan2_1500,
				link: "https://drive.google.com/file/d/18R3yU5nFNOFIBQ95xwfoGjAZu7FykwIB/view?usp=sharing",
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
				brands: ["12 mm", "20 mm"],
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
				materials: "PCC",
				brands: ["M15"],
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
					{
						name: "Bedroom 3",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
				],
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
				area: "Living",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Balcony",
				rooms: [
					{
						name: "Balcony ",
						points: { LightPoint: 1, PlugPoint: 1 },
					},
				],
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
			{
				area: "Parking",
				points: { LightPoint: 1 },
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
