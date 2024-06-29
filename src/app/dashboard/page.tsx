"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function Dashboard() {

    const router = useRouter()
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setUser(user)
        }else {
            router.push("/auth/login")
        }
    }, [])

    const handleLogout = () => {
        router.push("/auth/login")
    }

    return (
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-slate-200 font-bold text-3xl mb-5 text-center">Dashboard Page</h1>
                <h1 className="text-slate-200 font-bold text-3xl mb-5 text-center">Hello {user}</h1>
                <button onClick={handleLogout} className="bg-red-700 text-white p-2 rounded-lg">Logout</button>
            </div>
        </section>
    )
}

export default Dashboard