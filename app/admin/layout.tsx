"use client";
import React, { ReactNode, useEffect } from "react";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminHeader } from "./_components/admin-header";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/admin-context"; 

export default function Adminlayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const {user, loading} = useAuth()

	

	return (
		<main className="w-full h-screen mx-auto max-w-7xl items-center justify-center flex flex-col relative bg-white text-zinc-800">
			{loading ? (
				<div className="h-15 w-15 border-t-3 border-r-3 animate-spin rounded-full" />
			) : (
				<>
					<div className="w-full">
						<AdminHeader user={user} />
					</div>
					<div className=" w-full h-full  relative flex">
						<AdminSidebar />
						<div className="overflow-y-auto w-full">{children}</div>
					</div>
				</>
			)}
		</main>
	);
}
