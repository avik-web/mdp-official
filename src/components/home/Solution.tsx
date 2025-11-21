import Faq from "./Faq";
import OurFeatures from "./OurFeatures";

const Solution = () => {
	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row gap-10">
			<Faq />
			{/* <Contact /> */}
			<OurFeatures />
		</div>
	);
};

export default Solution;
