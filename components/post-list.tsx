

import Image from "next/image";
import Link from "next/link";

type PostType = {
	id: string;
	tag: string;
	image: string;
	title: string;
	slug: string;
	content: string;
};

export default function PostList({ posts }: { posts: PostType[] }) {
   
	return (
		<div className="flex flex-col gap-2">
			{posts?.map((post) => (
                <Link
                    href={`/blog/${post.slug}`}
					key={post.id}
					>
					<div className="w-full relative  gap-4  border-y border-zinc-300 flex">
						<div className="h-20 min-w-40  flex relative overflow-hidden" >
							<Image src={post.image} alt="image" fill className="object-cover" />
						</div>
						<div className="flex flex-col">
							<h1 className="font-bold"> {`${post.title}`}</h1>
							<p className="text-xs text-justify">{post.content.slice(0, 100)}...</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
