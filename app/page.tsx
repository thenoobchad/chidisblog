"use client";

import { Header } from "@/components/header";
import { NavigationHeader } from "@/components/navigation/navigation-header";
import Sidebar from "@/components/sidebar";

import { UnderlineHeading } from "@/components/underline-heading";
import { Posts } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

type PostType = {
	id: string;
	title: string;
	content: string;
};

type BlogContextType = {
	posts: PostType[];
	fetchPosts: () => Promise<void>;
};

export default function Home() {
	async function fetchPosts() {
		return await new Promise<PostType[]>((resolve) => {
			return resolve(Posts);
		});
	}
	

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	console.log("This is data", data);
	
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

					{isLoading ? (
						<p>Loading...</p>
					) : isError ? (
						<p>{error.message}</p>
					) : (
						data?.map((post) => (
							<Link key={post.id} href={`/blog/${post.id}`}>
								<div className="w-full relative flex gap-4  border-y border-zinc-300">
									<div className="h-20 min-w-30 bg-zinc-700" />
									<div className="flex flex-col">
										<h1 className="font-bold"> {`${post.title}`}</h1>
										<p className="text-xs">{post.content.slice(0, 100)}...</p>
									</div>
								</div>
							</Link>
						))
					)}

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
