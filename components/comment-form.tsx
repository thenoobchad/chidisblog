"use client";

import { db } from "@/lib/firebase";

import { FormEvent, useEffect, useState } from "react";
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	serverTimestamp,
	addDoc,
} from "firebase/firestore";


export default function CommentForm({ postId }: { postId: string }) {
	const [userName, setUserName] = useState("");
	const [comment, setComment] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [comments, setComments] = useState([]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const formData = {
			userEmail,
			comment,
			userName,
			createdAt: serverTimestamp(),
		};

		try {
			const commentsRef = collection(db, "posts", postId, "comments");

			await addDoc(commentsRef, formData);

			setUserName("");
			setComment("");
			setUserEmail("");
		} catch (error) {
			console.error("Error adding comment:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const commentsQuery = query(
			 collection(db, "posts", postId, "comments"),
			orderBy("createdAt", "desc")
		);

		const unsubscribe =  onSnapshot(commentsQuery, (snapshot) => {
			const comments = [];
			snapshot?.forEach((doc) => {
				comments.push({ id: doc.id, ...doc.data() });
			});

			setComments(comments);
		});

		return () => {
			unsubscribe();
		};
	}, [ postId]);

	return (
		<div>
			<div>
				{comments.length > 0 &&
					comments.map((comment) => {

						return (
							<div
								key={comment.id}
								className="border-b border-zinc-200 py-4 flex max-w-100 justify-between">
								<div>
									<p className="text-sm font-semibold">{comment.userName}</p>
									<p className="text-xs text-zinc-500">
										{comment.userEmail ?? "Guest"}
									</p>
									<p className="mt-2">{comment.comment}</p>
								</div>

								<p className="text-xs text-zinc-500">
								{ comment.createdAt && (comment?.createdAt).toDate().toLocaleString()}
								</p>
							</div>
						)
					})}
			</div>
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
		</div>
	);
}
