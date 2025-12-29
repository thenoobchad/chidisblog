import type { Metadata } from "next";

import localFont from "next/font/local"
import "./globals.css";
import { Header } from "@/components/header";

const poppins = localFont({
	src: [
		{
			path: "../public/fonts/Poppins-ExtraBold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/Poppins-Regular.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/Poppins-Medium.ttf",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-poppins",
	display: "swap",
});


export const metadata: Metadata = {
  title: "Chidi's blog",
  description: "Stay updated with recent trends in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className={` ${poppins.className}`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
