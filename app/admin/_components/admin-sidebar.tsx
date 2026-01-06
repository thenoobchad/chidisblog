"use client";

import {
	Blocks,
	Brackets,
	LayoutList,
	MessageSquarePlus,
	Settings,
} from "lucide-react";
import Link from "next/link";

export const AdminSidebar = () => {
	return (
		<div className="flex-none overflow-y-auto px-3 pt-6 bg-blue-950 text-white h-full ">
			<ul className="flex flex-col gap-3 flex-1 ">
				{" "}
				{navlinks.map((item, i) => (
					<Link
						href={item.name === "dashboard" ? "/admin" : `/admin/${item.name}`}
						className="capitalize flex gap-2 px-3 hover:border-l-4 transition-all delay-100 hover:border-zinc-500 py-2"
						key={i}>
						<span>
							<item.icon />
						</span>
						<p className="hidden md:block">{item.name}</p>
					</Link>
				))}
			</ul>
		</div>
	);
};

const navlinks = [
	{
		name: "dashboard",
		icon: Blocks,
	},
	{
		name: "post",
		icon: MessageSquarePlus,
	},
	{
		name: "blog",
		icon: LayoutList,
	},
	{
		name: "settings",
		icon: Settings,
	},
];
