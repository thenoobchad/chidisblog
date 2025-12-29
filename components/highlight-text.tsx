

export const HighlightedText = ({
	text,
	textClass,
	lineClass,
}: {
	text: string;
	textClass?: string;
	lineClass?: string;
}) => {
	return (
		<h4
			className={`${textClass} relative w-fit my-9 z-10 uppercase text-sm font-bold text-zinc-90 	underline -underline-offset-2 underline-zinc-`}>
			{text}
			<span className={`${lineClass} bg-yellow-200 w-full absolute left-0 -z-2 bottom-0.5 h-2`}
			/>
		</h4>
	);
};
