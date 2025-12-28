
"use client"

import { useCallback, useState } from "react";


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
	
	const handleClick = () => {

		if (clicked !== text) {
			
			setClicked(text)
		}
	}

	console.log(clicked)
	return (
		<h4
			onClick={handleClick}
			className={`${textClass} relative w-fit my-9 z-10 capitalize`}>
			{text}
			<span style={{
				height: clicked === text? "6px" : "0"
			}}
				className={`${lineClass} bg-yellow-200 w-full  absolute left-0 -z-2 bottom-0.5`}
			/>
		</h4>
	);
};
