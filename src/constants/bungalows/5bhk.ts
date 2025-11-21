import { Bungalow } from "@/app/(site)/bungalows/[slug]/__components/BungalowDetailsClient";
const floorplan_1835 = "/assets/elevations/5_BHK_2835/floor-plan.jpg";
const bhk5_2835_ext1 = "/assets/elevations/5_BHK_2835/exterior/01.png";
const bhk5_2835_ext2 = "/assets/elevations/5_BHK_2835/exterior/02.png";
const bhk5_2835_ext3 = "/assets/elevations/5_BHK_2835/exterior/03.png";
const bhk5_2835_ext4 = "/assets/elevations/5_BHK_2835/exterior/04.png";
// const bhk_2835_int5 = "/assets/elevations/5_BHK_2835/strutre.png";
const bhk5_elevation_1803 =
	"/assets/elevations/5_BHK_1803/Elevations/elevation1-5bhk.png";
const bhk5_elevation3_1803 =
	"/assets/elevations/5_BHK_1803/Elevations/crocss-sectional.png";
const bhk5_elevation4_1803 =
	"/assets/elevations/5_BHK_1803/Elevations/second-floor.png";
const bhk5_floorplan_1803 = "/assets/elevations/5_BHK_1803/floor-plan.jpg";
const bhk5_elevation2_1803 =
	"/assets/elevations/5_BHK_1803/Elevations/elvation.png";
const bhk5_elevation1_2250 =
	"/assets/elevations/5_BHK_2250/elevation3-5bhk.png";
const bhk5_elevation2_2250 =
	"/assets/elevations/5_BHK_2250/elevation4-5bhk.png";
const bhk5_elevation3_2250 =
	"/assets/elevations/5_BHK_2250/elevation5-5bhk.png";
const bhk5_elevation4_2250 = "/assets/elevations/5_BHK_2250/first-floor.png";
const bhk5_floorplan_2250 = "/assets/elevations/5_BHK_2250/floor-plan.jpg";

