"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { TopicNavigation } from "./topic-nav";
import { Search } from "lucide-react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type PostType = {
	id: string;
	tag: string;
	title: string;
	slug: string;
	content: string;
};

const tags = ["politics", "economy", "science", "lifestyle", "travel"];

export const NavigationHeader = ({ posts }: { posts: PostType[] }) => {
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const searchParams = useSearchParams();

	const [selectedTopic, setSelectedTopic] = useState("all");

	const handleSelect = (tag: string) => {
		new URLSearchParams(searchParams.toString());

		setSelectedTopic(tag);
	};

	const filteredPosts = useMemo(() => {
		
		return (
			posts
				.filter((post) =>
					post.title.toLowerCase().includes(query.toLowerCase())
				)
				.slice(0, 5) ||
			posts
				.filter((post) =>
					post.content.toLowerCase().includes(query.toLowerCase())
				)
				.slice(0, 5)
		);
	}, [posts, query]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setIsOpen(true);
	};

	return (
		<>
			<div className="w-full border-b border-zinc-300">
				<div
					ref={containerRef}
					className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-3 relative">
					<Search className="text-zinc-500" />
					<input
						type="text"
						placeholder="SEARCH..."
						className="text-sm outline-none p-2"
						value={query}
						onFocus={() => setIsOpen(true)}
						onChange={handleInputChange}
					/>

					{isOpen && query.length > 0 && (
						<ul className="absolute left-18 top-18 z-50 bg-amber-50 min-w-75 overflow-y-auto flex flex-col gap-2 p-2">
							{filteredPosts.length > 0 ? (
								filteredPosts.map((post) => (
									<li key={post.id} className="text-xs ">
										<Link
											className="flex flex-col leading-[15px]"
											href={`/blog/${post.slug}`}
											onClick={() => setIsOpen(false)}>
											<p className="font-bold">{post.title}</p>
											<p>{post.content.slice(0, 50)}...</p>
										</Link>
									</li>
								))
							) : (
								<li>No matches found</li>
							)}
						</ul>
					)}
				</div>
			</div>

			<div className="w-full border-b border-zinc-300">
				<div className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-6 overflow-x-auto whitespace-nowrap">
					<Link href={`/`}>
						<TopicNavigation
							text="all"
							isSelected={selectedTopic}
							onSelect={handleSelect}
						/>
					</Link>
					{tags.map((cat, i) => (
						<Link key={i} href={`/?tag=${cat.toLowerCase()}`}>
							<TopicNavigation
								text={cat}
								isSelected={selectedTopic}
								onSelect={handleSelect}
							/>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};
