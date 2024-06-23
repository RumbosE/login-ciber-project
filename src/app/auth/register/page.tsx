"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match")
            return
        };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            })
        })

        if (res.ok) {
            alert("User created successfully!")
            router.push("/auth/login")
        }
        else {
            res.json().then((data) => setError(data.message))
        }

    })

    return (

        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form action="" onSubmit={onSubmit} className="w-1/2 h-fit bg-gray-300 flex flex-col justify-between px-6 py-10 rounded-lg">

                <h1 className="text-blue-500 font-bold text-3xl mb-5 text-center">Register Page</h1>
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-lg text-center">{error}</div>
                )}
                <div className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="username" className="text-blue-900 font-bold">Username</label>
                        <input type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "This field is required"
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
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })}
                            className="p-2 border bg-slate-100 text-blue-900 rounded block border-gray-300 w-full"
                            placeholder="*******"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs">{errors.password.message as string}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="text-blue-900 font-bold">Confirm Password</label>
                        <input type="password"
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })}
                            className="p-2 border bg-slate-100 text-blue-900 rounded block border-gray-300 w-full"
                            placeholder="*******"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-xs">{errors.confirmPassword.message as string}</span>
                        )}

                    </div>
                </div>


                <button type="submit" className="w-full bg-green-500 p-3 mt-6 rounded-lg text-white text-lg font-bold">Submit</button>
            </form>
        </div>

    )
}

export default RegisterPage