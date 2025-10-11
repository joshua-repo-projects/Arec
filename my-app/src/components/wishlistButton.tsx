'use client'

import { useProduct } from "@/app/context/ProductContext"
import { Heart, Loader2 } from "lucide-react"
import { useState } from "react"

export default function WishlistButton({ productId }: { productId: string }) {
    const { wishlists, toggleWishlist } = useProduct()
    const [loading, setLoading] = useState(false)

    const handleWishlist = async () => {
        if (loading) return
        setLoading(true)
        toggleWishlist(productId)
        setLoading(false)
    }

    const isWishlisted = wishlists.some(el => el.Product.some(p => p._id === productId))

    return (
        <button
            onClick={handleWishlist}
            className={`cursor-pointer border border-gray-300 hover:bg-gray-50 p-4 rounded-lg transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'text-gray-600'
                }`}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            ) : (
                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
            )}
        </button>
    )
}