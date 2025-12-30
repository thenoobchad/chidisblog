import Link from "next/link";
import { NavigationHeader } from "./navigation/navigation-header";

export const Header = () => {
	return (
		<div className="w-full h-full">
			<div className="w-full border-b border-zinc-300">
				<div className="flex justify-between px-10 items-center py-6 max-w-5xl mx-auto">
					<Link href="/blog/the-main-guy">
						<h1 className="text-lg font-bold">CHIDIBLOG</h1>
					</Link>

					<button className="bg-white text-zinc-900 px-6 py-2  border-3 border-zinc-900 text-xs shadow-[6px_6px_0px_#000] w-fit active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide">
						<h4>SUBSCRIBE</h4>
					</button>
				</div>
			</div>
		</div>
	);
};
