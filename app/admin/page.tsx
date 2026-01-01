"use client";

import { Library, Users } from "lucide-react";
import { BarChart } from "@mui/x-charts/BarChart";

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
				<BarChart
					xAxis={[
						{
							id: "barCategories",
              data: ["bar A", "bar B", "bar C"],
              
						},
					]}
					series={[
						{
							data: [2, 5, 3],
						},
					]}
          height={300}
          className="text-zinc-700"
				/>
			</div>
		</main>
	);
}
