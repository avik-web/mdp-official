"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

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
				throw new Error(data.message || "Something went wrong");
			}

			toast.success("Message sent successfully!");
			setFormData({
				name: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to send message"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section>
			<div className="grid grid-cols-1">
				{/* Contact Form */}
				<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Full Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Enter your name"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-black"
								/>
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
									name="email"
									id="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Enter your email"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-black"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Phone Number
								</label>
								<input
									type="tel"
									name="phone"
									id="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="+91 123 456 7890"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-black"
								/>
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
									name="subject"
									id="subject"
									value={formData.subject}
									onChange={handleChange}
									placeholder="Project Inquiry"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-black"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Your Message
							</label>
							<textarea
								name="message"
								id="message"
								rows={4}
								value={formData.message}
								onChange={handleChange}
								placeholder="Tell us about your project..."
								required
								className="w-full px-4 py-2 h-[60px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none text-black"
							></textarea>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#1E2023] cursor-pointer"
						>
							{isSubmitting ? "Sending..." : "Send Message"}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
