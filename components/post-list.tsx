"use client";

import Link from "next/link";

type PostType = {
	id: string;
	tag: string;
	title: string;
	slug: string;
	content: string;
};

export default function PostList({ posts }: { posts: PostType[] }) {
	return (
		<div className="flex flex-col gap-2">
			{posts?.map((post) => (
				<Link
					key={post.id}
					href={`/blog/${post.slug.toLowerCase().normalize().trim()}`}>
					<div className="w-full relative flex gap-4  border-y border-zinc-300">
						<div className="h-20 min-w-30 bg-zinc-700" />
						<div className="flex flex-col">
							<h1 className="font-bold"> {`${post.title}`}</h1>
							<p className="text-xs">{post.content.slice(0, 100)}...</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
