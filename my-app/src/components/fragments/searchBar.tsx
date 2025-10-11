'use client'

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SearchBar() {
    const router = useRouter()
    const [query, setQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if(!query.trim()) return
        router.push(`/products?search=${encodeURIComponent(query)}`)
    }

    return (
        <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative flex">
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button 
                type="submit"
                className="cursor-pointer bg-[#83b81a] hover:bg-[#6fa015] px-6 py-2 transition-colors">
                    <Search className="h-5 w-5 text-white" />
                </button>
            </form>
        </div>
    )
}