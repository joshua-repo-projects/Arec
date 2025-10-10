'use client'

import { ChevronDown, ChevronUp, Heart, Share2, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface SpecItem {
  label: string;
  value: string;
}

interface SpecSection {
  title: string;
  items: SpecItem[];
}

interface Specs {
  [key: string]: SpecSection;
} 

export default function DetailProduct() {
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(1)
    const [activeSpec, setActiveSpec] = useState<string | null>('processor')

    const images: string[] = [
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
  ];

  const specs: Specs = {
    processor: {
      title: 'Processor & Chipset',
      items: [
        { label: 'Processor Type', value: 'Core™ 7' },
        { label: 'Processor Model', value: 'Intel® Core™ 7 240H (10 Cores, up to 5.1 GHz)' },
      ]
    },
    memory: {
      title: 'Memory',
      items: [
        { label: 'Standard Memory', value: '16 GB' },
        { label: 'Maximum Memory', value: '24 GB' },
        { label: 'Memory Technology', value: 'DDR5' },
      ]
    },
    storage: {
      title: 'Storage',
      items: [
        { label: 'Total SSD Capacity', value: '512 GB' },
        { label: 'SSD Interface', value: 'NVMe' },
      ]
    },
    display: {
      title: 'Display & Graphics',
      items: [
        { label: 'Screen Size', value: '40.6 cm (16")' },
        { label: 'Screen Resolution', value: '1920 x 1200 (WUXGA)' },
        { label: 'Refresh Rate', value: '180 Hz' },
        { label: 'Response Time', value: '3 ms (GTG)' },
        { label: 'Color Gamut', value: '100% sRGB' },
        { label: 'Graphics', value: 'NVIDIA® GeForce RTX™ 4050 with 6GB GDDR6' },
      ]
    },
    os: {
      title: 'Operating System',
      items: [
        { label: 'Operating System', value: 'Windows 11 Home' },
      ]
    }
  };

    return (
        <div className="bg-white min-h-screen">
            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
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

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Nitro Lite 16
                            </h1>
                            <p className="text-gray-600">Ref. NH.D59SN.002</p>
                        </div>

                        {/* Highlights */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                            <h3 className="font-semibold text-gray-900 mb-3">Highlights:</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span><strong>Slim & Stylish Design</strong> – Desain tipis minimalis dengan backlit Froze Keyboard yang unik</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span><strong>Everyday Gaming Performance</strong> – Didukung prosesor Intel® Core™ 7 240H hingga 10 core</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span><strong>AI-Enhanced Graphics</strong> untuk visual nyata dengan GPU RTX™ 4050 dan teknologi AI hingga 194 TOPS</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span><strong>Vivid & Smooth Display</strong> dengan Layar 16inch 16:10, 100% sRGB, refresh rate 180Hz untuk gameplay mulus</span>
                                </li>
                            </ul>
                        </div>

                        {/* Price */}
                        <div className="border-t border-b border-gray-200 py-5">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-sm text-gray-500 line-through">IDR 14,999,000</span>
                                <span className="text-3xl font-bold text-red-600">IDR 12,499,000</span>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                                <span>In Stock</span>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-gray-700">Quantity:</label>
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
                            </div>

                            <div className="flex gap-3">
                                <button className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button className="cursor-pointer border border-gray-300 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                                    <Heart size={20} />
                                </button>
                                <button className="cursor-pointer border border-gray-300 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://static-ecapac.acer.com/media/wysiwyg/ID-Store/Icon_Garansi_Ekstra_utk_eStore_Laptop.png"
                                    alt="Warranty"
                                    className="w-12 h-12"
                                />
                                <div className="text-sm text-gray-700">
                                    <p className="font-semibold">Garansi Ekstra untuk eStore</p>
                                    <p>Dapatkan perlindungan tambahan untuk pembelian Anda</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specifications Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        {Object.entries(specs).map(([key, section], idx) => (
                            <div key={key} className={idx !== 0 ? 'border-t border-gray-200' : ''}>
                                <button
                                    onClick={() => setActiveSpec(activeSpec === key ? null : key)}
                                    className="cursor-pointer w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 flex items-center gap-2">
                                        <span className="text-blue-600">▶</span>
                                        {section.title}
                                    </span>
                                    {activeSpec === key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {activeSpec === key && (
                                    <div className="px-5 pb-5">
                                        <table className="w-full">
                                            <tbody>
                                                {section.items.map((item, itemIdx) => (
                                                    <tr key={itemIdx} className={itemIdx !== 0 ? 'border-t border-gray-100' : ''}>
                                                        <td className="py-3 pr-6 text-sm font-medium text-gray-600 align-top">
                                                            {item.label}
                                                        </td>
                                                        <td className="py-3 text-sm text-gray-900">
                                                            {item.value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                    <div className="border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-600 mb-4">Be the first to review this product</p>
                        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                            Write Your Own Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}