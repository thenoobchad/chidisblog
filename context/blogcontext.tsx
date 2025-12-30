"use client";
import { Posts } from "@/constants";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

type PostType = {
	id: string;
	title: string;
	content: string;
};

type BlogContextType = {
	posts: PostType[];
	fetchPosts: () => Promise<void>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
	 const [blogs, setBlogs] = useState<PostType[]>([]);

	async function fetchPosts() {
		 const res = await new Promise<PostType[]>((resolve) => {
				setTimeout(() => {
					resolve(Posts);
				}, 2000);
			});
			console.log(res);
			setBlogs(res);
		}


	// const {data, isPending, error} = useQuery({
	// 	queryKey: ['posts'],
	// 	queryFn: fetchPosts
	// })
	// console.log(data)
	return  <BlogContext.Provider value={{ posts: blogs, fetchPosts }}>
            {children}
        </BlogContext.Provider>
};

export const useBlogContext = () => useContext(BlogContext);
