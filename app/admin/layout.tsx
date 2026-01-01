import React, { ReactNode } from "react";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";

export default function Adminlayout({ children }: { children: ReactNode }) {
	return (
		<main className="w-full h-screen mx-auto max-w-7xl  flex flex-col relative">
			<div className="w-full">
				<AdminHeader />
			</div>
			<div className=" w-full h-full relative flex">
				<AdminSidebar />
				{children}
			</div>
		</main>
	);
}
