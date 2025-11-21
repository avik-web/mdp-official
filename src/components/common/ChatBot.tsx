"use client";

import { Bot, Send, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ChatBot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Hello from MyDearCity Builders, How can I assist you today?",
			isBot: true,
			timestamp: new Date(),
		},
	]);
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = () =>
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	useEffect(() => {
		scrollToBottom();
	}, [messages]);
	useEffect(() => {
		if (isOpen && inputRef.current) inputRef.current.focus();
	}, [isOpen]);

	const formatBotResponse = (text) => {
		if (!text) return "";
		return text
			.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
			.replace(/^\s*\*\s+/gm, "• ")
			.replace(/^\s*-\s+/gm, "– ")
			.replace(/^\s*(\d+)\.\s+/gm, "$1. ")
			.replace(/\n/g, "<br />");
	};

	const FormattedText = ({ text }) => (
		<div dangerouslySetInnerHTML={{ __html: formatBotResponse(text) }} />
	);

	const sendMessage = async () => {
		if (!inputText.trim() || isLoading) return;
		const currentMessage = inputText;
		const userMessage = {
			id: Date.now(),
			text: currentMessage,
			isBot: false,
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMessage]);
		setInputText("");
		setIsLoading(true);

		try {
			const response = await fetch(process.env.NEXT_PUBLIC_N8N_CHAT_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					message: currentMessage,
					chatInput: currentMessage,
					query: currentMessage,
					text: currentMessage,
					sessionId: `session-${Date.now()}`,
				}),
			});

			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();

			let botResponse = "";
			if (data.output) botResponse = data.output;
			else if (data.response) botResponse = data.response;
			else if (data.message) botResponse = data.message;
			else if (data.text) botResponse = data.text;
			else if (typeof data === "string") botResponse = data;
			else if (Array.isArray(data) && data.length > 0) {
				botResponse =
					data[0].output ||
					data[0].response ||
					data[0].message ||
					data[0].text ||
					JSON.stringify(data[0]);
			} else {
				botResponse =
					"I received your message but couldn't parse the response format.";
			}

			const botMessage = {
				id: Date.now() + 1,
				text: botResponse,
				isBot: true,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			const errorMessage = {
				id: Date.now() + 1,
				text: `Error: ${error.message}. Please check the console for more details.`,
				isBot: true,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const formatTime = (timestamp) =>
		timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

	return (
		<>
			{!isOpen && (
				<div className="fixed bottom-6 md:bottom-6 right-5 z-50">
					<div className="relative">
						<div className="hidden md:block absolute bottom-18 right-4 bg-orange-50 text-gray-800 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm border border-orange-100 animate-pulse">
							Hello 👋
							<div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-orange-50"></div>
						</div>

						<button
							onClick={() => setIsOpen(true)}
							className="bg-emerald-400 hover:bg-emerald-500 text-black p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
							aria-label="Open chat"
						>
							<Bot
								size={30}
								color="white"
								className="group-hover:scale-110 transition-transform"
							/>
						</button>
					</div>
				</div>
			)}

			{isOpen && (
				<div
					className="
            fixed z-[51]
            bottom-24 right-2 md:bottom-6 md:right-6
            w-[min(98vw,370px)] md:w-96
            h-[min(80vh,560px)] md:h-[600px]
            max-h-[85vh]
            bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-200
            flex flex-col overflow-hidden
            pb-[env(safe-area-inset-bottom)]
          "
					role="dialog"
					aria-label="Chat window"
				>
					<div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-4 flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="bg-white p-2 rounded-full">
								<Image
									width={120}
									height={60}
									src="/assets/bot-logo.png"
									alt="icon"
									className="w-5 h-5 object-contain"
								/>
							</div>

							<div>
								<h3 className="font-semibold text-white">MyDear Bot</h3>
								<div className="flex items-center space-x-1">
									<div className="w-2 h-2 bg-green-300 rounded-full" />
									<span className="text-emerald-100 text-xs">Online</span>
								</div>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
							aria-label="Close chat"
						>
							<X size={20} />
						</button>
					</div>

					<div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-gray-50">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.isBot ? "justify-start" : "justify-end"
								}`}
							>
								<div
									className={`flex items-start space-x-2 max-w-[80%] ${
										message.isBot
											? "flex-row"
											: "flex-row-reverse space-x-reverse"
									}`}
								>
									<div className="flex-shrink-0">
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center ${
												message.isBot ? "bg-white border" : "bg-emerald-500"
											}`}
										>
											{message.isBot ? (
												<Image
													src="/assets/bot-logo.png"
													alt="icon"
													className="w-5 h-5 object-contain"
												/>
											) : (
												<User size={16} className="text-white" />
											)}
										</div>
									</div>
									<div
										className={`p-3 rounded-lg ${
											message.isBot
												? "bg-orange-50 text-gray-800 border border-orange-100 shadow"
												: "bg-emerald-500 text-white"
										}`}
									>
										{message.isBot ? (
											<div className="text-sm">
												<FormattedText text={message.text} />
											</div>
										) : (
											<p className="text-sm">{message.text}</p>
										)}
										<p
											className={`text-xs mt-1 ${
												message.isBot ? "text-gray-500" : "text-emerald-100"
											}`}
										>
											{formatTime(message.timestamp)}
										</p>
									</div>
								</div>
							</div>
						))}

						{isLoading && (
							<div className="flex justify-start">
								<div className="flex items-start space-x-2">
									<div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
										<Bot size={16} className="text-orange-600" />
									</div>
									<div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
										<div className="flex space-x-1">
											<div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
											<div
												className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
												style={{ animationDelay: "0.1s" }}
											></div>
											<div
												className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
												style={{ animationDelay: "0.2s" }}
											></div>
										</div>
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					<div className="p-4 border-t border-gray-200 bg-white">
						<div className="flex space-x-2">
							<textarea
								ref={inputRef}
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Type your query"
								className="flex-1 p-3 border border-gray-300 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-800"
								rows={1}
								maxLength={50}
								disabled={isLoading}
							/>
							<button
								onClick={sendMessage}
								disabled={!inputText.trim() || isLoading}
								className="bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-4 rounded-full transition-colors"
								aria-label="Send message"
							>
								<Send size={16} />
							</button>
						</div>

						<div className="mt-2 flex justify-between items-center">
							<span
								className={`text-xs ${
									inputText.length > 40 ? "text-red-500" : "text-gray-400"
								}`}
							>
								{inputText.length}/50 characters
							</span>
							{inputText.length > 50 && (
								<span className="text-xs text-red-500">
									Character limit exceeded
								</span>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ChatBot;
