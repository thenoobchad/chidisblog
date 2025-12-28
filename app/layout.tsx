import type { Metadata } from "next";

import localFont from "next/font/local"
import "./globals.css";
import { Header } from "@/components/header";



const poppins = localFont({
	src: "../public/fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  display:"swap"
});

const dmsans = localFont({
	src: "../public/fonts/DMSans-Regular.ttf",
  display: "swap",
  variable: "--font-dmsans"
});

export const metadata: Metadata = {
  title: "hidi's blog",
  description: "Stay updated with recent trends in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className={`${poppins.variable} ${dmsans.className}`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
