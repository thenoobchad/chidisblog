"use client";

import { Library, Users } from "lucide-react";

import { useAuth } from "@/context/admin-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
	const router = useRouter();
	const { user } = useAuth();
	useEffect(() => {
		if (!user || user?.uid !== "Cg1MMHPLibO5Qlue9xDs36pmV073") {
			router.push("/login");
		}
	}, []);

	return (
		<main className="flex w-full flex-col  p-4">
			<div className="flex gap-4">
				<div className="flex flex-col gap-3 shadow-sm rounded p-2 w-full">
					<div className="flex gap-2">
						<Library />
						<p>Total Posts</p>
					</div>
					<p>56</p>
				</div>
				<div className="flex flex-col gap-2  shadow-sm rounded p-2  w-full">
					<div className="flex gap-2">
						<Users />
						<p>Total Users</p>
					</div>
					<p>13</p>
				</div>
			</div>

			<h1 className="py-5">Stats</h1>
		</main>
	);
}
