"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";


const AuthContext = createContext < { user: User | null; loading: boolean }>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false)
				});

        return () => unsub()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)