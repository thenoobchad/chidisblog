"use client"


import { Image } from "lucide-react";
import { FormEvent, useState } from "react";

import {toast} from 'alert'

export default function PostPage() {
const [isLoading, setIsLoading] = useState(false)
	const [title, setTitle] = useState("")
	const [slug, setSlug] = useState(title);
	
	const [content, setContent] = useState("");
	 const [isEdited, setIsEdited] = useState(false);
  const [image, setImage] = useState(null)

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
setIsLoading(true)
	  const newPost = {
		  id: crypto.randomUUID(),
		  title,
		  slug,
		  content,
   }
	  try {
		  console.log(newPost)
		// Handle backend submit here
	  } catch (error) {
		  console.error(error)
		  toast("Error creating post")
	  } finally {
		  setIsLoading(false)
		  toast('Post created successfully!')
	  }

  }
	
	const createSlug = (text: string):string => {
		return text
			.toLowerCase()
			.trim()
			.normalize()
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/[\s-]+/g, "-")
			.replace(/^-+|-+$/g, "");
	}
  return (
		<div className="p-4 w-full h-full">
			<h1 className="py-5">Create Post</h1>
			<form onSubmit={handleSubmit} className="max-w-90 flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<label htmlFor="title">Select Image (jpg/jpeg/png)</label>
					{image && <img src={"./"} alt="image" />}
				</div>
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

				<button className="bg-white text-zinc-900 px-6 py-2 mt-4 border-3 border-zinc-900 text-xs shadow-[6px_6px_0px_#000] w-fit active:scale-98 active:shadow-[0px_0px_0px_#000] tracking-wide">
					<h4>{isLoading ? "Creating Post" : "Send Post"}</h4>
				</button>
		  </form>
		 
		</div>
	);
}
