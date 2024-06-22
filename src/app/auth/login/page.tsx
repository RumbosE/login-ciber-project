"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {

    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState: {errors} } = useForm()

    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const res = await signIn("credentials", {
            redirect: false,
            username: data.username,
            password: data.password
        })

        if (res?.error) {
            setError(res.error)
            return
        }else {
            router.push(`/dashboard?user=${data.username}`)
            router.refresh()
        }

        console.log(res)
    })

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <form action="" onSubmit={onSubmit} className="w-1/2 h-max bg-gray-300 flex flex-col justify-between px-6 py-10 rounded-lg">

            {error && (
                <div className="bg-red-500 text-white p-3 rounded-lg text-center text-lg">{error}</div>
            )}

            <h1 className="text-blue-500 font-bold text-3xl mb-5 text-center">Login Page</h1>
            <div className="flex flex-col gap-3">
                <div>
                <label htmlFor="username" className="text-blue-900 font-bold">Username</label>
                <input type="text"
                    {...register("username",{
                        required: {
                            value: true,
                            message: "Username is required"
                        }
                    })}
                    className="p-2 border bg-slate-100 text-blue-900 rounded block border-gray-300 w-full"
                    placeholder="Type your username..."

                />
                {errors.username && (
                    <span className="text-red-500 text-xs">{errors.username.message as string}</span>
                )}
                </div>

                <div>
                    <label htmlFor="email" className="text-blue-900 font-bold">Password</label>
                <input type="password"
                    {...register("password",{
                        required:{
                            value: true,
                            message: "Password is required"
                        }
                    })}
                    className="p-2 border bg-slate-100 text-blue-900 rounded block border-gray-300 w-full"
                    placeholder="*******"
                />
                {errors.password && (
                    <span className="text-red-500 text-xs">{errors.password.message as string}</span>
                )}
                </div>
            </div>

            <button type="submit" className="w-full bg-green-500 p-3 mt-6 rounded-lg text-white text-lg font-bold">Submit</button>
        </form>
    </div>
    );
}
export default LoginPage;