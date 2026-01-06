import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			{children}
			<footer className="w-full py-4 bg-green-950">
				<div className="w-full max-w-5xl mx-auto  flex flex-col  text-white lg:flex lg:flex-row relative">
					<div className="flex  px-10 items-center py-6 gap-6 overflow-hidden w-full flex-col">
						<div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6 ">
							{/* Brand/About Section */}
							<div className="flex flex-col ">
								<h2 className="py-2">ChidisBlog</h2>
								<p className="text-sm">
									Sharing insights on web development, React, and the future of
									tech. Stay curious and keep coding.
								</p>
							</div>

							{/* Quick Links */}
							<div className="flex flex-col ">
								<h3 className="py-2">Quick Links</h3>
								<ul className="text-sm">
									<li>
										<Link href="/blog">Latest Posts</Link>
									</li>
									<li>
										<Link href="/about">About Me</Link>
									</li>
									<li>
										<Link href="/newsletter">Newsletter</Link>
									</li>
									<li>
										<Link href="/contact">Contact</Link>
									</li>
								</ul>
							</div>

							{/* Social & Newsletter */}
							<div className="w-full flex flex-col ">
								<h3 className="py-2">Follow Me</h3>
								<div className="flex gap-4 text-sm">
									<a
										href="https://twitter.com"
										target="_blank"
										rel="noreferrer">
										
										<Twitter/>
									</a>
									<a href="https://github.com" target="_blank" rel="noreferrer">
										
										<Github/>
									</a>
									<a
										href="https://linkedin.com"
										target="_blank"
										rel="noreferrer">
										
										<Linkedin/>
									</a>
								</div>
							</div>
						</div>

						<div className="footer-bottom">
							<p>&copy; {2025} ChidisBlog. All rights reserved.</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
 