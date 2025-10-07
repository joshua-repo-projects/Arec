'use client'

import AcerNavbar from "@/components/navbar";
import { formatPrice } from "@/helpers/FormatMoney";
import { Share2, ShoppingCart, X } from "lucide-react";
import { useState } from "react";


interface WishListItem {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    stock: 'IN STOCK' | 'OUT OF STOCK';
}

export default function WishListPage() {
    const [items, setItems] = useState<WishListItem[]>([
        {
            id: 1,
            name: 'Predator Galea 311 Headset Gaming',
            price: 674100,
            originalPrice: 899000,
            image: '/api/placeholder/150/150',
            stock: 'OUT OF STOCK'
        },
        {
            id: 2,
            name: 'Predator Gaming Utility Backpack',
            price: 1499000,
            image: '/api/placeholder/150/150',
            stock: 'IN STOCK'
        },
        {
            id: 3,
            name: 'Predator Gaming Mousepad (XL)',
            price: 449100,
            image: '/api/placeholder/150/150',
            stock: 'IN STOCK'
        }
    ])

    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
    )

    const removeItem = (id: number) => {
        setItems(items.filter(el => el.id === id))
    }

    const updateQuantity = (id: number, qty: number) => {
        setQuantities({ ...quantities, [id]: qty })
    }

    return (
        <>
        <AcerNavbar />
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-8xl mx-auto flex gap-8">
                <div className="w-80 flex-shrink-0">
                    {/* Mini Wish List in Sidebar */}
                    <div className="bg-white rounded shadow mt-4 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-800">My Wish List</h4>
                            <span className="text-sm text-gray-500">(3 items)</span>
                        </div>

                        {items.map((item) => (
                            <div key={item.id} className="mb-6 pb-6 border-b last:border-b-0 last:mb-0 last:pb-0">
                                <div className="flex gap-3 items-start mb-3">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="cursor-pointer text-gray-400 hover:text-gray-600 mt-1"
                                    >
                                        <X size={18} />
                                    </button>
                                    <div className="flex-1">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mb-2" />
                                        <p className="text-sm text-gray-800 font-medium leading-tight line-clamp-3">{item.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-gray-900 mb-2">{formatPrice(item.price)}</p>
                                    {item.stock === 'IN STOCK' ? (
                                        <button className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded flex items-center justify-center gap-2">
                                            <ShoppingCart size={16} />
                                        </button>
                                    ) : (
                                        <button className="cursor-pointer w-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 py-2 px-3 rounded font-medium">
                                            Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded shadow">
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800">My Wish List</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">{items.length} Item(s)</span>
                                <span className="text-sm text-gray-600">Show</span>
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="p-6">
                            <div className="grid grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded p-4 hover:shadow-lg transition-shadow">
                                        <div className="relative">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="cursor-pointer absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                                            >
                                                <X size={20} />
                                            </button>
                                            <img src={item.image} alt={item.name} className="w-full h-40 object-contain mb-4" />
                                        </div>

                                        <h3 className="text-sm font-medium text-gray-800 mb-2 h-10">{item.name}</h3>

                                        <div className="mb-3">
                                            <p className="text-lg font-bold text-gray-800">{formatPrice(item.price)}</p>
                                            {item.originalPrice && (
                                                <p className="text-sm text-gray-400 line-through">{formatPrice(item.originalPrice)}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm text-gray-600">Qty</span>
                                            <select
                                                value={quantities[item.id]}
                                                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                disabled={item.stock === 'OUT OF STOCK'}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n}>{n}</option>)}
                                            </select>
                                            {item.stock === 'IN STOCK' ? (
                                                <span className="ml-2 flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    <span className="text-xs text-green-600 font-medium">{item.stock}</span>
                                                </span>
                                            ) : (
                                                <span className="ml-2 text-xs text-red-600 font-medium">{item.stock}</span>
                                            )}
                                        </div>

                                        {item.stock === 'IN STOCK' ? (
                                            <button className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-2 flex items-center justify-center gap-2">
                                                <ShoppingCart size={16} />
                                            </button>
                                        ) : (
                                            <button className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-2">
                                                Details
                                            </button>
                                        )}

                                        <div className="flex gap-2 text-xs">
                                            <button className="cursor-pointer text-blue-600 hover:underline">Comment</button>
                                            <span className="text-gray-300">|</span>
                                            <button className="cursor-pointer text-green-600 hover:underline">Edit</button>
                                            <span className="text-gray-300">|</span>
                                            <button className="text-green-600 hover:underline">Remove Item</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex gap-4">
                                <button className="cursor-pointer px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium">
                                    Update Wish List
                                </button>
                                <button className="cursor-pointer px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2">
                                    <Share2 size={16} />
                                    Share Wish List
                                </button>
                                <button className="cursor-pointer px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium">
                                    Add All to Cart
                                </button>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-between items-center">
                                <span className="text-sm text-gray-600">{items.length} Item(s)</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}