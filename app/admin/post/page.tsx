"use client";

import { auth, db } from "@/lib/firebase";
import { CldUploadWidget } from "next-cloudinary";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import Image from "next/image";



export default function PostPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState(title);
	const [category, setCategory] = useState("");
	(null);
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


	const handleSuccess = async (result) => {
	
		setImageFileUrl(result.info.secure_url);
		
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

			console.log(title, slug, content, category, imageFileUrl)

			setTitle("");
			setSlug("");
			setContent("")
			setCategory("")
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
		setCategory(e.target.value)
		console.log(category)
	}
	return (
		<div className="p-4 w-full h-full">
			<h1 className="py-5">Create Post</h1>
			<form onSubmit={handleSubmit} className="max-w-90 flex flex-col gap-3">
				<CldUploadWidget
					uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
					onSuccess={handleSuccess}>
					{({ open }) => (
						<button onClick={() => open()}>
							{imageFileUrl ? "uploaded." : "Upload Image"}
						</button>
					)}
				</CldUploadWidget>
				{imageFileUrl && <img src={imageFileUrl} alt="image"  className="h-30 w-30 bg-cover"  />}

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
						id=""
						onChange={handleSelect}
						className="bg-zinc-300 px-2 py-3 outline-none">
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
