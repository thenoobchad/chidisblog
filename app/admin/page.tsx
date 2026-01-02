"use client";

import { Library, Users } from "lucide-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import { useAuth } from "@/context/admin-context";

export default function AdminPage() {
	
	return (
		<main className="flex w-full flex-col  p-4">
			<div className="flex gap-4">
				<div className="flex flex-col gap-2 outline-zinc-300 outline-2 p-2">
					<div className="flex gap-2">
						<Library />
						<p>Total Posts</p>
					</div>
					<p>56</p>
				</div>
				<div className="flex flex-col gap-2 outline-2 p-2 outline-zinc-300">
					<div className="flex gap-2">
						<Users />
						<p>Total Users</p>
					</div>
					<p>13</p>
				</div>
			</div>

			<h1 className="py-5">Stats</h1>
			<div className="w-full h-full">
				<LineChart
					xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
					series={[
						{
							data: [2, 5.5, 2, 8.5, 1.5, 5],
							area: true,
						},
					]}
					height={300}
				/>
			</div>
		</main>
	);
}
