'use client'

import { Loading } from "@/components/loading"
import { showError } from "@/helpers/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function LoginPage() {
    const router = useRouter()
    const [forms, setForm] = useState({
        email: '',
        username: '',
        name: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((form) => ({
            ...form,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(forms)
            })
            const data = await resp.json()
            if (!resp.ok) {
                showError(data.message)
                return
            }
            router.push('/login')
        } catch (error) {
            console.log(error, '<<< error register page')
            showError(error)
        } finally {
            setLoading(false)
        }

    }

    const isFilled = forms.email.trim().length > 0 || forms.password.trim().length > 0

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100">
            <div className="fieldset bg-base-200 border-base-300 rounded-box border p-8 w-full max-w-lg">
                <div className="text-3xl font-bold text-center mb-6">Register</div>
                <form onSubmit={handleSubmit}>
                    <label className="label">Email</label>
                    <input
                        name="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        onChange={handleChange}
                        value={forms.email}
                    />

                    <label className="label">Username</label>
                    <input
                        name="username"
                        className="input input-bordered w-full"
                        placeholder="Username"
                        onChange={handleChange}
                        value={forms.username}
                    />

                    <label className="label">Name</label>
                    <input
                        name="name"
                        className="input input-bordered w-full"
                        placeholder="Name"
                        onChange={handleChange}
                        value={forms.name}
                    />

                    <label className="label mt-4">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="input input-bordered w-full"
                        placeholder="Password"
                        onChange={handleChange}
                        value={forms.password}
                    />

                    <button
                        type="submit"
                        disabled={!isFilled}
                        className={`cursor-pointer w-full mt-6 py-3 rounded-full font-semibold transition-colors duration-300 ${isFilled
                            ? "bg-[#83b81a] text-white hover:bg-[#6fa015]"
                            : "bg-[#cde7b1] text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#83b81a] hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}