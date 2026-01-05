"use client";

import { auth, db } from "@/lib/firebase";


import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export default function PostPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState(title);
	const [category, setCategory] = useState("");
	null;

	null;
	const [imageFileLoading, setImageFileLoading] = useState(false);
	const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
	const [error, setError] = useState(null);
	const [content, setContent] = useState("");
	const [isEdited, setIsEdited] = useState(false);

	const createSlug = (text: string): string => {
		return text
			.toLowerCase()
			.trim()
			.normalize()
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/[\s-]+/g, "-")
			.replace(/^-+|-+$/g, "");
	};

	
	const uploadImage = async (e) => {
		const file = e.target.files[0]
		if (!file) return

		const formData = new FormData();

		formData.append("file", file);
		formData.append("upload_preset", "uploads_blog");
		setImageFileLoading(true);
		try {

			const res = await fetch(
				`https://api.cloudinary.com/v1_1/dw5r8tihu/image/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!res.ok) {
				const errorData = await res.json()
				console.error("Cloudinary error:", errorData)
				return
			}

			const data = await res.json();
			setImageFileUrl(data?.secure_url);
		} catch (error) {
			console.error("Error uploading file", error);
		} finally {
			setImageFileLoading(false);
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		setImageFileLoading(true);

		try {
			const postRef = collection(db, "posts");

			await addDoc(postRef, {
				title: title,
				slug: slug,
				content: content,
				tag: category,
				authorId: auth.currentUser?.uid,
				image: imageFileUrl,
				createdAt: serverTimestamp(),
			});

			console.log(title, slug, content, category, imageFileUrl);

			setTitle("");
			setSlug("");
			setContent("");
			setCategory("");
			setImageFileUrl(null);
			router.push("/admin/blog");
		} catch (error) {
			console.error(error);
			setError("Failed to create post");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
		console.log(category);
	};
	return (
		<div className="p-4 w-full h-full">
			<h1 className="py-5">Create Post</h1>
			<form onSubmit={handleSubmit} className="max-w-90 flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<label htmlFor="image">
						{imageFileLoading ? (
							"uploading..."
						) : imageFileUrl ? null : (
							<span className="flex items-center gap-2 border-dashed border-2 border-gray-300 px-2 py-3 w-fit cursor-pointer ">
								<Upload /> Upload image
							</span>
						)}
						<input
							type="file"
							id="image"
							required
							onChange={(e) => uploadImage(e)}
							hidden
							className="bg-zinc-300 px-2 py-3 outline-none"
						/>
					</label>
				</div>
				{imageFileUrl && (
					<div className="relative w-40 h-30 overflow-hidden">
						<button
							onClick={() => setImageFileUrl(null)}
							className="absolute z-30 bg-white m-1">
							<X />
						</button>
						<Image
							src={imageFileUrl}
							fill
							alt="uploaded_image"
							className="h-full w-full bg-cover"
						/>
					</div>
				)}

				<div className="flex flex-col gap-2">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						value={title}
						required
						onChange={(e) => {
							setTitle(e.target.value);

							if (!isEdited) {
								setSlug(createSlug(e.target.value));
							}
						}}
						placeholder="Enter Heading.."
						className="bg-zinc-300 px-2 py-3 outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="title">Slug</label>
					<input
						type="text"
						value={slug}
						required
						onChange={(e) => {
							setIsEdited(false);
							setSlug(createSlug(e.target.value));
						}}
						placeholder="Slug.."
						className="bg-zinc-300 px-2 py-3 outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="category">Category</label>
					<select
						name="category"
						id="category"
						required
						value={category}
						onChange={handleSelect}
						className="bg-zinc-300 px-2 py-3 outline-none">
						<option >Choose Category</option>
						<option value="politics">Politics</option>
						<option value="economy">Economy</option>
						<option value="science">Science</option>
						<option value="lifestyle">Lifestyle</option>
						<option value="travel">Travel</option>
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="title">Content</label>
					<textarea
						value={content}
						required
						onChange={(e) => setContent(e.target.value)}
						rows={5}
						placeholder="Type Post..."
						className="bg-zinc-300 px-2 py-3 outline-none"
					/>
				</div>
				{error && <p>{error}</p>}

				<Button>{isLoading ? "Creating Post" : "Send Post"}</Button>
			</form>
		</div>
	);
}
