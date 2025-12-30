"use client";

import {useState } from "react";
import { TopicNavigation } from "./topic-nav";
import { Search } from "lucide-react";


const topic = ["all", "politics", "economy", "science", "lifestyle", "travel"];

export const NavigationHeader = () => {
    
	const [selectedTopic, setSelectedTopic] = useState("all");

	const handleSelect = (topic: string) => {
		setSelectedTopic(topic);
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
					{topic.map((item, i) => (
						<TopicNavigation
							key={i}
							text={item}
							isSelected={selectedTopic}
							onSelect={handleSelect}
						/>
					))}
				</div>
			</div>
		</>
	);
};
