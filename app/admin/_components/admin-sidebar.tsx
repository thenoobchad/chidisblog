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
		<div className="my-4 border-r pr-2 border-zinc-300 h-full">
			<h1 className="font-bold px-3 py-4 flex gap-2">
				<span className="flex md:hidden flex-col">
					<Brackets />
					CP
				</span>
				<span className="hidden md:block">Control Panel</span>
			</h1>

			<ul className="flex flex-col gap-2">
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
