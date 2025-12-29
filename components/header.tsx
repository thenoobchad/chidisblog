
"use client"
import { Search } from 'lucide-react';

import { HighlightedText } from './highlighted-text';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';

export const Header = () => {
	const [selectedTopic, setSelectedTopic] = useState("all")

	const handleSelect = (topic: string) => {
	setSelectedTopic(topic)
}
  return (
		<div className="w-screen h-full">
			<div className="w-full border-b border-zinc-200">
				<div className="flex justify-between px-10 items-center py-6 max-w-5xl mx-auto">
					<h1 className="text-lg">CHIDIBLOG</h1>

					<button className="bg-white text-zinc-900 px-6 py-2  border-3 border-zinc-900 font-bold text-xs shadow-[6px_6px_0px_#000] w-fit active:scale-98 tracking-wide">
						<h4>SUBSCRIBE</h4>
					</button>
				</div>
			</div>
			<div className="w-full border-b border-zinc-200">
				<div className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-3">
					<Search />
					<input type="text" placeholder="SEARCH..." className="text-sm" />
				</div>
			</div>

			<div className="w-full border-b border-zinc-200">
				<div className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-6 overflow-x-auto whitespace-nowrap">
					{topic.map((item, i) => (
						<HighlightedText key={i} text={item} isSelected={selectedTopic} onSelect={handleSelect} />
					))}
				</div>
			</div>
		</div>
	);
}

const topic = ["all", "politics", "economy", "science", "lifestyle", "travel"]