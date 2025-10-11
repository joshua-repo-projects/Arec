'use client'

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function SearchBar() {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [debounceQuery, setDebounceQuery] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceQuery(query)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [query])

    useEffect(() => {
        if (debounceQuery.trim()) {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/products?search=${encodeURIComponent(debounceQuery)}`)
        }
    }, [debounceQuery, router])

    return (
        <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={(e) => e.preventDefault()} className="relative flex">
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button 
                type="submit"
                className="cursor-pointer bg-[#83b81a] hover:bg-[#6fa015] px-6 py-2 transition-colors"
                onClick={() => {
                    if (query.trim()) {
                        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/products?search=${encodeURIComponent(query)}`)
                    }
                }}
                >
                    <Search className="h-5 w-5 text-white" />
                </button>
            </form>
        </div>
    )
}