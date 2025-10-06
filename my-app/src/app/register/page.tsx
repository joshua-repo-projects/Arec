'use client'

import { useState } from "react"

export default function LoginPage() {
    const [forms, setForm] = useState({
        email: '',
        username: '',
        name: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((form) => ({
            ...form,
            [name]: value
        }))
    }

    const isFilled = forms.email.trim().length > 0 || forms.password.trim().length > 0

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100">
            <div className="fieldset bg-base-200 border-base-300 rounded-box border p-8 w-full max-w-lg">
                <div className="text-3xl font-bold text-center mb-6">Register</div>

                <label className="label">Email</label>
                <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="Email"
                    onChange={handleChange}
                    value={forms.email}
                />

                <label className="label">Username</label>
                <input
                    type="username"
                    name="username"
                    className="input input-bordered w-full"
                    placeholder="Username"
                    onChange={handleChange}
                    value={forms.username}
                />

                <label className="label">Name</label>
                <input
                    type="name"
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
                    disabled={!isFilled}
                    className={`w-full mt-6 py-3 rounded-full font-semibold transition-colors duration-300 ${isFilled
                            ? "bg-[#83b81a] text-white hover:bg-[#6fa015]"
                            : "bg-[#cde7b1] text-gray-400 cursor-not-allowed"
                        }`}
                >
                    Login
                </button>
            </div>
        </div>
    )
}