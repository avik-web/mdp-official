"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}) => {
	const containerRef = React.useRef(null);
	const scrollerRef = React.useRef(null);
	const [start, setStart] = useState(false);

	const getDirection = useCallback(() => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse"
				);
			}
		}
	}, [direction]);

	const getSpeed = useCallback(() => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "40s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "100s");
			}
		}
	}, [speed]);

	const addAnimation = useCallback(() => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = (item as Node).cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}, [getDirection, getSpeed]);

	useEffect(() => {
		addAnimation();
	}, [addAnimation]);

	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 max-w-7xl overflow-hidden",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]"
				)}
			>
				{items.map((item, idx) => (
					<li
						className="w-[350px] flex flex-col items-center justify-start mx-4"
						key={item.key || item.image || idx}
					>
						<div className="w-[350px] relative mb-4 rounded-2xl overflow-hidden">
							<Image
								src={item.image}
								alt={item.title}
								width={550}
								height={400}
								className="w-[650px] h-[400px] object-cover"
							/>
						</div>
						<div className="w-full text-left">
							<h2 className="text-black text-lg font-semibold mb-1">
								{item.title}
							</h2>
							<p className="text-[#444444] text-sm">{item.subtitle}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
