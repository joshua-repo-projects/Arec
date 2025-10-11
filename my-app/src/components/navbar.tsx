'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Heart, Headphones, HelpCircle, User, ShoppingCart } from 'lucide-react';
import SearchBar from './fragments/searchBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/helpers/logout';

export default function AcerNavbar() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [hovered, setHovered] = useState(false)
    const router = useRouter()
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const token = document.cookie.split('; ').some(el => el.startsWith('access_token='))
        setLoggedIn(token)
    }, [])

    const handleMouseEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setHovered(true)
    }

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setHovered(false);
        }, 250)
    }

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="w-full px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="font-sans text-6xl font-bold text-lime-800 leading-none relative top-[-10px]"
                        >
                            arec
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <SearchBar />

                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/products"
                            className="font-sans text-2xl font-bold text-lime-500 leading-none relative top-[-3px]"
                        >
                            Products
                        </Link>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-[#83b81a] transition-colors">
                            <Heart className="h-6 w-6" />
                        </button>
                        <button className="text-gray-600 hover:text-[#83b81a] transition-colors">
                            <Headphones className="h-6 w-6" />
                        </button>
                        <button className="text-gray-600 hover:text-[#83b81a] transition-colors">
                            <HelpCircle className="h-6 w-6" />
                        </button>
                        <div
                            className="relative cursor-pointer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className={`p-2 rounded-full transition ${loggedIn
                                    ? 'bg-[#83b81a] text-white'
                                    : 'text-gray-600 hover:text-[#83b81a]'
                                    }`}
                            >
                                <User className="h-6 w-6" />
                            </button>

                            {/* Dropdown muncul saat hover dan user login */}
                            {loggedIn && hovered && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 border z-50">
                                    <Link
                                        href="/wishlist"
                                        className="block w-full text-center bg-[#83b81a] hover:bg-[#6da412] text-white font-semibold py-2 rounded-full mb-2 transition"
                                    >
                                        MY WISHLISTS
                                    </Link>
                                    <button
                                        onClick={logoutUser}
                                        className="cursor-pointer block w-full border-2 border-[#83b81a] text-[#83b81a] hover:bg-[#83b81a] hover:text-white font-semibold py-2 rounded-full transition"
                                    >
                                        {loggedIn ? 'SIGN OUT' : 'SIGN IN'}
                                    </button>
                                </div>
                            )}
                            {!loggedIn && hovered && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-lg p-4 z-50">
                                    <button
                                        onClick={() => router.push('/login')}
                                        className="cursor-pointer w-full border-2 border-[#83b81a] text-[#83b81a] py-2 rounded font-bold hover:bg-[#83b81a] hover:text-white"
                                    >
                                        SIGN IN
                                    </button>
                                </div>
                            )}
                        </div>
                        <button className="text-gray-600 hover:text-[#83b81a] transition-colors">
                            <ShoppingCart className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}