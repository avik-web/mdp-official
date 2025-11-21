import civil from "../../public/assets/home/services/All-Civil-Works.jpg";
import electricalInstall from "../../public/assets/home/services/construction-1044574_640.jpg";
import doors from "../../public/assets/home/services/doors-windows.jpg";
import electrical from "../../public/assets/home/services/electrical.jpg";
import loan from "../../public/assets/home/services/hammer-802301_640.jpg";
import interior from "../../public/assets/home/services/interior.jpg";
import flooring from "../../public/assets/home/services/kitchen-1336160_640.jpg";
import authority from "../../public/assets/home/services/Local-Authority-Compliance.jpg";
import painting from "../../public/assets/home/services/painting.jpg";
import planning from "../../public/assets/home/services/planning.jpg";
import plumbing from "../../public/assets/home/services/plumbing.jpg";
import renovation from "../../public/assets/home/services/renovation.jpg";
import structural from "../../public/assets/home/services/structural.jpg";
import waterproofing from "../../public/assets/home/services/waterproofing.jpg";

import { StaticImageData } from "next/image";

export interface Service {
	title: string;
	description: string;
	image: StaticImageData;
	slug: string;
	longDescription?: string;
	significance?: string;
	approach?: string;
	approachSteps?: string[];
	serviceTypes?: string[];
	processSteps?: {
		title: string;
		description: string;
	}[];
	features?: string[];
	process?: string[];
	benefits?: string[];
	duration?: string;
	materials?: string[];
	relatedServices?: string[];
}

