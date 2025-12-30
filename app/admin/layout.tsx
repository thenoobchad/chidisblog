import React, { ReactNode } from "react";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";

export default function Adminlayout({ children }: { children: ReactNode }) {
	return (
		<main className="w-full h-full mx-auto max-w-7xl px-2 flex relative">
			<div className="w-fit h-full">
				<AdminSidebar />
			</div>
			<div className=" w-full relative flex flex-col">
				<AdminHeader />

				{children}
			</div>
		</main>
	);
}
