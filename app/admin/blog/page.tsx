"use client";
import {
	collection,
	getDocs,
	query,
	orderBy,
	doc,
	deleteDoc,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { displayTime } from "@/lib/helper";
import { Edit, Trash } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { title } from "process";

type SelectedPostType = {
	id: string;
	title: string;
	slug: string;
	content: string;
};

export default function BlogsPage() {
	const [posts, setPosts] = useState([]);
	const [selectedPost, setSelectedPost] = useState<SelectedPostType | null>(
		null
	);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchPosts = async () => {
		try {
			const postRef = collection(db, "posts");

			const q = query(postRef, orderBy("createdAt", "desc"));
			const postsSnapshot = await getDocs(q);
			const posts = postsSnapshot.docs.map((post) => ({
				id: post.id,
				...post.data(),
			}));
			setPosts(posts);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (id: string) => {
		const docRef = doc(db, "posts", id);

		try {
			await deleteDoc(docRef);
			fetchPosts();
		} catch (error) {
			console.error("Failed to delete post", error);
		}
	};

	useEffect(() => {
		Promise.resolve().then(() => fetchPosts());
	}, []);

	const handleEdit = async (id: string) => {
		const docRef = doc(db, "posts", id);
		const document = (await getDoc(docRef)).data();

		const { title, slug, content } = document;

		setSelectedPost({ id: id, title: title, slug: slug, content: content });
		setIsOpen(true);
		console.log(selectedPost);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		setSelectedPost({ ...selectedPost, [name]: value });
	};

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		setSelectedPost({ ...selectedPost, [name]: value });
	};

	const handleUpdate = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		
		
		const postRef = doc(db, "posts", selectedPost.id);

		try {
			await updateDoc(postRef, {
				title: selectedPost.title,
				slug: selectedPost.slug,
				content: selectedPost.content,
			});
			setIsOpen(false);
			fetchPosts();
		} catch (error) {
			console.error("Error updating post", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-4 flex flex-col  w-full h-full ">
			<h1 className="pb-14">Blog Posts</h1>
			{posts && posts.length > 0 ? (
				<div className="flex flex-col gap-2 w-full  h-full items-center">
					{posts.map((post) => (
						<div
							key={post?.id}
							className="flex justify-between gap-1 w-full max-w-2xl border p-2 border-zinc-100 ">
							<div className="flex flex-col lg:gap-2 lg:flex-row ">
								<h1 className="text-sm">{post?.title}</h1>
								<p className="text-[12px] text-zinc-500">
									{(post?.content).slice(0, 100)}...
								</p>
							</div>
							<div className="flex gap-2">
								{post?.createdAt ? (
									<p className="text-[10px] text-blue-400">
										{displayTime(post?.createdAt)}
									</p>
								) : (
									"Loading..."
								)}
								<div className="flex gap-2">
									<Edit
										size={18}
										className="text-blue-400"
										onClick={() => handleEdit(post?.id)}
									/>

									<Trash
										onClick={() => handleDelete(post?.id)}
										color="red"
										fill="red"
										size={18}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>Nothing to see here </p>
			)}

			{isOpen && (
				<div className="absolute top-30  bg-white p-2 outline-2 px-4  max-w-90">
					<h1 className="py-2 font-bold text-lg text-center">Edit Post</h1>
					<form onSubmit={handleUpdate} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="title" className="text-zinc-700">
								Title
							</label>
							<input
								className="outline-none bg-zinc-100 p-2 text-zinc-700 text-sm"
								name="title"
								type="text"
								value={selectedPost?.title}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="slug" className="text-zinc-700">
								Slug
							</label>
							<input
								className="outline-none bg-zinc-100 p-2 text-zinc-700 text-sm"
								name="slug"
								type="text"
								value={selectedPost?.slug}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="content">Content</label>
							<textarea
								className="outline-none bg-zinc-100 p-2 text-zinc-700 text-sm"
								name="content"
								value={selectedPost?.content}
								onChange={handleTextareaChange}
							/>
						</div>
						<button className="bg-white text-zinc-900 px-6 py-2 mt-4 border-3 border-zinc-900 text-xs shadow-[4px_4px_0px_#000] w-full active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide">
							<h4>{isLoading ? "Updating Post" : "Update"}</h4>
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
