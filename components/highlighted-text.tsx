
"use client"

import { useState } from "react";


export const HighlightedText = ({
	text,
	textClass,
	lineClass,
	
}: {
	text: string;
	textClass?: string;
	lineClass?: string;
	
	}) => {
	
	const [clicked, setClicked] = useState("all");
	const [isActive, setIsActive] = useState(false)
	console.log(clicked)
	return (
		<h4
			onClick={() => {
				setClicked(text)
				setIsActive(true)
			}}
			className={`${textClass} relative w-fit my-9 z-10 capitalize`}>
			{text}
			<span style={{
				height: clicked === text? "2px" : "0px"
			}}
				className={`${lineClass} bg-yellow-200 w-full  absolute left-0 -z-2 bottom-0.5`}
			/>
		</h4>
	);
};
