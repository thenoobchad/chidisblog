
"use client"


export const HighlightedText = ({
	text,
	textClass,
	lineClass,
	clicked,
	setClicked,
}: {
	text: string;
	textClass?: string;
	lineClass?: string;
	clicked?: boolean;
	setClicked?: (clicked:boolean) => void;
}) => {
	return (
        <h4 onClick={setClicked? () => setClicked(!clicked) : undefined} className={`${textClass} relative w-fit my-9 z-10`}>
			{text}
			<span
				className={`${lineClass} bg-yellow-200 w-full  absolute left-0 -z-2 bottom-0.5 h-${
					clicked ? "2" : ""
				}`}
			/>
		</h4>
	);
};
