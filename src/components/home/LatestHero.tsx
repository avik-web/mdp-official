"use client";
import React from "react";
import ContactForm from "./Form";
import { House, Star } from "lucide-react";

const LatestHero = () => {
	return (
		<div className="relative md:mb-40">
			<header className="w-full h-[780px] max-sm:h-[600px] bg-[url('/assets/home/background.jpg')] bg-cover bg-center bg-no-repeat max-sm:bg-none">
				<div className="md:w-[80%] absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
				<div className="max-w-7xl absolute top-10 md:top-1/3 left-4 md:left-[45%] transform md:-translate-x-1/2 md:-translate-y-1/2">
					<h1 className="md:w-[60%] max-sm:w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-gray-900 mb-4">
						Build Your Dream Home With Us
					</h1>
					<p className="md:w-[45%] max-sm:w-full text-lg text-gray-600">
						We provide end-to-end construction, design, and legal services to
						bring your vision to life.
					</p>
				</div>
			</header>
			<ContactForm />
			<div className="flex flex-wrap items-center gap-20 absolute -bottom-20 right-30 overflow-hidden text-black font-bold text-2xl max-sm:hidden">
				<p className="flex items-center text-4xl gap-3">
					<Star fill="black" size={40} />
					4.9/5
				</p>
				<div className="flex items-center gap-3">
					<House size={40} />
					<p>
						500+
						<span className="text-gray-500 font-medium">
							Homes <br /> Delivered
						</span>
					</p>
				</div>
				<p>
					Peaceful <br />{" "}
					<span className="text-gray-500 font-medium">Living</span>
				</p>
				<p>
					Quality <br />{" "}
					<span className="text-gray-500 font-medium">Construction</span>
				</p>
			</div>
		</div>
	);
};

export default LatestHero;
