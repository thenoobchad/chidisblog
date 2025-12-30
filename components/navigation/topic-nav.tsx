"use client"

export const TopicNavigation = ({
	text,
	textClass,
	lineClass,
	isSelected,
	onSelect,
}: {
	text: string;
	textClass?: string;
	lineClass?: string;
	isSelected?: string;
	onSelect?: (text: string) => void;
}) => {
	return (
		<h4
			onClick={onSelect ? () => onSelect(text) : undefined}
			className={`${textClass} relative w-fit my-9 z-10 uppercase text-sm font-bold text-zinc-500 ${
				isSelected === text ? "text-zinc-900" : ""
			}`}>
			{text}
			<span
				style={{
					height: isSelected === text ? "6px" : undefined,
				}}
				className={`${lineClass} bg-yellow-200 w-full  absolute left-0 -z-2 bottom-0.5`}
			/>
		</h4>
	);
};
