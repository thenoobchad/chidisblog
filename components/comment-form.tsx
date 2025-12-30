"use client"

import { FormEvent } from "react";

export default function CommentForm() {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
		};
	
  return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="w-full flex flex-col gap-2">
				<textarea
					placeholder="comment..."
					rows={3}
					className="outline-none bg-zinc-100 p-2"
				/>
				<div className="flex gap-2 flex-col sm:flex-row">
					<input
						type="text"
						placeholder="Email"
						className="outline-none bg-zinc-100 p-2 w-full"
					/>
					<input
						type="text"
						placeholder="Name"
						className="outline-none bg-zinc-100 p-2 w-full"
					/>
				</div>

				<button className="bg-white text-zinc-900 px-6 py-2 mt-8  border-3 border-zinc-900 text-xs shadow-[6px_6px_0px_#000] w-fit  active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide">
					<h4>Post comment</h4>
				</button>
			</div>
		</form>
	);
}
