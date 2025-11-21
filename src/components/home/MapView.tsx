"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapAreaPopup from "./MapAreaPopup";

// Fix default icon issue in Leaflet with Next.js/react-leaflet
// See: https://jsdev.space/mastering-react-leaflet/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
	iconUrl: markerIcon.src ?? markerIcon,
	shadowUrl: markerShadow.src ?? markerShadow,
});

// Custom icons for selected and default markers
const defaultIcon = new L.Icon({
	iconUrl: typeof markerIcon === "string" ? markerIcon : markerIcon.src,
	iconRetinaUrl:
		typeof markerIcon2x === "string" ? markerIcon2x : markerIcon2x.src,
	shadowUrl: typeof markerShadow === "string" ? markerShadow : markerShadow.src,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
const selectedIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	iconRetinaUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
	shadowUrl: typeof markerShadow === "string" ? markerShadow : markerShadow.src,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

// Refactored: Support multiple cities with dropdown selection
const cities: {
	name: string;
	bounds: [[number, number], [number, number]];
	center: [number, number];
	areas: {
		id: number;
		name: string;
		position: [number, number];
		images: {
			url: string;
			description: string;
			price: string;
			title: string;
		}[];
		description: string;
	}[];
}[] = [
	{
		name: "Durgapur",
		bounds: [
			[23.48, 87.25],
			[23.58, 87.36],
		],
		center: [23.5204, 87.3119],
		areas: [
			{
				id: 1,
				name: "Fuljhor",
				position: [23.5403652, 87.3387197],
				images: [
					{
						url: "/assets/elevations/3_BHK_1202/elevation.jpeg",
						title: "Main Elevation",
						description: "Main elevation view of Fuljhor project.",
						price: "₹10,00,000",
					},
					{
						url: "/assets/elevations/3_BHK_1202/Economic Elevations/design-1.jpeg",
						title: "Economic Design 1",
						description: "Economic elevation design 1 for Fuljhor.",
						price: "₹10,50,000",
					},
					{
						url: "/assets/elevations/3_BHK_1202/Economic Elevations/design-2.jpeg",
						title: "Economic Design 2",
						description: "Economic elevation design 2 for Fuljhor.",
						price: "₹11,00,000",
					},
				],
				description: "A peaceful residential area with modern amenities.",
			},
			{
				id: 2,
				name: "Bidhan Park",
				position: [23.5341, 87.3444],
				images: [
					{
						url: "/assets/elevations/3_BHK_1500/elevation1-3bhk.jpg",
						title: "Elevation 1",
						description:
							"Known for its lush parks and family-friendly environment.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1500/elevation2-3bhk.jpg",
						title: "Elevation 2",
						description:
							"Known for its lush parks and family-friendly environment.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1500/elevation3-3bhk.jpg",
						title: "Elevation 3",
						description:
							"Known for its lush parks and family-friendly environment.",
						price: "Coming Soon",
					},
				],
				description:
					"Known for its lush parks and family-friendly environment.",
			},
			{
				id: 3,
				name: "Mahalakshmi Park",
				position: [23.535, 87.343],
				images: [
					{
						url: "/assets/elevations/3_BHK_1600/800+800=1600-elevation1-3bhk.jpg",
						title: "Elevation 1",
						description:
							"A vibrant community with easy access to city facilities.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1600/800+800=1600-elevation2-3bhk-1.jpg",
						title: "Elevation 2",
						description:
							"A vibrant community with easy access to city facilities.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1600/3BHK-page-0001.jpg",
						title: "Elevation 1",
						description:
							"A vibrant community with easy access to city facilities.",
						price: "Coming Soon",
					},
				],
				description: "A vibrant community with easy access to city facilities.",
			},
			{
				id: 4,
				name: "Steel Park",
				position: [23.53322, 87.34694],
				images: [
					{
						url: "/assets/elevations/5_BHK_1803/elevation2.jpg",
						title: "Elevation 2",
						description: "Popular for its proximity to industrial hubs.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/5_BHK_1803/Elevations/601+601+601=1803-elevation2-5bhk.jpg",
						title: "Elevation 2",
						description: "Popular for its proximity to industrial hubs.",
						price: "Coming Soon",
					},
				],
				description: "Popular for its proximity to industrial hubs.",
			},
			{
				id: 5,
				name: "Saptarshi Park",
				position: [23.5335, 87.3455],
				images: [
					{
						url: "/assets/elevations/5_BHK_2250/elevation3-5bhk.jpg",
						title: "Elevation 3",
						description: "A serene neighborhood with green surroundings.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/5_BHK_2250/elevation4-5bhk.jpg",
						title: "Elevation 4",
						description: "A serene neighborhood with green surroundings.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/5_BHK_2250/elevation5-5bhk.jpg",
						title: "Elevation 5",
						description: "A serene neighborhood with green surroundings.",
						price: "Coming Soon",
					},
				],
				description: "A serene neighborhood with green surroundings.",
			},
			{
				id: 6,
				name: "Christian Pally, Kaliganj",
				position: [23.531, 87.34],
				images: [
					{
						url: "/assets/elevations/5_BHK_2835/elevation.jpeg",
						title: "Elevation",
						description: "A developing area with great potential.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/5_BHK_2835/exterior/01.png",
						title: "Exterior 1",
						description: "A developing area with great potential.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/5_BHK_2835/exterior/02.png",
						title: "Exterior 2",
						description: "A developing area with great potential.",
						price: "Coming Soon",
					},
				],
				description: "A developing area with great potential.",
			},
			{
				id: 7,
				name: "Arrah",
				position: [23.5315, 87.342],
				images: [
					{
						url: "/assets/elevations/4_BHK_1600/elevation.png",
						title: "Elevation",
						description: "A well-connected locality with all basic facilities.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/4_BHK_1600/2nd model/4bhk-3.jpg",
						title: "Model 2nd",
						description: "A well-connected locality with all basic facilities.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/4_BHK_1600/2nd model/4bhk-4.jpg",
						title: "Model 2nd",
						description: "A well-connected locality with all basic facilities.",
						price: "Coming Soon",
					},
				],
				description: "A well-connected locality with all basic facilities.",
			},
			{
				id: 8,
				name: "Sabujnagar",
				position: [23.529, 87.338],
				images: [
					{
						url: "/assets/elevations/3_BHK_1202/Economic Elevations/design-1.jpeg",
						title: "Design 1",
						description: "A peaceful and green area ideal for families.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1202/Economic Elevations/design-2.jpeg",
						title: "Design 2",
						description: "A peaceful and green area ideal for families.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1202/Economic Elevations/design-3.jpeg",
						title: "Design 3",
						description: "A peaceful and green area ideal for families.",
						price: "Coming Soon",
					},
				],
				description: "A peaceful and green area ideal for families.",
			},
			{
				id: 9,
				name: "Milanpally, Kurulia Dangal",
				position: [23.528, 87.337],
				images: [
					{
						url: "/assets/elevations/3_BHK_1500/elevation2-3bhk.jpg",
						title: "Elevation 2",
						description: "A growing neighborhood with modern infrastructure.",
						price: "Coming Soon",
					},
					{
						url: "/assets/elevations/3_BHK_1500/elevation3-3bhk.jpg",
						title: "Elevation 3",
						description: "A growing neighborhood with modern infrastructure.",
						price: "Coming Soon",
					},
				],
				description: "A growing neighborhood with modern infrastructure.",
			},
			{
				id: 10,
				name: "Amrai",
				position: [23.532, 87.339],
				images: [
					{
						url: "/assets/elevations/3_BHK_1500/elevation3-3bhk.jpg",
						title: "Elevation 3",
						description: "A lively area with a strong sense of community.",
						price: "Coming Soon",
					},
				],
				description: "A lively area with a strong sense of community.",
			},
			{
				id: 11,
				name: "Link Road",
				position: [23.545, 87.335],
				images: [
					{
						url: "/assets/elevations/5_BHK_2250/elevation4-5bhk.jpg",
						title: "Elevation 4",
						description: "Conveniently located with easy access to main roads.",
						price: "Coming Soon",
					},
				],
				description: "Conveniently located with easy access to main roads.",
			},
			{
				id: 12,
				name: "Shyampur (Near Durgapur Station)",
				position: [23.48, 87.265],
				images: [
					{
						url: "/assets/elevations/3_BHK_1202/Economic Elevations/design-2.jpeg",
						title: "Design 2",
						description: "Close to the station, perfect for commuters.",
						price: "Coming Soon",
					},
				],
				description: "Close to the station, perfect for commuters.",
			},
		],
	},
	// {
	//   name: "Asansole",
	//   bounds: [
	//    [23.60, 86.90],
	//    [23.75, 87.05]
	//   ],
	//   center: [23.650, 87.250],
	//   areas: [
	//     {
	//       id: 1,
	//       name: "Asansole Area 1",
	//       position: [23.655, 87.255],
	//       elevation: "/assets/elevations/3_BHK_1202/elevation.jpeg",
	//     },
	//     {
	//       id: 2,
	//       name: "Asansole Area 2",
	//       position: [23.660, 87.260],
	//       elevation: "/assets/elevations/3_BHK_1500/elevation1-3bhk.jpg",
	//     },
	//   ],
	// },
	// {
	//   name: "Bardhaman",
	//   bounds: [
	//     [23.10, 87.80],
	//     [23.30, 88.00],
	//   ],
	//   center: [23.220, 87.900],
	//   areas: [
	//     {
	//       id: 1,
	//       name: "Bardhaman Area 1",
	//       position: [23.210, 87.850],
	//       elevation: "/assets/elevations/3_BHK_1600/3BHK-page-0001.jpg",
	//     },
	//     {
	//       id: 2,
	//       name: "Bardhaman Area 2",
	//       position: [23.230, 87.950],
	//       elevation: "/assets/elevations/5_BHK_2250/elevation5-5bhk.jpg",
	//     },
	//   ],
	// },
];

// Helper to center map on marker
function FlyToMarker({ position }: { position: [number, number] }) {
	const map = useMap();
	// Center the map on the marker with custom zoom level
	map.setView(position, 15, { animate: true });
	return null;
}

const MapView = () => {
	const [selectedArea, setSelectedArea] = useState<
		(typeof cities)[0]["areas"][0] | null
	>(null);
	const [carouselIndex, setCarouselIndex] = useState(0);

	return (
		<div className="w-full min-h-[600px] bg-gradient-to-br from-blue-50 to-white py-10 px-2 md:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-5xl font-bold text-gray-900 mb-4  mt-10 text-center">
					City House Projects Map
				</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-5">
					Explore our exclusive house projects. Click on a pin to see project
					details!
				</p>
				<div className="w-full h-[70vh] rounded-2xl border-2 border-blue-200 shadow-lg overflow-hidden bg-white relative mb-8">
					<MapContainer
						center={cities[0].center as [number, number]}
						zoom={13}
						minZoom={12}
						maxZoom={17}
						maxBounds={cities[0].bounds as [[number, number], [number, number]]}
						maxBoundsViscosity={1.0}
						style={{ width: "100%", height: "100%" }}
					>
						<TileLayer
							{...{
								attribution:
									'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
								url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
							}}
						/>
						{cities[0].areas.map((area) => (
							<Marker
								key={area.id}
								position={area.position as [number, number]}
								eventHandlers={{
									click: () => {
										setSelectedArea(area);
										setCarouselIndex(0);
									},
								}}
								icon={
									selectedArea && selectedArea.id === area.id
										? selectedIcon
										: defaultIcon
								}
							>
								<Popup>
									<MapAreaPopup
										area={area}
										carouselIndex={carouselIndex}
										setCarouselIndex={setCarouselIndex}
										selectedArea={selectedArea}
									/>
									{selectedArea && selectedArea.id === area.id && (
										<FlyToMarker position={area.position as [number, number]} />
									)}
								</Popup>
							</Marker>
						))}
					</MapContainer>
				</div>
			</div>
		</div>
	);
};

export default MapView;
