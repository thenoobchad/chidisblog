import { ExternalLinkIcon,  } from "lucide-react";
import Link from "next/link";

export const AdminHeader = () => {
	return (
		<div className="w-full">
			<div className="w-full border-b border-zinc-300">
				<div className="flex justify-between px-2 items-center py-6 max-w-7xl mx-auto">
					<Link href="/" className="flex gap-2">
						<ExternalLinkIcon />
						<span>Back to Blog</span>
					</Link>

					<div>
						<p>Hello, Admin</p>
						<p className="text-xs">chidielueme@gmail.com</p>
					</div>
				</div>
			</div>
		</div>
	);
};