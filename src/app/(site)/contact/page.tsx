"use client"; // Add this at the top for Next.js App Router

import MainHeader from "@/components/common/MainHeader";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import {
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [successMessage, setSuccessMessage] = useState("");
	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrors({});
		setSuccessMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				if (response.status === 400 && data.errors) {
					const newErrors: Record<string, string> = {};
					data.errors.forEach((err: { field: string; message: string }) => {
						newErrors[err.field] = err.message;
					});
					setErrors(newErrors);
				} else {
					throw new Error(data.message || "Failed to submit form");
				}
			} else {
				setSuccessMessage("Message sent successfully!");
				setFormData({
					name: "",
					email: "",
					subject: "",
					message: "",
				});
				router.refresh();
			}
		} catch (error) {
			console.error("Submission error:", error);
			setErrors({ form: "An unexpected error occurred. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Nav />
			{/* Hero Section */}
			<section>
				{/* <div className="absolute inset-0">
					<Image
						src="/assets/home/front-gate.jpeg"
						alt="Contact Us"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black opacity-60"></div>
				</div>
				<div className="relative h-full flex items-center justify-center">
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
							Contact Us
						</h1>
						<p className="text-xl text-gray-200">
							We&apos;d love to hear from you
						</p>
					</div>
				</div> */}
				<MainHeader
					title="Contact Us"
					description="We'd love to hear from you"
				/>
			</section>

			{/* Contact Information Cards */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Contact Form and Map Section */}
					<div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<div className="bg-white rounded-xl border p-8">
							<h2 className="text-3xl font-bold text-gray-900 mb-8">
								Get In Touch
							</h2>
							{successMessage && (
								<div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
									{successMessage}
								</div>
							)}
							{errors.form && (
								<div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
									{errors.form}
								</div>
							)}
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Full Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											placeholder="Enter Your Name"
											value={formData.name}
											onChange={handleChange}
											className={`w-full px-4 py-2 rounded-lg border text-black ${
												errors.name ? "border-red-500" : "border-gray-300"
											} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
											required
										/>
										{errors.name && (
											<p className="mt-1 text-sm text-red-600">{errors.name}</p>
										)}
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Email Address
										</label>
										<input
											type="email"
											id="email"
											name="email"
											placeholder="Enter Your Email address"
											value={formData.email}
											onChange={handleChange}
											className={`w-full px-4 py-2 rounded-lg border text-black ${
												errors.email ? "border-red-500" : "border-gray-300"
											} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
											required
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-red-600">
												{errors.email}
											</p>
										)}
									</div>
								</div>
								<div>
									<label
										htmlFor="subject"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Subject
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										placeholder="Enter the Subject of Your Message"
										value={formData.subject}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border text-black ${
											errors.subject ? "border-red-500" : "border-gray-300"
										} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
										required
									/>
									{errors.subject && (
										<p className="mt-1 text-sm text-red-600">
											{errors.subject}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										placeholder="Enter the Details of Your Message"
										value={formData.message}
										onChange={handleChange}
										rows={6}
										className={`w-full px-4 py-2 rounded-lg border text-black ${
											errors.message ? "border-red-500" : "border-gray-300"
										} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
										required
									></textarea>
									{errors.message && (
										<p className="mt-1 text-sm text-red-600">
											{errors.message}
										</p>
									)}
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#1E2023] hover:bg-[#2E3033] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									{isSubmitting ? "Sending..." : "Send Message"}
								</button>
							</form>
						</div>

						{/* Address, ph-no, email */}
						<div className="bg-white rounded-xl border p-8">
							<h2 className="text-3xl font-bold text-gray-900 mb-8">
								Reach Out To Us
							</h2>
							<p className="text-gray-600 mb-6">
								We’re here to assist with any questions, concerns, or inquiries
								contact us today!
							</p>

							{/* <!-- Address --> */}
							<div className="flex items-center gap-4 mb-4 mt-4">
								<div className="w-10 h-10 flex items-center justify-center rounded-full border">
									<MapPin className="text-black" size={20} />
								</div>
								<div>
									<h2 className="text-black">Head Office</h2>
									<p className="text-gray-600 hover:text-primary transition-colors">
										RA - 31, Tara Shankar Sarani, City Center, Durgapur, West
										Bengal, 713216
									</p>
								</div>
							</div>

							{/* Phone-no */}
							<div className="flex items-center gap-4 mb-4 mt-8">
								<div className="w-10 h-10 flex items-center justify-center rounded-full border">
									<Phone className="text-black " size={20} />
								</div>
								<div>
									<h2 className="text-black">Phone</h2>
									<a
										href="tel:+917811831313"
										className=" text-gray-600 hover:text-primary transition-colors"
									>
										+91 7811831313
									</a>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-center gap-4 mb-4 mt-8">
								<div className="w-10 h-10 flex items-center justify-center rounded-full border">
									<Mail className="text-black" size={20} />
								</div>
								<div>
									<h2 className="text-black">Email</h2>
									<a
										href="mailto:info@mydearcitybuilders.com"
										className=" text-gray-600 hover:text-primary transition-colors"
									>
										info@mydearcitybuilders.com
									</a>
								</div>
							</div>

							{/* Social media  */}
							<div>
								<h2 className="text-2xl font-bold text-gray-900 mb-8 mt-8">
									Follow Us
								</h2>

								<div className="text-gray-600 flex  leading-relaxed text-base mt-6 ">
									<a
										href="https://www.facebook.com/MyDearCityBuilders"
										className="text-gray-600 hover:text-primary transition-colors mr-4"
									>
										<Facebook className="w-6 h-6 " />
									</a>
									<a
										href="https://www.instagram.com/mydearcitybuilders_official/"
										className="text-gray-600 hover:text-primary transition-colors mr-4"
									>
										<Instagram className="w-6 h-6" />
									</a>
									<a
										href="https://www.youtube.com/@mydearcitybuilders?feature=shared"
										className="text-gray-600 hover:text-primary transition-colors"
									>
										{/* <Youtube className="w-6 h-6" /> */}
										<Youtube className="w-6 h-6" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Map Location part  */}
			<div className="relative h-[400px] rounded-lg overflow-hidden mb-16 max-sm:mb-1 px-16 max-sm:px-4">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2490.307295807694!2d87.30902776989464!3d23.541805165722966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDMyJzI2LjEiTiA4N8KwMTgnMzIuOCJF!5e0!3m2!1sen!2sin!4v1762352468960!5m2!1sen!2sin"
					width="100%"
					height="100%"
					style={{ border: 0, borderRadius: "30px" }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>

			<Footer />
		</div>
	);
}
