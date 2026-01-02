"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";

import Box from "@mui/material/Box";

export default function AuthPage() {
	const [authForm, setAuthForm] = useState("sign-in");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const router = useRouter();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		console.log(data);

		try {
			if (authForm && authForm === "sign-up") {
				createUserWithEmailAndPassword(auth, data.email, data.password)
					.then((userCredential) => {
						// Signed up
						const user = userCredential.user;
						console.log(user)
						router.push("/admin");

						// ...
					})
					.catch((error) => {
						
						const errorMessage = error.message;
						setError(errorMessage);
						// ..
					});

				
			} else if (authForm === "sign-in") {
				signInWithEmailAndPassword(auth, data.email, data.password)
					.then((userCredential) => {
					
						const user = userCredential.user;
						console.log(user);
						router.push("/admin");
					
					})
					.catch((error) => {
					
						const errorMessage = error.message;
						setError("Invalid credentials")
						// ..
					});
			}
		} catch (error) {
			console.error("Error authenticating user", error.message);
			setError("Error authenticating user");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full bg-white h-screen flex items-center justify-center">
			<Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
					<h1>{authForm === "sign-in" ? "Sign in" : "Sign up"}</h1>
					<div className="flex flex-col gap-2">
						<label htmlFor="">Email</label>
						<input
							id="email"
							name="email"
							type="text"
							placeholder="e.g. johndoe@gmail.com"
							className="bg-zinc-100 p-2 "
							value={data.email}
							onChange={(e) => setData({ ...data, email: e.target.value })}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="">Password</label>
						<input
							id="password"
							type="text"
							placeholder="**********"
							className="bg-zinc-100 p-2"
							value={data.password}
							onChange={(e) => setData({ ...data, password: e.target.value })}
							name="password"
						/>
					</div>
					<button className="py-2 mt-2 bg-zinc-800 text-white">
						{loading
							? "Loading..."
							: authForm === "sign-in"
							? "Login"
							: "Sign up"}
					</button>
					{error && <p>{error}</p>}
				</form>
				{authForm === "sign-in" ? (
					<p>
						Dont have an account?{" "}
						<span
							onClick={() => {
								setAuthForm("sign-up");
							}}>
							Sign up
						</span>
					</p>
				) : (
					<p>
						Already have an acount?{" "}
						<span
							onClick={() => {
								setAuthForm("sign-in");
							}}>
							Sign in
						</span>
					</p>
				)}
			</Box>
		</div>
	);
}
