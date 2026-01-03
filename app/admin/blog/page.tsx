import React from 'react'
import { collection, getDocs,query, orderBy } from "firebase/firestore"
import { db } from '@/lib/firebase';
import { displayTime } from '@/lib/helper';
import { Delete, Edit, Trash } from 'lucide-react';


export default async function BlogsPage() {
   const posts = [];
try {
  
  const postRef = collection(db, "posts")

  const q = query(postRef, orderBy("createdAt", "desc"))
  const postsSnapshot = await getDocs(q)
 postsSnapshot.docs.forEach((post) => posts.push({id: post.id, ...post.data()}))

} catch (error) {
  console.error(error)
}
  
  return (
		<div className="p-4 flex flex-col  w-full h-full">
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
								<div className='flex gap-2'>
									<Edit size={18} className="text-blue-400" />
									<Trash color="red" fill="red" size={18} />
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>Nothing to see here </p>
			)}
		</div>
	);
}
