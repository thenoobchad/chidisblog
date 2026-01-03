
"use client"
import { ExternalLinkIcon, Home, LogOut, } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOut, User } from "firebase/auth";
import {auth} from "../../../lib/firebase"

export const AdminHeader = ({user}: {user: User}) => {

	

	const router = useRouter()
	return (
		<div className="w-full">
			<div className="w-full border-b border-zinc-300">
				<div className="flex justify-between px-2 items-center py-6 max-w-7xl mx-auto">
					<div>
						<p>Hello, Admin</p>
						<p className="text-xs">{user?.email}</p>
					</div>
					<div className="flex gap-4 items-center">
						<Link href="/" className="flex gap-2 bg-zinc-100 p-1 rounded-full">
							<Home size={20}/>
						</Link>
						<button
							className="cursor-pointer flex gap-2 items-center "
							onClick={() => {
								signOut(auth);
								router.push("/login");
							}}>
							<p className="flex gap-2 bg-red-500 p-1 rounded-full text-white">
							<LogOut size={18}  />
							</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};