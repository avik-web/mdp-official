"use client";
import SocialLinks from "@/components/common/SocialLinks";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* <OfferPopup /> */}
			<SocialLinks />
			{/* <ChatBot/> */}
			{/* <WhatsAppButton /> */}
			{children}
		</>
	);
};

export default MainLayout;
