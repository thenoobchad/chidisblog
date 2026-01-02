
"use client"
import { ExternalLinkIcon, } from "lucide-react";
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
						<p
						>Hello, Admin</p>
						<p className="text-xs">{user?.email}</p>
					</div>
					<Link href="/" className="flex gap-2">
						<ExternalLinkIcon />
						
					</Link>
					<button onClick={() => {
						signOut(auth);
						router.push("/login")
					}}>Log out</button>

				</div>
			</div>
		</div>
	);
};