'use client'

import React from 'react';
import { Search, Heart, Headphones, HelpCircle, User, ShoppingCart } from 'lucide-react';

export default function AcerNavbar() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="w-full px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="/"
                            className="font-sans text-6xl font-bold text-lime-800 leading-none relative top-[-10px]"
                        >
                            acer
                        </a>
                    </div>

                    {/* Search Bar */}
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
                        <button className="text-gray-600 hover:text-[#83b81a] transition-colors">
                            <User className="h-6 w-6" />
                        </button>
                        <button className="text-gray-600 hover:text-[#83b81a] transition-colors">
                            <ShoppingCart className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}