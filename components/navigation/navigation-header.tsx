"use client";

import { useState } from "react";
import { TopicNavigation } from "./topic-nav";
import { Search } from "lucide-react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const tags = ["politics", "economy", "science", "lifestyle", "travel"];

export const NavigationHeader = () => {
	const searchParams = useSearchParams();

	const [selectedTopic, setSelectedTopic] = useState("all");

	const handleSelect = (tag: string) => {
		new URLSearchParams(searchParams.toString());

		setSelectedTopic(tag);
	};

	return (
		<>
			<div className="w-full border-b border-zinc-300">
				<div className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-3">
					<Search className="text-zinc-500" />
					<input type="text" placeholder="SEARCH..." className="text-sm" />
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
