'use client'

import React from 'react';
import { Search, Heart, Headphones, HelpCircle, User, ShoppingCart } from 'lucide-react';
import SearchBar from './fragments/searchBar';

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
                    <SearchBar />

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