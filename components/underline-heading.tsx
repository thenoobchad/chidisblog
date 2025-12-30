

export const UnderlineHeading = ({
	text,
	size="text-sm",
	color = "#fff085",
	height = "30%",
	bottom = "10%",
	
	
}: {
		text: string;
		size?: string;
	color?: string;
	height?: string;
		bottom?: string;
	
	
}) => {
	return (
		<h2 className={`${size}  uppercase font-bold`}>
			<span
				style={{
					backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 100%)`,
					backgroundRepeat: `no-repeat`,
					backgroundSize: `100% ${height}`,
					backgroundPosition: `0 ${100 - parseInt(bottom)}%`,
				}}
				className={`inline box-decoration-break-clone box-decoration-clone `}>
				{text}
			</span>
		</h2>
	);
};
