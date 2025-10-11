'use client'

import { useState } from "react"

export default function QuantitySelector() {
    const [quantity, setQuantity] = useState<number>(1)

    return (
        <div className="flex items-center border border-gray-300 rounded-md">
            <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
            >
                -
            </button>
            <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-x border-gray-300 py-2"
            />
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
            >
                +
            </button>
        </div>
    )
}