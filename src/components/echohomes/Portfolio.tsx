import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import Heading from "../global/heading";

const portfolioImages = [
	// {
	//   image: '/assets/portfolio/p1.png',
	//   title: '3 BHK',
	//   subtitle: 'Spacious living for modern families.'
	// },
	{
		image: "/assets/portfolio/ele_1.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
	{
		image: "/assets/portfolio/ele_2.jpeg",
		title: "4 BHK",
		subtitle: "Elegant design with ample space.",
	},
	{
		image: "/assets/portfolio/ele_3.jpeg",
		title: "5 BHK",
		subtitle: "Luxury and versatility combined.",
	},
	{
		image: "/assets/portfolio/ele_4.jpeg",
		title: "4 BHK",
		subtitle: "Perfect blend of style and functionality.",
	},
	{
		image: "/assets/portfolio/ele_5.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
	{
		image: "/assets/portfolio/ele_6.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
	{
		image: "/assets/portfolio/ele_7.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
	{
		image: "/assets/portfolio/ele_8.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
	{
		image: "/assets/portfolio/ele_9.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
	{
		image: "/assets/portfolio/ele_10.jpeg",
		title: "5 BHK",
		subtitle: "Expansive comfort for large households.",
	},
];

const Portfolio = () => {
	return (
		<div className="py-8 px-2 sm:py-12 sm:px-4 bg-white flex flex-col items-center w-full">
			{/* <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
				Thoughtfully Designed Homes
			</h1>
			<p className="my-4 text-lg text-gray-500">
				Tailored picks for all preferences
			</p> */}
			<Heading
				title="Thoughtfully Designed Homes"
				subtitle="Tailored picks for all preferences"
			/>
			<div className="flex justify-center items-center w-full">
				<div className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
					<InfiniteMovingCards
						items={portfolioImages}
						direction="right"
						speed="slow"
						className="w-full"
					/>
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
