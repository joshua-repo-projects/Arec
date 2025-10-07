import { Search } from "lucide-react";


export default function SearchBar() {

    return (
        <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="cursor-pointer bg-[#83b81a] hover:bg-[#6fa015] px-6 py-2 transition-colors">
                    <Search className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    )
}