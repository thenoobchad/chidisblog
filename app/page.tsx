import { Header } from "@/components/header";
import { NavigationHeader } from "@/components/navigation/navigation-header";
import PostList from "@/components/post-list";
import Sidebar from "@/components/sidebar";

import { UnderlineHeading } from "@/components/underline-heading";
import { Posts } from "@/constants";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";


type PostType = {
	id: string;
	tag: string;
	title: string;
	slug: string;
	content: string;
};


export default async function Home({ searchParams }: { searchParams: Promise<{ tag: string }> }) {
	const {tag} = await searchParams
	
		const posts = await new Promise<PostType[]>((resolve) => {
			return setTimeout(() => resolve(Posts), 2000)
		});
		
	const data = tag ? posts.filter(post => post.tag.toLowerCase() === tag) : posts

	return (
		<>
			<Header />
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

					<PostList posts={data} />

					

					<div className="flex flex-row gap-2 items-center w-full">
						<h4 className="text-sm font-bold uppercase whitespace-nowrap"></h4>
						<div className="w-full h-px bg-zinc-300" />
					</div>
				</div>
				<div className="top-0 lg:w-1/4 relative w-full overflow-hidden">
					<div className="flex justify-start px-10 items-center py-6 lg:px-0 gap-2 overflow-hidden w-full flex-col ">
						<Sidebar />
					</div>
				</div>
			</main>
		</>
	);
}

const FeaturedPost = async () => {
	const [post] = await new Promise<PostType[]>(resolve => {
		return resolve(Posts)
	})

	return (
		<div className="w-full relative">
			<Link href={`/blog/${post.slug}`}>
				<div className="h-58 w-full bg-zinc-700" />

				<button className=" text-zinc-50 px-6 py-0.5 font-bold text-xs shadow-[3px_3px_0px_#000] w-fit active:scale-98 tracking-wide absolute top-4 left-4 z-10 bg-red-500">
					<p className="uppercase font-extrabold"> {post.tag}</p>
				</button>

				<UnderlineHeading
					size="text-lg"
					text={`${post.title}`}
				/>
			</Link>
			<p className="text-sm font-light">
				{(post.content).slice(0, 100)}...
			</p>
			<p className=" capitalize text-xs my-1 text-zinc-500">Dec 20 - Chuddi</p>
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
