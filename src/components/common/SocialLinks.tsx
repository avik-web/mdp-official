import { Facebook, Instagram, MessageCircleMore, Youtube } from "lucide-react";
import Link from "next/link";

const SocialLinks = () => {
	const phoneNumber = "+919332552776"; // Your WhatsApp number
	const message = "Hello! I'd like to know more about your services."; // Default message
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		message
	)}`;
	return (
		<div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
			<Link
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="bg-[#25D366] text-white w-12 h-12 flex items-center justify-center rounded-tl-xl rounded-bl-xl shadow-lg hover:bg-[#25D366] transition-all duration-300 hover:scale-110 group"
				aria-label="Follow us on Facebook"
			>
				<MessageCircleMore className="w-6 h-6" />
			</Link>
			{/* Facebook Link */}
			<Link
				href="https://www.facebook.com/mydearcitybuilders"
				target="_blank"
				rel="noopener noreferrer"
				className="bg-[#1877F2] text-white w-12 h-12 flex items-center justify-center rounded-tl-xl rounded-bl-xl shadow-lg hover:bg-[#0d6efd] transition-all duration-300 hover:scale-110 group"
				aria-label="Follow us on Facebook"
			>
				<Facebook className="w-6 h-6" />
			</Link>

			{/* Instagram Link */}
			<Link
				href="https://www.instagram.com/mydearcitybuilders_official/"
				target="_blank"
				rel="noopener noreferrer"
				className="bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white w-12 h-12 flex items-center justify-center rounded-tl-xl rounded-bl-xl shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 group"
				aria-label="Follow us on Instagram"
			>
				<Instagram className="w-6 h-6" />
			</Link>

			{/* Youtube Link */}
			<Link
				href="https://youtube.com/@mydearcitybuilders?feature=shared"
				target="_blank"
				rel="noopener noreferrer"
				className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-tl-xl rounded-bl-xl shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 group"
				aria-label="Follow us on Instagram"
			>
				<Youtube className="w-6 h-6" />
			</Link>
		</div>
	);
};

export default SocialLinks;