export const bungalows5BHK: Bungalow[] = [
	{
		slug: "5bhk-premium-elevation-2835",
		title: "5BHK Premium Elevation",
		images: [bhk5_2835_ext1, bhk5_2835_ext2, bhk5_2835_ext3, bhk5_2835_ext4],
		bhk: 5,
		floors: 3,
		location: "Durgapur",
		price: "79.99 Lakh",
		areA: "2958 sqft",
		description:
			"Experience luxury living in this 5BHK Premium home with stunning elevation design, modern architecture, and spacious interiors. Perfectly crafted for elegance and comfort, this residence offers top-tier amenities and a sophisticated lifestyle in every detail.",
		plans: [
			{
				title: "5 BHK floor plan",
				image: floorplan_1835,
				link: "https://drive.google.com/file/d/1ArEnyQUyDaRpqmIyaNwLoMvjy_9_r1Sp/view?usp=sharing",
			},
			// {
			//   title: "5 BHK master plan",
			//   image: floorplan2_1835,
			// },
			// {
			// 	title: "5 BHK Structural plan",
			// 	image: bhk_2835_int5,
			// 	link: null,
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
					{
						name: "Bedroom 4",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Bedroom 5",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
				],
			},
			{
				area: "Studyrooms",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Dining & Kitchen",
				points: {
					LightPoint: 2,
					ChimneyPoint: 1,
					PlugPoint: 1,
					FanPoint: 1,
					MixturePoint: 1,
				},
			},
			{
				area: "Drawing",
				rooms: [
					{
						name: "Drawing 1",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Drawing 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
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
				area: "Balcony",
				rooms: [
					{
						name: "Balcony 1",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Balcony 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
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
					{
						name: "Bathroom 5",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
					{ name: "Bathroom 6", points: { LightPoint: 1, ExhaustFanPoint: 1 } },
				],
			},
			{
				area: "Staircase",
				points: { LightPoint: 3, TwoWaySwitchPoint: 1 },
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
					{
						name: "Bathroom 5",
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
						name: "Bathroom 6",
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
	// 5bhk-premium-elevation-1803
	{
		slug: "5bhk-premium-elevation-1803",
		title: "5BHK Economic Elevation",
		images: [
			bhk5_elevation_1803,
			bhk5_elevation2_1803,
			bhk5_elevation3_1803,
			bhk5_elevation4_1803,
		],
		bhk: 5,
		floors: 3,
		location: "Durgapur",
		price: "45.99 Lakh",
		areA: "1907 sqft",
		description:
			"The 5BHK Economic Elevation showcases a grand yet budget-friendly design with clean geometry, wide openings, and functional balconies—offering spacious, modern, and affordable family living.",
		plans: [
			{
				title: "5 BHK floor plan",
				image: bhk5_floorplan_1803,
				link: "https://drive.google.com/file/d/1bCikHOrmlgtwmYkdMHITmI0PClG0itwh/view?usp=sharing",
			},
			// {
			//   title: "5 BHK master plan",
			//   image: bhk5_floorplan2_1803,
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
					{
						name: "Bedroom 4",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Bedroom 5",
						points: { LightPoint: 1, AcPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
				],
			},
			{
				area: "Studyrooms",
				points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
			},
			{
				area: "Dining & Kitchen",
				points: {
					LightPoint: 2,
					ChimneyPoint: 1,
					PlugPoint: 1,
					FanPoint: 1,
					MixturePoint: 1,
				},
			},
			{
				area: "Drawing",
				rooms: [
					{
						name: "Drawing 1",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Drawing 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
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
				area: "Balcony",
				rooms: [
					{
						name: "Balcony 1",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Balcony 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
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
					{
						name: "Bathroom 5",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
				],
			},
			{
				area: "Staircase",
				points: { LightPoint: 3, TwoWaySwitchPoint: 1 },
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
					{
						name: "Bathroom 5",
						points: {
							HealthFaucet: 1,
							Commode: 1,
							TapPoint: 1,
							GeyserPoint: 1,
							Shower: 1,
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
	// 5bhk-top-selling-elevation-2250
	{
		slug: "5bhk-top-selling-elevation-2250",
		title: "5BHK Top Selling Elevation",
		images: [
			bhk5_elevation1_2250,
			bhk5_elevation2_2250,
			bhk5_elevation3_2250,
			bhk5_elevation4_2250,
			// bhk5_floorplan_2250,
			// bhk5_floorplan2_2250,
		],
		bhk: 5,
		floors: 3,
		location: "Durgapur",
		price: "63.99 Lakh",
		areA: "2360 sqft",
		description:
			"The 5BHK Top Selling Elevation boasts a premium, stylish façade with modern textures, wide balconies, and elegant detailing—combining luxury, space, and contemporary appeal for dream family living.",
		plans: [
			{
				title: "5 BHK floor plan",
				image: bhk5_floorplan_2250,
				link: "https://drive.google.com/file/d/1SYBpQulvrknpXom1NC8RXIOhptew50qw/view?usp=sharing",
			},
			// {
			// 	title: "5 BHK master plan",
			// 	image: bhk5_floorplan2_2250,
			// 	link: null,
			// },
		],
		structure: [
			{
				materials: "Cement",
				brands: ["Birla Samrat", "Birla Unique"],
			},
			{
				materials: "Steel",
				brands: ["Shyam Steel", "TATA"],
			},
			{
				materials: "Aggregate",
				brands: ["20 mm to 40 mm"],
			},
			{
				materials: "Bricks",
				brands: ["AAC Block"],
			},
			{
				materials: "RCC Design Mix",
				brands: ["M20"],
			},
			{
				materials: "Ceiling Height",
				brands: ["10 Feet"],
			},
		],
		tiles: [
			{
				materials: "Flooring & Wall",
				brands: ["Nitco", "Johnson", "Kajaria"],
			},
			{
				materials: "Floor Tile Sizes",
				brands: ["30x30 cm", "60x60 cm", "80x80 cm", "60x120 cm", "80x160 cm"],
			},
			{
				materials: "Wall Tile Sizes",
				brands: [
					"30x60 cm",
					"40x80 cm",
					"60x120 cm",
					"30x45 cm",
					"80x240 cm",
					"120x240 cm",
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
				brands: ["Pine & Kapoor wood", "4 inches by 2.5 inches"],
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
				brands: ["Havells", "Reo", "Pritam", "Kolors king"],
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
					{
						name: "Bedroom 4",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Bedroom 5",
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
				area: "Drawing",
				rooms: [
					{
						name: "Drawing 1",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
					},
					{
						name: "Drawing 2",
						points: { LightPoint: 1, FanPoint: 1, PlugPoint: 1 },
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
				area: "Balcony",
				rooms: [
					{ name: "Balcony 1", points: { LightPoint: 1, PlugPoint: 1 } },
					{ name: "Balcony 2", points: { LightPoint: 1, PlugPoint: 1 } },
				],
			},
			{
				area: "Bathroom",
				rooms: [
					{
						name: "Bathroom 1",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
					{ name: "Bathroom 2", points: { LightPoint: 1, ExhaustFanPoint: 1 } },
					{
						name: "Bathroom 3",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
					{ name: "Bathroom 4", points: { LightPoint: 1, ExhaustFanPoint: 1 } },
					{
						name: "Bathroom 5",
						points: { LightPoint: 1, ExhaustFanPoint: 1, GeyserPoint: 1 },
					},
				],
			},
			{
				area: "Staircase",
				points: { LightPoint: 3, TwoWaySwitchPoint: 1 },
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
						points: { HealthFaucet: 1, Commode: 1, TapPoint: 1, Shower: 1 },
					},
					{
						name: "Bathroom 3",
						points: {
							HealthFaucet: 1,
							Commode: 1,
							TapPoint: 1,
							Shower: 1,
							BasinPoint: 1,
							GeyserPoint: 1,
						},
					},
					{
						name: "Bathroom 4",
						points: { HealthFaucet: 1, Commode: 1, TapPoint: 1, Shower: 1 },
					},
					{
						name: "Bathroom 5",
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
				points: { TapPoint: 1, SinkPoint: 1 },
			},
			{
				area: "Roof",
				points: { OverHeadWaterTank: 1 },
			},
		],
		paint: [
			{
				workType: "Wall putty",
				brands: ["Asian Paint", "Nerolac paint", "Birla opus"],
			},
			{
				workType: "Exterior paint",
				brands: ["Asian Paint", "Nerolac paint", "Birla opus"],
			},
			{
				workType: "Interior paint",
				brands: ["Asian Paint", "Nerolac paint", "Birla opus"],
			},
		],
	},
];
