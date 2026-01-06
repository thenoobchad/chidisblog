import Footer from "@/components/footer";

import Link from "next/link";

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			{children}
			<Footer />
		</div>
	);
}
 