export const services: Service[] = [
	{
		title: "Planning & Design",
		description: "Sustainable future designs.",
		image: planning,
		slug: "planning-design",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we understand that a home is more than just stone and structure; it’s a reflection of your dreams and aspirations. Our commitment is to bring your vision to life through meticulous planning and innovative design. We provide comprehensive home planning and design services to create spaces that are not only aesthetically pleasing but also functional and uniquely tailored to your lifestyle.",
		significance:
			"The planning and design phase forms the foundation of any successful home construction project. It’s where your ideas transform into detailed blueprints that guide the entire construction process. Our professional planning and design services ensure your home is a perfect blend of creativity, practicality, and quality craftsmanship.",
		approach:
			"Our experienced team of architects, designers, and engineers work collaboratively to craft a design that aligns with your vision. Here’s how we approach home planning and design at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Personalized Consultation: We begin by engaging in a thorough consultation to understand your lifestyle, preferences, and requirements. Your input is the foundation of our design process.",
			"Creative Conceptualization: Our designers translate your ideas into innovative design concepts that maximize space, light, and functionality.",
			"Sustainability and Efficiency: We incorporate sustainable and energy-efficient design principles to reduce environmental impact and lower long-term operating costs.",
			"Detailed Blueprints: Our team creates comprehensive architectural plans and detailed blueprints that serve as the roadmap for construction.",
			"Material Selection: We assist you in selecting high-quality, durable materials that not only enhance the aesthetic but also ensure longevity.",
			"Regulatory Compliance: We ensure that your home design complies with local building codes and regulations, eliminating any potential hurdles during the construction phase.",
			"Technology Integration: If desired, we can incorporate smart home technology into your design, providing modern conveniences and energy savings.",
		],
		serviceTypes: [
			"Custom Home Design: Whether you’re building a new home or renovating an existing one, our custom design services bring your unique vision to life.",
			"Interior Design: Our interior designers craft cohesive and functional spaces that reflect your personal style and preferences.",
			"Renovation and Remodeling: We transform outdated or underutilized spaces into modern, functional areas with thoughtful renovation and remodeling solutions. remodeling.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We create a detailed roadmap, handle permits, and ensure your project starts with a strong foundation.",
			},
			{
				title: "Design",
				description:
					"Our experts craft innovative designs tailored to your vision using advanced tools and technology.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver exceptional results with transparent invoicing and flexible payment options.",
			},
		],
		features: [
			"Architectural design and planning",
			"3D modeling and visualization",
			"Site analysis and optimization",
			"Sustainable design principles",
			"Building code compliance",
			"Material selection guidance",
		],
		process: [
			"Initial consultation and requirements gathering",
			"Site survey and analysis",
			"Conceptual design development",
			"Detailed planning and documentation",
			"Client review and approval",
			"Final design submission",
		],
		benefits: [
			"Optimized space utilization",
			"Cost-effective design solutions",
			"Future-proof planning",
			"Enhanced property value",
			"Compliance with regulations",
		],
		duration: "2-4 weeks",
		materials: ["CAD software", "3D modeling tools", "Site survey equipment"],
		relatedServices: [
			"structural-design",
			"interior-design",
			"authority-compliance",
		],
	},
	{
		title: "Interior Design",
		description: "Interiors with luxury & warmth.",
		image: interior,
		slug: "interior-design",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we understand the transformative power of thoughtful interior design. Our mission is to craft spaces that reflect your unique personality and lifestyle while bringing your vision to life in stunning detail. Backed by a team of experienced designers and an unwavering commitment to quality, we’re here to make your interior design dreams a reality.",
		significance:
			"Interior design goes beyond mere decoration—it's about creating environments that enhance your quality of life. A well-designed interior improves functionality, boosts mood, increases property value, and creates spaces that truly feel like home. Professional interior design ensures that every element works together to create a cohesive, beautiful, and practical living environment.",
		approach:
			"Our interior design approach is personalized and comprehensive. We start by understanding your lifestyle, preferences, and functional needs. Our design team then creates customized solutions that balance aesthetics with practicality, ensuring that your space is both beautiful and functional for everyday living.",
		approachSteps: [
			"Residential Interior Design: Your home is your sanctuary. We specialize in creating cozy, functional, and aesthetically pleasing interiors that resonate with your personal style. From living rooms to bedrooms, we design spaces that make you feel truly at home.",
			"Commercial Interior Design: Your workspace should inspire creativity and productivity. Our commercial design solutions are tailored to your business needs, helping you create an environment that reflects your brand’s identity and values.",
			"Kitchen and Bathroom Design: The kitchen and bathroom are the heart of any home, playing vital roles in daily life. We excel in optimizing these spaces for both functionality and beauty. Whether you envision a modern, minimalist design or a cozy, rustic atmosphere, we’ll create spaces that meet your needs and exceed your expectations.",
			"Color Consultation: Choosing the right color palette can be daunting, but it sets the tone for your entire space. Our experts guide you through the selection process, ensuring the colors evoke the desired emotions—whether it’s a calming bedroom or an inspiring office.",
			"Furniture and Decor Selection: We assist in selecting furniture and decor pieces that perfectly complement your design, considering comfort, style, and functionality to create a cohesive, inviting space.",
			"Customized Design Solutions: Every project is unique, and we tailor our services to your specific requirements. Whether you need a complete overhaul or minor tweaks, we work closely with you to achieve the desired outcome.",
		],
		serviceTypes: [
			"Space Planning and Layout Design",
			"Color Scheme and Material Selection",
			"Furniture and Fixture Planning",
			"Lighting Design and Implementation",
			"Custom Furniture Design",
			"Accessibility and Universal Design",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We analyze your space and create a detailed design plan that meets your needs and preferences.",
			},
			{
				title: "Design",
				description:
					"Our experts craft beautiful, functional designs using the latest trends and technologies.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver stunning interiors with transparent pricing and flexible payment options.",
			},
		],
		features: [
			"Space planning and layout design",
			"Color scheme and material selection",
			"Furniture and fixture planning",
			"Lighting design",
			"Custom furniture design",
			"Accessibility considerations",
		],
		process: [
			"Client consultation and style assessment",
			"Space analysis and measurements",
			"Concept development and mood boards",
			"Detailed design plans",
			"Material and furniture selection",
			"Implementation and styling",
		],
		benefits: [
			"Enhanced living experience",
			"Improved functionality",
			"Increased property value",
			"Personalized design solutions",
			"Professional finish",
		],
		duration: "3-6 weeks",
		materials: ["Premium materials", "Custom furniture", "Decorative elements"],
		relatedServices: ["painting-putty", "flooring-tiling", "electrical-design"],
	},
	{
		title: "Structural Design",
		description: "Shaping resilient spaces.",
		image: structural,
		slug: "structural-design",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we believe that a solid foundation is the essence of every successful construction project. Our structural design services ensure your building is not only visually striking but also safe, durable, and engineered for long-term reliability. By combining innovative designs with technical expertise, we create structures that inspire confidence and endure for generations.",
		significance:
			"Structural integrity is the cornerstone of any building's success. A well-designed structure safeguards occupants and mitigates risks like collapse or damage, especially in challenging environments. Our professional structural design services emphasize safety, efficiency, and sustainability, ensuring your building exceeds modern standards.",
		approach:
			"Our team of experienced structural engineers collaborates closely with architects and builders to deliver structural designs that seamlessly integrate with the architectural vision. Here’s how we approach structural design at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"In-Depth Analysis: We conduct comprehensive analyses to ensure our structural designs meet all local building codes, regulations, and safety standards, safeguarding the well-being of occupants.",
			"Safety Compliance: Through meticulous attention to detail, we ensure every design element meets the highest safety standards.",
			"Efficiency: We prioritize efficient structural systems that optimize material usage, reduce construction costs, and enhance sustainability.",
			"Innovative Materials: We stay updated with advancements in building materials and technologies—such as lightweight concrete or prefabricated elements—to deliver superior performance.",
			"Seismic and Environmental Considerations: We account for local environmental conditions, including seismic risks, high winds, and flooding, to design structures resilient against natural forces.",
			"Collaborative Design: Our engineers work closely with architects to seamlessly integrate structural elements into the overall architectural concept, ensuring a harmonious design.",
		],
		serviceTypes: [
			"Residential Structural Design: Our residential structural design services cover single-family homes, multi-unit housing, and custom-designed residences.",
			"Commercial Structural Design: We provide structural design solutions for commercial spaces, offices, retail buildings, and mixed-use developments.",
			"Industrial Structural Design: Our expertise extends to designing robust structures for industrial facilities, warehouses, and manufacturing plants.",
			"Renovation and Retrofitting: We specialize in structural renovations and retrofitting, breathing new life into existing structures while ensuring they meet modern safety and environmental standards.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We conduct thorough site analysis and create detailed structural plans for your project.",
			},
			{
				title: "Design",
				description:
					"Our engineers design robust structural systems using advanced engineering principles.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver safe, durable structures with comprehensive quality assurance.",
			},
		],
		features: [
			"Structural analysis and calculations",
			"Foundation design",
			"Load-bearing wall planning",
			"Seismic resistance design",
			"Material strength optimization",
			"Safety compliance",
		],
		process: [
			"Site soil testing and analysis",
			"Load calculations and structural planning",
			"Foundation design development",
			"Structural drawings preparation",
			"Engineering calculations review",
			"Construction supervision",
		],
		benefits: [
			"Enhanced structural integrity",
			"Long-term durability",
			"Safety assurance",
			"Cost optimization",
			"Regulatory compliance",
		],
		duration: "4-8 weeks",
		materials: [
			"High-strength concrete",
			"Reinforced steel",
			"Quality construction materials",
		],
		relatedServices: ["planning-design", "civil-works", "authority-compliance"],
	},
	{
		title: "Electrical Design",
		description: "Safe, reliable, future-ready systems.",
		image: electrical,
		slug: "electrical-design",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we understand the importance of a reliable electrical system in modern living. With our expertise as architects and builders, we deliver comprehensive electrical design and installation services, ensuring your home is not only visually appealing but also highly functional and safe.",
		significance:
			"A well-designed electrical system forms the foundation of a functional and comfortable home. From powering lighting to running essential appliances, it plays a pivotal role in your daily life. At MyDearCity Builders Pvt Ltd, our electrical design and installation services focus on safety, efficiency, and convenience to meet your modern living needs.",
		approach:
			"Our multidisciplinary team of architects and electrical engineers work together to seamlessly integrate electrical systems into your home’s design. Here’s how we approach electrical design and installation at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Customized Design: We begin by understanding your lifestyle and unique requirements. Our team customizes the electrical design to provide optimal placement of outlets, lighting, and wiring, accommodating both traditional needs and modern technology demands.",
			"Safety First: Safety is our top priority. We strictly adhere to all relevant codes and regulations to ensure a secure and reliable electrical system.",
			"Energy Efficiency: We prioritize energy-efficient solutions to minimize your electricity consumption, reducing both your carbon footprint and utility bills.",
			"Smart Home Integration: If desired, we can integrate smart home technology into your electrical system, enabling seamless control of lighting, HVAC, security, and even entertainment systems with ease.",
			"Energy efficiency optimization",
			"Seamless Integration: Our electrical systems are seamlessly integrated into your home’s architecture, minimizing visual clutter and maximizing aesthetics.",
		],
		serviceTypes: [
			"New Home Construction: For new homes, we design and install electrical systems from the ground up, incorporating modern standards for safety, efficiency, and scalability.",
			"Home Renovations: During home renovations, we upgrade your electrical system to meet current standards, improve safety, and accommodate new appliances or technology upgrades.",
			"Electrical Panel Upgrades: We provide electrical panel upgrades to increase capacity and ensure your home can handle today’s electrical demands.",
			"Lighting Design: Our experts create customized lighting designs that enhance the ambiance and functionality of your living spaces, incorporating energy-efficient and smart lighting options where desired.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We assess your electrical needs and design a comprehensive power distribution system.",
			},
			{
				title: "Design",
				description:
					"Our experts create safe, efficient electrical designs with modern technology integration.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver reliable electrical systems with comprehensive safety features.",
			},
		],
		features: [
			"Electrical load calculations",
			"Wiring and circuit design",
			"Safety system integration",
			"Smart home compatibility",
			"Energy-efficient solutions",
			"Backup power systems",
		],
		process: [
			"Electrical load assessment",
			"Circuit design and planning",
			"Safety system integration",
			"Wiring layout design",
			"Equipment specification",
			"Installation supervision",
		],
		benefits: [
			"Enhanced safety standards",
			"Energy efficiency",
			"Future-ready infrastructure",
			"Reduced maintenance costs",
			"Smart home integration",
		],
		duration: "2-4 weeks",
		materials: [
			"Quality electrical components",
			"Safety equipment",
			"Smart systems",
		],
		relatedServices: [
			"electrical-installation",
			"plumbing-work",
			"interior-design",
		],
	},
	{
		title: "Painting & Putty Work",
		description: "Strong base, lasting beauty.",
		image: painting,
		slug: "painting-putty",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we understand that the right coat of paint can transform a space from ordinary to extraordinary. Our painting and putty work services are designed to enhance the aesthetics, protect surfaces, and provide a finishing touch that brings your vision to life. We take pride in delivering not only beautiful but also durable and long-lasting paint and putty solutions.",
		significance:
			"Painting and putty work play a pivotal role in protecting and beautifying the surfaces of your home or building. A professional touch ensures that your space not only looks inviting but also stands the test of time, with minimal maintenance requirements.",
		approach:
			"Our skilled painters and finishers collaborate with design experts to provide painting and putty solutions that align seamlessly with your design preferences. Here’s how we approach painting and putty work at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Surface Assessment: We begin by assessing the condition of the surfaces to be painted or finished. This helps us identify any repairs or preparation needed before painting.",
			"Color Selection: Our experts assist you in selecting the right color palette and finish options to achieve your desired look and ambiance.",
			"Surface Preparation: We meticulously prepare surfaces by filling gaps, cracks, and imperfections with high-quality putty. This step ensures a smooth and even finish.",
			"Quality Paint Application: Our experienced painters use premium-quality paints and tools to deliver a professional, long-lasting finish. We pay close attention to detail to avoid streaks, drips, or uneven coverage.",
			"Durable and Eco-Friendly Options: We offer environmentally friendly paint options that prioritize durability and minimize environmental impact.",
		],
		serviceTypes: [
			"Interior Painting: Our interior painting services cover walls, ceilings, trims, and other interior surfaces, transforming your living spaces into inviting, cohesive environments.",
			"Exterior Painting: We provide exterior painting services to protect and beautify the exterior of your home or building, increasing curb appeal and weather resistance.",
			"Putty and Surface Repair: Our putty work services include filling cracks, smoothing surfaces, and repairing imperfections, ensuring a flawless and long-lasting paint finish.",
			"Specialty Finishes: If you desire unique textures or finishes, our team excels in specialty finishes such as faux painting, stucco, or decorative coatings.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We assess surfaces and create a detailed painting plan with color selection.",
			},
			{
				title: "Design",
				description:
					"Our experts apply professional painting techniques with quality materials.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver beautiful, long-lasting finishes with comprehensive quality assurance.",
			},
		],
		features: [
			"Surface preparation and putty work",
			"Interior and exterior painting",
			"Texture finishes",
			"Color consultation",
			"Quality paint application",
			"Finish protection",
		],
		process: [
			"Surface preparation",
			"Putty and primer application",
			"Color selection and mixing",
			"Paint application",
			"Quality inspection",
			"Final touch-ups",
		],
		benefits: [
			"Enhanced aesthetics",
			"Surface protection",
			"Long-lasting finish",
			"Increased property value",
			"Professional appearance",
		],
		duration: "1-2 weeks",
		materials: ["Quality paints", "Putty and primers", "Application tools"],
		relatedServices: [
			"interior-design",
			"renovation-restructuring",
			"flooring-tiling",
		],
	},
	{
		title: "Plumbing Work",
		description: "Seamless flow, durable solutions.",
		image: plumbing,
		slug: "plumbing-work",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we pride ourselves on being more than just architects and builders; we are creators of holistic living spaces. This commitment extends to our expertise in plumbing system design, where we ensure that water supply and drainage systems are not only efficient but also sustainable and seamlessly integrated into your projects.",
		significance:
			"A well-designed plumbing system is the lifeblood of any building, whether it’s a home, commercial space, or industrial facility. It guarantees a reliable supply of clean water and efficient wastewater removal, essential for hygiene, safety, and comfort.",
		approach:
			"Our experienced team of architects and engineers collaborates seamlessly to incorporate plumbing systems into the architectural fabric of your project. Here’s how we approach plumbing system design at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Thorough Assessment: We begin by conducting a comprehensive assessment of your project’s specific needs, taking into account the type of building, size, occupancy, and any unique requirements.",
			"Efficiency Focus: We prioritize water and energy efficiency in our designs. Our goal is to minimize water wastage and energy consumption, not only benefiting the environment but also reducing operational costs for our clients.",
			"Code Compliance: We are well-versed in local building codes and regulations related to plumbing. Our designs consistently meet or exceed these standards, ensuring both safety and legality.",
			"Sustainability Integration: Sustainability is a core principle of our design philosophy. We incorporate green plumbing practices, such as rainwater harvesting, greywater recycling, and low-flow fixtures, to minimize environmental impact.",
			"Seamless Integration: Our plumbing system designs seamlessly integrate with other building systems, such as HVAC and electrical, optimizing space and functionality.",
			"Maintenance Considerations: We design systems with future maintenance in mind, ensuring that repairs and upkeep are straightforward and cost-effective.",
		],
		serviceTypes: [
			"Residential Plumbing: MyDearCity Builders Pvt Ltd designs plumbing systems for all types of residential projects, from single-family homes to multi-unit residential complexes, meeting the unique needs of homeowners and residents.",
			"Commercial Plumbing: Our designs for commercial buildings prioritize efficient water supply and drainage, essential for smooth daily operations.",
			"Industrial Plumbing: We have extensive experience in designing plumbing systems for industrial facilities, ensuring they can handle the demands of large-scale operations.",
			"Renovation and Upgrades: Whether you’re renovating an existing space or need plumbing system upgrades, we provide solutions that seamlessly integrate with your project’s requirements.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We design efficient plumbing layouts and select quality materials for your project.",
			},
			{
				title: "Design",
				description:
					"Our experts install reliable plumbing systems with modern fixtures and technology.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver efficient plumbing systems with comprehensive testing and warranty.",
			},
		],
		features: [
			"Water supply system design",
			"Drainage and sewage planning",
			"Fixture installation",
			"Water heating systems",
			"Water conservation features",
			"Maintenance access planning",
		],
		process: [
			"Plumbing layout design",
			"Material and fixture selection",
			"Pipe routing and installation",
			"Fixture installation",
			"System testing and commissioning",
			"Quality assurance",
		],
		benefits: [
			"Reliable water supply",
			"Efficient drainage",
			"Water conservation",
			"Reduced maintenance",
			"Enhanced comfort",
		],
		duration: "1-3 weeks",
		materials: [
			"Quality pipes and fittings",
			"Modern fixtures",
			"Water heaters",
		],
		relatedServices: [
			"plumbing-installation",
			"waterproofing-termite",
			"interior-design",
		],
	},
	{
		title: "Flooring & Tiling Work",
		description: "Seamless, durable spaces.",
		image: flooring,
		slug: "flooring-tiling",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we recognize that the foundation of every beautiful space lies beneath your feet. Our comprehensive flooring and tiling work services are designed to enhance the aesthetic appeal, functionality, and durability of your interiors. We offer a wide range of flooring and tiling options to suit your unique style and requirements.",
		significance:
			"Flooring and tiling play a crucial role in setting the tone for your living or working space. The right choice of materials and expert installation can elevate the atmosphere, improve comfort, and increase the value of your property. Our professional flooring and tiling services ensure that every step you take is on a solid foundation.",
		approach:
			"Our skilled craftsmen and design experts collaborate to provide you with flooring and tiling solutions that align seamlessly with your design vision. Here’s how we approach flooring and tiling work at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Consultation and Selection: We start by understanding your preferences, lifestyle, and budget. Our experts guide you through the selection of flooring and tiling materials, helping you choose the best fit for your space.",
			"Design Integration: Our team ensures that the chosen materials and patterns are harmoniously integrated into the overall design of your project, complementing the aesthetics of the space.",
			"Quality Installation: We take pride in our precise and meticulous installation process. Our skilled craftsmen use industry-best practices to ensure a flawless finish.",
			"Durability and Maintenance: We prioritize materials known for their durability, easy maintenance, and resistance to wear and tear, ensuring longevity and cost-effectiveness.",
			"Variety of Options: MyDearCity Builders Pvt Ltd offers a wide range of flooring and tiling options, including hardwood, laminate, ceramic, porcelain, marble, and more, to suit your design preferences.",
		],
		serviceTypes: [
			"Residential Flooring: We provide flooring and tiling solutions for homes, creating comfortable and aesthetically pleasing living spaces.",
			"Commercial Flooring: Our services extend to commercial spaces, ensuring that the chosen materials can withstand heavy foot traffic and enhance the professional environment.",
			"Outdoor Tiling: We offer outdoor tiling solutions for patios, decks, and pathways, combining functionality with outdoor aesthetics.",
			"Custom Tiling: If you have unique design ideas or patterns in mind, we excel in custom tiling work to bring your vision to life.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We assess your space and select the perfect flooring materials for your needs.",
			},
			{
				title: "Design",
				description:
					"Our experts install beautiful, durable flooring with precision and care.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver stunning floors with comprehensive quality assurance and warranty.",
			},
		],
		features: [
			"Floor preparation and leveling",
			"Tile and stone installation",
			"Wooden flooring",
			"Carpet and vinyl installation",
			"Grouting and sealing",
			"Pattern and design work",
		],
		process: [
			"Floor assessment and preparation",
			"Material selection and ordering",
			"Subfloor preparation",
			"Installation and laying",
			"Grouting and finishing",
			"Quality inspection",
		],
		benefits: [
			"Enhanced aesthetics",
			"Improved durability",
			"Easy maintenance",
			"Increased property value",
			"Better indoor air quality",
		],
		duration: "1-2 weeks",
		materials: ["Quality tiles", "Adhesives and grouts", "Flooring materials"],
		relatedServices: [
			"interior-design",
			"painting-putty",
			"renovation-restructuring",
		],
	},
	{
		title: "Loan & Legal Assistance",
		description: "Support with paperwork & approvals.",
		image: loan,
		slug: "loan-legal",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we understand that the journey to owning your dream home or property can be both exciting and complex. That’s why we offer comprehensive home loan and legal compliance assistance services to guide you through the financial and legal aspects of your construction or property acquisition. Our goal is to make the process smoother and ensure that every step is compliant with the law.",
		significance:
			"Professional loan and legal assistance plays a vital role in safeguarding your financial interests. From securing the right loan options to ensuring compliance with legal requirements, expert support helps reduce risks, avoid costly mistakes, and achieve your goals with confidence.",
		approach:
			"Our experts in finance and legal compliance work diligently to provide you with guidance and support that aligns with your specific needs. Here’s how we approach these services at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Home Loan Assistance: Dreaming of homeownership? We offer support for homebuyers in securing the ideal home loan. Our experts will help you understand your options and guide you through the application process.",
			"Financial Assessment: We begin by assessing your financial situation and goals to determine the loan amount, interest rates, and repayment terms that best suit your needs.",
			"Lender Connections: Our network of lending partners allows us to connect you with reputable financial institutions offering competitive home loan options.",
			"Loan Application Support: We assist you in completing loan applications, ensuring that all necessary documentation is in order, expediting the loan approval process.",
			"Interest Rate Negotiation: Our experts negotiate on your behalf to secure the most favorable interest rates and loan terms possible.",
			"Regulatory Guidance: We provide comprehensive guidance on local building and zoning regulations, ensuring your construction project complies with all legal requirements.",
			"Permit Acquisition: Our team assists in obtaining the necessary permits and licenses to commence construction, avoiding costly delays and legal issues.",
			"Contract Review: We review contracts and agreements to ensure that your interests are protected and that the terms are fair and legally sound.",
			"Property Title Checks: Our experts conduct thorough title searches to verify property ownership and ensure that there are no encumbrances or legal issues.",
		],
		serviceTypes: [
			"Home Loan Consultation: We provide personalized consultations to help you understand your home loan options and make informed financial decisions.",
			"Construction Legal Compliance: Our legal compliance services are tailored to construction projects, ensuring adherence to local building codes and regulations.",
			"Property Purchase Assistance: If you’re buying property, we offer assistance with the legal aspects of the transaction, including title checks and contract reviews.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We assess your financial needs and prepare comprehensive loan applications.",
			},
			{
				title: "Design",
				description:
					"Our experts handle all legal documentation and regulatory compliance.",
			},
			{
				title: "Get Paid",
				description:
					"We ensure smooth project financing with transparent terms and conditions.",
			},
		],
		features: [
			"Construction loan assistance",
			"Legal documentation support",
			"Permit application guidance",
			"Insurance consultation",
			"Contract review and preparation",
			"Regulatory compliance",
		],
		process: [
			"Initial consultation and assessment",
			"Document preparation and review",
			"Application submission",
			"Follow-up and coordination",
			"Approval and documentation",
			"Ongoing support",
		],
		benefits: [
			"Simplified approval process",
			"Reduced legal risks",
			"Cost savings",
			"Time efficiency",
			"Professional guidance",
		],
		duration: "2-6 weeks",
		materials: ["Legal documents", "Application forms", "Supporting materials"],
		relatedServices: ["authority-compliance", "planning-design", "civil-works"],
	},
	{
		title: "All Civil Works",
		description: "Efficient work from brick to finish.",
		image: civil,
		slug: "civil-works",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we take pride in offering a wide range of civil works services that cater to the diverse needs of our clients. With a team of skilled professionals, state-of-the-art equipment, and a commitment to quality, we’re your trusted partner for all your civil construction and infrastructure projects.",
		significance:
			"Civil works are the backbone of any construction project, providing the structural framework and basic infrastructure. Quality civil work ensures the stability, durability, and safety of your building. Professional civil construction prevents structural issues, reduces maintenance costs, and ensures long-term value.",
		approach:
			"Our civil works approach is systematic and quality-focused. We use proven construction techniques, quality materials, and experienced craftsmen to deliver durable and reliable structures. We maintain strict quality control throughout the construction process.",
		approachSteps: [
			"Site Development: Our site development services encompass everything from land clearing and excavation to grading and drainage. We prepare your site for construction, ensuring it meets all necessary specifications and regulations.",
			"Foundation Construction: A strong foundation is essential for any structure. We specialize in constructing durable and stable foundations for residential, commercial, and industrial buildings, tailored to your project’s unique requirements.",
			"Building Construction: Whether you need a residential home, a commercial space, or an industrial facility, we have the capabilities to bring your construction project to life. Our attention to detail and commitment to quality set us apart.",
			// "Renovation and Remodeling: We breathe new life into existing structures through renovation and remodeling services. Our experts can transform outdated spaces into modern, functional, and aesthetically pleasing environments.",
		],
		// serviceTypes: [
		//   "Foundation and Excavation Work",
		//   "Brickwork and Masonry",
		//   "Concrete Work and Reinforcement",
		//   "Plastering and Finishing",
		//   "Roof Construction",
		//   "Site Development"
		// ],
		processSteps: [
			{
				title: "Planning",
				description:
					"We prepare the site and create a strong foundation for your construction project.",
			},
			{
				title: "Design",
				description:
					"Our experts build durable structures using quality materials and proven techniques.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver solid construction with comprehensive quality assurance and warranty.",
			},
		],
		features: [
			"Foundation and excavation work",
			"Brickwork and masonry",
			"Concrete work and reinforcement",
			"Plastering and finishing",
			"Roof construction",
			"Site development",
		],
		process: [
			"Site preparation and excavation",
			"Foundation construction",
			"Structural work",
			"Masonry and brickwork",
			"Plastering and finishing",
			"Quality control and testing",
		],
		benefits: [
			"Strong foundation",
			"Quality construction",
			"Durability assurance",
			"Cost-effective solutions",
			"Timely completion",
		],
		duration: "8-16 weeks",
		materials: [
			"Quality cement",
			"Reinforcement steel",
			"Construction materials",
		],
		relatedServices: [
			"structural-design",
			"planning-design",
			"authority-compliance",
		],
	},
	{
		title: "Local Authority Compliance",
		description: "Compliant with all standards.",
		image: authority,
		slug: "authority-compliance",
		longDescription:
			"At MyDearCity Builders, we are leaders in managing the complex and ever-evolving landscape of local authority regulations and compliance. With an unwavering commitment to excellence, we provide end-to-end solutions tailored to ensure your projects meet all legal and statutory requirements. Our expertise spans every stage of the construction lifecycle, offering unparalleled support to make your vision a reality without any regulatory roadblocks.",
		significance:
			"Compliance with local authority regulations is essential for legal construction and property ownership. It ensures that your project meets safety, environmental, and zoning requirements. Professional compliance services prevent legal issues, delays, and costly penalties while ensuring your project proceeds smoothly.",
		approach:
			"Our compliance approach is thorough and proactive. We stay updated with all regulatory changes and requirements. We work closely with local authorities to ensure smooth approval processes and maintain open communication throughout the compliance journey.",
		approachSteps: [
			"Regulatory requirement analysis and documentation",
			"Application preparation and submission",
			"Authority coordination and follow-up",
			"Inspection scheduling and coordination",
			"Compliance verification and certification",
			"Ongoing regulatory support",
		],
		serviceTypes: [
			"Building Permit Applications",
			"Regulatory Compliance Review",
			"Documentation Preparation",
			"Authority Coordination",
			"Inspection Scheduling",
			"Compliance Certification",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We analyze regulatory requirements and prepare comprehensive compliance documentation.",
			},
			{
				title: "Design",
				description:
					"Our experts coordinate with authorities and ensure all requirements are met.",
			},
			{
				title: "Get Paid",
				description:
					"We secure all necessary approvals with transparent communication and support.",
			},
		],
		features: [
			"Building permit applications",
			"Regulatory compliance review",
			"Documentation preparation",
			"Authority coordination",
			"Inspection scheduling",
			"Compliance certification",
		],
		process: [
			"Regulatory requirement analysis",
			"Document preparation",
			"Application submission",
			"Authority coordination",
			"Inspection and approval",
			"Compliance certification",
		],
		benefits: [
			"Regulatory compliance",
			"Reduced legal risks",
			"Smooth project execution",
			"Professional credibility",
			"Future-proof approvals",
		],
		duration: "4-8 weeks",
		materials: [
			"Compliance documents",
			"Application forms",
			"Supporting materials",
		],
		relatedServices: ["planning-design", "loan-legal", "structural-design"],
	},
	{
		title: "Installation Of Electrical Systems",
		description: "Strengthening with smart fittings.",
		image: electricalInstall,
		slug: "electrical-installation",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we believe that the heart of any home is its electrical system. As experienced architects and builders, we understand that a well-designed and expertly installed electrical system is essential for modern living. That’s why we offer comprehensive electrical design and installation services, ensuring your home is not only beautiful but also functional and safe.",
		significance:
			"A well-planned electrical system is the backbone of a comfortable and functional home. It provides power for lighting, appliances, electronics, and more. Our electrical design and installation services prioritize safety, efficiency, and convenience to enhance your daily life.",
		approach:
			"Our multidisciplinary team of architects and electrical engineers work together to seamlessly integrate electrical systems into your home’s design. Here’s how we approach electrical design and installation at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Customized Design: We begin by understanding your lifestyle and specific needs. Our team customizes the electrical design to meet your requirements, ensuring adequate outlets, lighting, and wiring for all areas of your home.",
			"Safety First: Safety is our top priority. We adhere to all safety codes and regulations, ensuring that your electrical system is safe for you and your family.",
			"Energy Efficiency: We prioritize energy-efficient solutions to minimize your electricity consumption, reducing both your carbon footprint and utility bills.",
			"Smart Home Integration: If desired, we can incorporate smart home technology into your electrical system, allowing you to control lighting, HVAC, security, and more with ease.",
			"Seamless Integration: Our electrical systems are seamlessly integrated into your home’s architecture, minimizing visual clutter and maximizing aesthetics.",
		],
		serviceTypes: [
			"New Home Construction: For new homes, we design and install electrical systems from scratch, ensuring that your home is powered efficiently and safely.",
			"Home Renovations: If you’re renovating your home, we can upgrade your electrical system to meet modern standards and accommodate your changing needs.",
			"Electrical Panel Upgrades: We provide electrical panel upgrades to increase capacity and ensure your home can handle today’s electrical demands.",
			"Lighting Design: Our experts can create customized lighting designs to enhance the ambiance and functionality of your living spaces.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We design efficient electrical layouts and procure quality materials for installation.",
			},
			{
				title: "Design",
				description:
					"Our certified electricians install safe, reliable electrical systems with modern technology.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver tested electrical systems with comprehensive safety features and warranty.",
			},
		],
		features: [
			"Wiring and cabling installation",
			"Switchboard and panel installation",
			"Lighting fixture installation",
			"Safety system installation",
			"Testing and commissioning",
			"Maintenance support",
		],
		process: [
			"Electrical layout planning",
			"Material procurement",
			"Wiring and cabling installation",
			"Fixture and equipment installation",
			"Testing and safety checks",
			"Commissioning and handover",
		],
		benefits: [
			"Safe electrical systems",
			"Reliable power supply",
			"Energy efficiency",
			"Reduced maintenance",
			"Professional installation",
		],
		duration: "1-3 weeks",
		materials: [
			"Quality electrical components",
			"Safety equipment",
			"Lighting fixtures",
		],
		relatedServices: ["electrical-design", "interior-design", "plumbing-work"],
	},

	{
		title: "Installation Of Doors & Windows",
		description: "Durable, stylish doors & windows.",
		image: doors,
		slug: "doors-windows",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we believe that doors and windows are the portals to both comfort and style within your home or building. Our door and window installation services are designed to provide you with not only functional access points but also beautiful and energy-efficient solutions. We take pride in ensuring that your doors and windows not only enhance security but also elevate the overall aesthetic of your space.",
		significance:
			"The installation of doors and windows is a critical component of any construction project. Proper installation guarantees a secure and weather-tight envelope for your building. Our professional door and window installation services are crucial for ensuring the longevity, energy efficiency, and aesthetics of your space.",
		approach:
			"Our skilled craftsmen and design experts collaborate to deliver door and window solutions that align seamlessly with your architectural design. Here’s how we approach door and window installation at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Residential Installation: Our services cater to homes, ensuring that the doors and windows installed meet the specific needs of homeowners.",
			"Commercial Installation: We extend our expertise to commercial spaces, providing solutions that enhance security, energy efficiency, and aesthetics for businesses.",
			"Custom Installations: If you have unique design ideas or architectural requirements, we excel in custom door and window installations to meet your vision.",
		],
		// serviceTypes: [
		//   "Door Frame Installation",
		//   "Window Frame Installation",
		//   "Hardware Installation",
		//   "Weather Sealing",
		//   "Security Features",
		//   "Energy Efficiency Optimization"
		// ],
		processSteps: [
			{
				title: "Planning",
				description:
					"We prepare frames and ensure precise measurements for perfect fit.",
			},
			{
				title: "Design",
				description:
					"Our experts install quality doors and windows with professional hardware.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver secure, energy-efficient installations with comprehensive warranty.",
			},
		],
		features: [
			"Door frame installation",
			"Window frame installation",
			"Hardware installation",
			"Weather sealing",
			"Security features",
			"Energy efficiency optimization",
		],
		process: [
			"Frame preparation and installation",
			"Door/window fitting",
			"Hardware installation",
			"Weather sealing",
			"Testing and adjustment",
			"Final inspection",
		],
		benefits: [
			"Enhanced security",
			"Energy efficiency",
			"Improved aesthetics",
			"Better insulation",
			"Long-term durability",
		],
		duration: "1-2 weeks",
		materials: [
			"Quality doors and windows",
			"Hardware and fittings",
			"Sealing materials",
		],
		relatedServices: [
			"interior-design",
			"painting-putty",
			"renovation-restructuring",
		],
	},
	{
		title: "Renovation & Restructuring",
		description: "Lasting value, modern appeal.",
		image: renovation,
		slug: "renovation-restructuring",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we believe in preserving the past while creating a brighter future. Our renovation and restructuring services for old homes are designed to breathe new life into historic properties, ensuring that they continue to stand as timeless treasures. We combine modern innovations with a deep respect for heritage to transform old homes into functional, stylish, and comfortable living spaces.",
		// significance:
		// 	"Renovation and restructuring can significantly increase your property's value, functionality, and appeal. It allows you to adapt your space to changing needs without the cost and hassle of moving. Professional renovation ensures quality work, proper permits, and lasting results that enhance your living experience.",
		approach:
			"Our experienced team of architects, designers, and craftsmen collaborate to provide renovation and restructuring solutions that honor the past while embracing the future. Here’s how we approach these services at MyDearCity Builders Pvt Ltd:",
		approachSteps: [
			"Historical Research: We begin by conducting research to understand the historical significance of your property. This helps us preserve unique architectural elements and design features.",
			"Functional Modernization: We update outdated layouts and systems, enhancing the functionality of your home while preserving its character.",
			"Energy Efficiency: We prioritize energy-efficient upgrades, from insulation to HVAC systems, to reduce utility costs and environmental impact.",
			"Design Integration: Our architects and designers seamlessly integrate modern design elements with historical features, creating cohesive and harmonious interiors.",
			"Structural Enhancements: If necessary, we reinforce and strengthen the structural integrity of the home to meet modern safety standards.",
			"Customization: We work closely with you to ensure that the renovated home aligns with your preferences and lifestyle.",
		],
		serviceTypes: [
			"Historic Home Restoration: Our restoration services are tailored to preserve the historical authenticity of your property, including the restoration of period-specific details.",
			"Modernization and Upgrades: We provide exterior painting services to protect and beautify the exterior of your home or building, increasing curb appeal and weather resistance.",
			"Structural Renovation: If your old home requires structural improvements, we offer solutions that ensure its stability and safety.",
			"Interior and Exterior Renovation: Our services cover both interior and exterior renovations, transforming your property into a cohesive and inviting space.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We assess your space and create a comprehensive renovation plan.",
			},
			{
				title: "Design",
				description:
					"Our experts transform your space with modern upgrades and improvements.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver stunning renovations that enhance value and functionality.",
			},
		],
		features: [
			"Space reconfiguration",
			"Structural modifications",
			"Interior renovations",
			"Exterior improvements",
			"Modern upgrades",
			"Value enhancement",
		],
		process: [
			"Assessment and planning",
			"Structural evaluation",
			"Design development",
			"Construction and renovation",
			"Quality control",
			"Final inspection",
		],
		benefits: [
			"Increased property value",
			"Modern functionality",
			"Enhanced aesthetics",
			"Improved comfort",
			"Better space utilization",
		],
		duration: "4-12 weeks",
		materials: ["Modern materials", "Quality fixtures", "Upgraded systems"],
		relatedServices: ["interior-design", "structural-design", "painting-putty"],
	},
	{
		title: "Waterproofing & Termite Proofing",
		description: "Leak-proof solutions for secure spaces.",
		image: waterproofing,
		slug: "waterproofing-termite",
		longDescription:
			"At MyDearCity Builders Pvt Ltd, we recognize that protecting your home or building against the elements and pests is a critical aspect of ensuring its longevity and your peace of mind. Our waterproofing and termite proofing services are designed to safeguard your space from water damage and termite infestations. We offer comprehensive solutions that not only protect but also enhance the durability and resilience of your property.",
		significance:
			"Water damage and termite infestations can cause significant structural and financial issues. Professional waterproofing and termite proofing services are essential to prevent these problems, ensuring the longevity and value of your property.",
		approach:
			"Our waterproofing and termite proofing approach is thorough and preventive. We use advanced technologies, quality materials, and proven treatment methods. We provide comprehensive coverage and ongoing maintenance guidance to ensure long-term protection.",
		approachSteps: [
			"Comprehensive site assessment and inspection",
			"Treatment planning and material selection",
			"Surface preparation and application",
			"Quality testing and verification",
			"Maintenance guidance and follow-up",
			"Ongoing protection monitoring",
		],
		serviceTypes: [
			"Basement Waterproofing: We protect basements from water infiltration, ensuring a dry and usable space.",
			"Roof Waterproofing: Our roof waterproofing services prevent leaks and extend the life of your roof.",
			"Foundation Waterproofing: We safeguard your property’s foundation against water damage, which can compromise structural integrity.",
			"Termite Control: Our termite proofing services protect both residential and commercial properties from costly termite damage.",
		],
		processSteps: [
			{
				title: "Planning",
				description:
					"We assess your property and create a comprehensive protection plan.",
			},
			{
				title: "Design",
				description:
					"Our experts apply advanced waterproofing and termite treatments.",
			},
			{
				title: "Get Paid",
				description:
					"We deliver comprehensive protection with ongoing maintenance support.",
			},
		],
		features: [
			"Basement waterproofing",
			"Roof waterproofing",
			"Bathroom waterproofing",
			"Termite treatment",
			"Chemical barriers",
			"Preventive measures",
		],
		process: [
			"Site assessment and inspection",
			"Treatment planning",
			"Surface preparation",
			"Application of treatments",
			"Quality testing",
			"Maintenance guidance",
		],
		benefits: [
			"Water damage prevention",
			"Pest protection",
			"Structural integrity",
			"Long-term savings",
			"Peace of mind",
		],
		duration: "1-3 weeks",
		materials: [
			"Waterproofing materials",
			"Termite treatments",
			"Protective coatings",
		],
		relatedServices: [
			"plumbing-work",
			"structural-design",
			"renovation-restructuring",
		],
	},
];
