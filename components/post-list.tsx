"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type PostType = {
	id: string;
	tag: string;
	title: string;
	slug: string;
	content: string;
};

export default function PostList({ posts }: { posts: PostType[] }) {
    const router = useRouter()

    const handleClick = (link:string) => {
        router.push(`/blog/${link}`)
    }
	return (
		<div className="flex flex-col gap-2">
			{posts?.map((post) => (
                <div
                    onClick={() => handleClick(post.slug)}
					key={post.id}
					>
					<div className="w-full relative flex gap-4  border-y border-zinc-300">
						<div className="h-20 min-w-30 bg-zinc-700" />
						<div className="flex flex-col">
							<h1 className="font-bold"> {`${post.title}`}</h1>
							<p className="text-xs">{post.content.slice(0, 100)}...</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
