import { Search } from 'lucide-react';
import React from 'react'

export const Header = () => {
  return (
		<header className="w-screen h-full">
			<div className="w-full border-b border-zinc-200">
				<div className="flex justify-between px-10 items-center py-6 max-w-5xl mx-auto">
					<h1 className="text-lg">CHIDIBLOG</h1>

					<button className="bg-white text-zinc-900 px-6 py-2  border-2 border-zinc-900 font-semibold text-xs shadow-[6px_6px_0px_#000] w-fit active:scale-98 tracking-wide">
						SUBSCRIBE
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
				<div className="flex justify-start px-10 items-center py-6 max-w-5xl mx-auto gap-6 overflow-hidden">
					{nav.map((item) => (
						<h2 key={item} className='text-zinc-400'>
							{item}
						</h2>
					))}
				</div>
			</div>
		</header>
	);
}

const nav = ["All", "Politics", "Economy", "Science", "Lifestyle", "Travel"]