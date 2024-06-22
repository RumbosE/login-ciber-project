"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function dashboard() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        
        const user = searchParams.get("user")
        if (!user) {
            router.push("/auth/login")
        }else {
            setUser(user)
        }
    }, [])

    const handleLogout = () => {
        signOut()
    }

    return (
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-blue-500 font-bold text-3xl mb-5 text-center">Dashboard Page</h1>
                <h1 className="text-blue-500 font-bold text-3xl mb-5 text-center">Hello {user}</h1>
                <button onClick={handleLogout} className="bg-blue-500 text-white p-2 rounded-lg">Logout</button>
            </div>
        </section>
    )
}

export default dashboard