import { Header } from "@/components/header";
import { NavigationHeader } from "@/components/navigation/navigation-header";
import PostList from "@/components/post-list";
import Sidebar from "@/components/sidebar";

import { UnderlineHeading } from "@/components/underline-heading";
import { Posts } from "@/constants";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

type PostType = {
	id: string;
	tag: string;
	title: string;
	slug: string;
	content: string;
};

type Props = {
	params: Promise<{ page: string[] }>;
	searchParams: Promise<{ tag?: string }>;
};

export default async function Home({ params, searchParams }: Props) {
	const { page } = await params;
	const postsPerPage = 15;
	const currentPage = page && page[0] ? parseInt(page[0]) : 1;

	//calculate the range
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const { tag } = await searchParams;

	const posts = await new Promise<PostType[]>((resolve) => {
		return setTimeout(() => resolve(Posts), 2000);
	});

	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	console.log("this is the tag", tag);

	const totalPages = Math.ceil(posts.length / postsPerPage);

	const filteredPost = tag
		? currentPosts.filter((post) => post.tag.toLowerCase() === tag)
		: currentPosts;

	return (
		<>
			<Header />
			<NavigationHeader posts={posts} />
			<main className="w-full max-w-5xl mx-auto  flex flex-col lg:flex lg:flex-row relative">
				<div className="flex justify-start px-10 items-center py-6 gap-6 overflow-hidden w-full flex-col lg:w-3/4">
					{tag === undefined && (
						<>
							{" "}
							<div className="flex flex-row gap-2 items-center w-full">
								<h4 className="text-sm font-bold uppercase">feat. </h4>
								<div className="w-full h-px bg-zinc-300" />
							</div>
							<FeaturedPost />
						</>
					)}

					<div className="flex flex-row gap-2 items-center w-full">
						<h4 className="text-sm font-bold uppercase whitespace-nowrap">
							{tag === undefined ? <p>Recent news</p> : <p>{tag}</p>}{" "}
						</h4>
						<div className="w-full h-px bg-zinc-300" />
					</div>

					<PostList posts={filteredPost} />

					<div className="flex flex-row gap-2 items-center w-full">
						<div className="w-full h-px bg-zinc-400" />

						<div className="text-sm capitalize whitespace-nowrap flex gap-4 items-center">
							{currentPage > 1 && (
								<Link
									className="bg-white text-zinc-900 px-3 py-2  border-3 border-zinc-900 text-xs shadow-[4px_4px_0px_#000] w-fit active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide flex gap-1 whitespace-nowrap"
									href={`${currentPage - 1 === 1 ? "" : currentPage - 1}`}>
									<ArrowLeft size={18} /> Prev
								</Link>
							)}

							<p>
								Page {currentPage} of {totalPages}
							</p>

							{currentPage < totalPages && (
								<Link
									className="bg-white text-zinc-900 px-3 py-2  border-3 border-zinc-900 text-xs shadow-[4px_4px_0px_#000] w-fit active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide flex gap-1 whitespace-nowrap"
									href={`${currentPage + 1}`}>
									Next
									<ArrowRight size={18} />
								</Link>
							)}
						</div>
						<div className="w-full h-px bg-zinc-400" />
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
	const [post] = await new Promise<PostType[]>((resolve) => {
		return resolve(Posts);
	});

	return (
		<div className="w-full relative">
			<Link href={`/blog/${post.slug}`}>
				<div className="h-68 md:h-88 lg:h-100 lg: w-full flex relative overflow-hidden">
					<Image
						src={"/images/imagebg.png"}
						alt="image"
						fill
						className="bg-cover"
					/>
				</div>

				<button className=" text-zinc-50 px-6 py-0.5 font-bold text-xs shadow-[3px_3px_0px_#000] w-fit active:scale-98 tracking-wide absolute top-4 left-4 z-10 bg-red-500">
					<p className="uppercase font-extrabold"> {post.tag}</p>
				</button>

				<UnderlineHeading size="text-lg pt-4" text={`${post.title}`} />
			</Link>
			<p className="text-sm font-light">{post.content.slice(0, 180)}...</p>
			<div className="flex gap-4 py-4">
				<p className=" uppercase text-xs my-1 text-zinc-500 bg-zinc-300 px-2 py-1 w-fit outline-2 outline-dotted flex gap-2 items-center">
					<span className="h-3 w-3 rounded-full bg-zinc-800" />
					December 20, 2005 - chuddi
				</p>

				<p className=" uppercase text-xs my-1 text-white bg-zinc-800 px-2 py-1 w-fit outline-2 outline-zinc-800 flex gap-2 items-center">
					<span className="h-3 w-3 rounded-full bg-white" />
					View similar stories
				</p>
			</div>

			{/* <div className="flex justify-between px-2">
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
			</div> */}
		</div>
	);
};
