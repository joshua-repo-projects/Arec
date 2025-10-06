'use client'

import AcerNavbar from "@/components/navbar";
import { formatPrice } from "@/helpers/FormatMoney";
import { Grid, Heart, List, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  model: string;
  sku: string;
  image: string;
  regularPrice: number;
  specialPrice: number;
  status: string;
  rating: number;
}

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('price_desc')
  const [wishlist, setWishList] = useState<number[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: "Predator Helios Neo 16",
      model: "PHN16-72",
      sku: "NH.QNRSN.002",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      regularPrice: 102399000,
      specialPrice: 89999000,
      status: "Available now",
      rating: 4.5
    },
    {
      id: 2,
      name: "Predator Helios Neo 16",
      model: "PHN16-72",
      sku: "NH.QNQSN.001",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
      regularPrice: 90999000,
      specialPrice: 79999000,
      status: "Available now",
      rating: 4.8
    },
    {
      id: 3,
      name: "Predator Triton 500SE",
      model: "PT516-52s | Core i9 RTX3080Ti",
      sku: "NH.QFRSN.001",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop",
      regularPrice: 73949000,
      specialPrice: 64999000,
      status: "Available now",
      rating: 5.0
    },
    {
      id: 4,
      name: "Predator Helios 300",
      model: "PH315-55",
      sku: "NH.QERSN.003",
      image: "https://images.unsplash.com/photo-1625024553337-4c2e87bb9ce0?w=400&h=300&fit=crop",
      regularPrice: 71699000,
      specialPrice: 62999000,
      status: "Available now",
      rating: 4.7
    },
    {
      id: 5,
      name: "Predator Helios Neo 18",
      model: "PHN18-71",
      sku: "NH.QMTSN.001",
      image: "https://images.unsplash.com/photo-1602524206684-dcbe9d2f2c7f?w=400&h=300&fit=crop",
      regularPrice: 56999000,
      specialPrice: 54999000,
      status: "Available now",
      rating: 4.6
    },
    {
      id: 6,
      name: "NITRO 5",
      model: "AN515-58",
      sku: "NH.QFKSN.005",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      regularPrice: 45999000,
      specialPrice: 40999000,
      status: "Available now",
      rating: 4.4
    },
    {
      id: 7,
      name: "NITRO V 15",
      model: "ANV15-51",
      sku: "NH.QNASN.001",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop",
      regularPrice: 38999000,
      specialPrice: 32999000,
      status: "Pre-order",
      rating: 4.3
    },
    {
      id: 8,
      name: "NITRO V 15",
      model: "ANV15-41",
      sku: "NH.QN9SN.002",
      image: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=400&h=300&fit=crop",
      regularPrice: 29999000,
      specialPrice: 26999000,
      status: "Available now",
      rating: 4.5
    },
    {
      id: 9,
      name: "NITRO V 16S AI (Slim)",
      model: "ANV16S-41",
      sku: "NH.QZYSN.001",
      image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=400&h=300&fit=crop",
      regularPrice: 28999000,
      specialPrice: 21999000,
      status: "Available now",
      rating: 4.2
    },
    {
      id: 10,
      name: "NITRO V 16S (Slim)",
      model: "ANV16S-71",
      sku: "NH.QXCSN.001",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      regularPrice: 26199000,
      specialPrice: 21999000,
      status: "Available now",
      rating: 4.1
    }
  ];

  const toggleWishlist = (productId: number): void => {
    setWishList((prev: number[]) => 
      prev.includes(productId) 
        ? prev.filter((id: number) => id !== productId)
        : [...prev, productId]
    );
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  return (
    <>
      <AcerNavbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Gaming Laptops</h1>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Heart className="w-5 h-5" />
                My Wish List
                {wishlist.length > 0 && (
                  <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-sm font-semibold">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar - My Wish List */}
            <aside className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Wish List</h2>

                {wishlistProducts.length === 0 ? (
                  <p className="text-gray-600">You have no items in your wish list.</p>
                ) : (
                  <div className="space-y-3">
                    {wishlistProducts.map((product) => (
                      <div key={product.id} className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                          <p className="text-xs text-gray-500 truncate">{product.model}</p>
                          <p className="text-sm font-bold text-red-600 mt-1">
                            {formatPrice(product.specialPrice)}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {products.length} items
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sort By:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded px-3 py-1 text-sm"
                      >
                        <option value="price_desc">Price: High to Low</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="name">Name</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition group">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full transition ${wishlist.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold ${product.status === 'Pre-order'
                          ? 'bg-orange-500 text-white'
                          : 'bg-green-500 text-white'
                        }`}>
                        {product.status}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.model}</p>
                      <p className="text-xs text-gray-500 mb-3">{product.sku}</p>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-gray-500 line-through">
                          Regular Price {formatPrice(product.regularPrice)}
                        </div>
                        <div className="text-xl font-bold text-red-600">
                          Special Price {formatPrice(product.specialPrice)}
                        </div>
                      </div>

                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}