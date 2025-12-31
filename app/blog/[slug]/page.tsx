

import CommentForm from "@/components/comment-form";
import { Header } from "@/components/header";
import { UnderlineHeading } from "@/components/underline-heading";
import { Posts } from "@/constants";
import Image from "next/image";



export default async function PostPage(params:{params: Promise<{slug: string}>}) {
	
	const slug = (await params.params).slug
	const post =  Posts.filter((item) => (item.slug === slug))[0]


	return (
		<main className="w-full max-w-5xl mx-auto  flex flex-col relative ">
			<Header/>
			<div className="flex justify-start px-10 items-center py-6 gap-6 overflow-hidden w-full flex-col">
				<div className="w-full relative">
					<div className="h-80 md:h-100 lg:h-120 w-full bg-zinc-700 flex" >
						<Image src={'/images/imagebg.png'} width={1000} height={700} alt="image" className="bg-cover"/>
					</div>

					<button className=" text-zinc-50 px-6 py-0.5 font-bold text-xs shadow-[3px_3px_0px_#000] w-fit active:scale-98 tracking-wide absolute top-4 left-4 z-10 bg-red-500">
						<p className="uppercase font-extrabold">{post?.tag}</p>
					</button>
					

					<UnderlineHeading
						size="text-lg pt-2"
						text={`${post?.title}`}
					/>

					<p className="text-sm py-4 font-light leading-6.5 text-justify">
						{post?.content}
					</p>
					<p className=" uppercase text-xs my-1 text-zinc-500">
						Dec 20 - chuddi
					</p>

					<div className="w-full flex flex-col gap-4">
						<h1 className="py-2">Leave a comment</h1>
						<CommentForm/>
					</div>

					{/* <div className="flex my-14 justify-between px-2">
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
			</div>
		</main>
	);
}
