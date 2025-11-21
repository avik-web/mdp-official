import { MessageCircle } from "lucide-react";
import Link from "next/link";

const WhatsAppButton = () => {
	const phoneNumber = "+919332552776"; // Your WhatsApp number
	const message = "Hello! I'd like to know more about your services."; // Default message
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		message
	)}`;

	return (
		<Link
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 group"
			aria-label="Chat with us on WhatsApp"
		>
			<MessageCircle className="w-6 h-6" />
			<span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
				Chat with us
			</span>
		</Link>
	);
};

export default WhatsAppButton;
