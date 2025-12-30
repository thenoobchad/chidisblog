import { NavigationHeader } from "@/components/navigation/navigation-header";
import Sidebar from "@/components/sidebar";

import { UnderlineHeading } from "@/components/underline-heading";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<NavigationHeader />
			<main className="w-full max-w-5xl mx-auto  flex flex-col lg:flex lg:flex-row relative">
				<div className="flex justify-start px-10 items-center py-6 gap-6 overflow-hidden w-full flex-col lg:w-3/4">
					<div className="flex flex-row gap-2 items-center w-full">
						<h4 className="text-sm font-bold uppercase">feat. </h4>
						<div className="w-full h-px bg-zinc-300" />
					</div>
					<FeaturedPost />

					<div className="flex flex-row gap-2 items-center w-full">
						<h4 className="text-sm font-bold uppercase">Recent </h4>
						<div className="w-full h-px bg-zinc-300" />
					</div>

					{new Array(13).fill(0).map((_, i) => (
						<div
							key={i}
							className="w-full relative flex gap-4  border-y border-zinc-300">
							<div className="h-20 min-w-30 bg-zinc-700" />
							<div className="flex flex-col">
								<UnderlineHeading text="More attacks in the middle east as tensions grow" />
								<p className="text-xs ">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
									vero ullam asperiores.
								</p>
							</div>
						</div>
					))}

					<div className="flex flex-row gap-2 items-center w-full">
						<h4 className="text-sm font-bold uppercase whitespace-nowrap"></h4>
						<div className="w-full h-px bg-zinc-300" />
					</div>
				</div>
				<div className="top-0 w-1/4 relative">
					<Sidebar />
				</div>
			</main>
		</>
	);
}

const FeaturedPost = () => {
	const post = { slug: "my-first-post", title: "hello world" };

	return (
		<div className="w-full relative">
			<Link href={`/blog/444547576`}>
				<div className="h-58 w-full bg-zinc-700" />

				<button className=" text-zinc-50 px-6 py-0.5 font-bold text-xs shadow-[3px_3px_0px_#000] w-fit active:scale-98 tracking-wide absolute top-4 left-4 z-10 bg-red-500">
					<p className="uppercase font-extrabold"> technology</p>
				</button>

				<UnderlineHeading
					size="text-lg"
					text="Trump launches precision strikes is Nigeria, Sokoto as promised."
				/>
			</Link>
			<p className="text-sm font-light">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
				suscipit iusto vero dolores, eum perspiciatis.
			</p>
			<p className=" uppercase text-xs my-1 text-zinc-500">Dec 20 - chuddi</p>
			<div className="flex justify-between px-2">
				<div className="flex items-center gap-2">
					<Heart className="text-zinc-500" size={20} />
					<span className="text-xs text-zinc-500">354</span>
				</div>
				<div className="flex items-center gap-2">
					<MessageCircle className="text-zinc-500" size={20} />
					<span className="text-xs text-zinc-500">54</span>
				</div>
				<div>
					<Share2 size={20} className="text-zinc-500" />
				</div>
			</div>
		</div>
	);
};
