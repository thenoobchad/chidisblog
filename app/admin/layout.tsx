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
		<main>
			{loading ? (
				<div className="h-15 w-15 border-t-3 border-r-3 animate-spin rounded-full" />
			) : (
				<div className=" flex h-screen flex-col overflow-hidden w-full relative">
					<div className=" flex  w-full flex-none">
						<AdminHeader user={user} />
					</div>
						
					<div className="flex flex-1 overflow-hidden">
						<AdminSidebar />
					<div className="overflow-y-auto w-full flex-1 h-[2000px]">{children}</div>
					</div> 
				</div>
			)}
		</main>
	);
}
