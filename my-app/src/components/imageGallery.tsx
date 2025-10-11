'use client'

import { useState } from "react"

export default function ImageGallery({images}: {images: string[]}) {
    const [selectedImage, setSelectedImage] = useState<number>(0)

    return (
        <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden aspect-[4/3]">
                <img
                    src={images[selectedImage]}
                    alt="Product"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`cursor-pointer bg-gray-50 rounded-lg overflow-hidden aspect-square border-2 transition-all ${selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                            }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    )
}