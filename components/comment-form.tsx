"use client";

import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent,  useState } from "react";

export default function CommentForm({ postId }: {postId: string }) {
	const [userName, setUserName] = useState("");
	const [comment, setComment] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [loading, setLoading] = useState(false);

	

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("userName", userName);
		formData.append("comment", comment);
		formData.append("userEmail", userEmail);

		const commentData = {
			userName,
			comment,
			userEmail,
			createdAt: serverTimestamp(),
		};

		try {
			const commentsRef = collection(db, "posts", postId, "comments");

			await addDoc(commentsRef, commentData);

			setUserName("");
			setComment("");
			setUserEmail("");
		} catch (error) {
			console.error("Error adding comment:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="w-full flex flex-col gap-2">
				<textarea
					required
					placeholder="comment..."
					rows={3}
					className="outline-none bg-[#ddead1] p-2"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<div className="flex gap-2 flex-col sm:flex-row">
					<input
						type="text"
						placeholder="Email"
						className="outline-none bg-[#ddead1] p-2 w-full"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Name"
						required
						className="outline-none bg-[#ddead1] p-2 w-full"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>

				<button className="bg-white text-zinc-900 px-6 py-2 mt-8  border-3 border-zinc-900 text-xs shadow-[6px_6px_0px_#000] w-fit  active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide">
					<h4>{loading ? "Posting..." : "Post comment"}</h4>
				</button>
			</div>
		</form>
	);
}
