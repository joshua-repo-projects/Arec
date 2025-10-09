'use client'

import { useProduct } from "@/app/context/ProductContext";
import CardProduct from "@/components/cardProduct";
import AcerNavbar from "@/components/navbar";
import { Grid, Heart, List, Loader2, Star } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Product } from "./typescript.ts/interfaces";
import { Loading } from "@/components/loading";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomLoader from "@/components/bottomLoading";

interface IWishlist {
  _id: string
  userId: string
  productId: string
  Product: Product[]
}

export default function ListProduct() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('price_desc')
  const { products, fetchProducts, loadMore, pagination, loadingMore } = useProduct()
  // const [wishlists, setWishlists] = useState<IWishlist[]>([])

  const fetchMore = async () => {
    if (pagination && loadMore) {
      await fetchProducts(pagination.currentPage + 1, true)
    }
  }

  // useEffect(() => {
  //   async function fetchWislists() {
  //     const resp = await fetch('http://localhost:3000/api/wishlists', {
  //       method: 'GET',
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     })
  //     const data = await resp.json()
  //     setWishlists(data)
  //   }
  //   fetchWislists()
  // }, [])

  // const wishlistProducts = products.filter(p => wishlist.includes(p._id))

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
                {/* {wishlist.length > 0 && (
                  <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-sm font-semibold">
                    {wishlist.length}
                  </span>
                )} */}
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

                {/* {wishlistProducts.length === 0 ? (
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
                )} */}
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
              <InfiniteScroll
                dataLength={products.length}
                next={fetchMore}
                hasMore={loadMore}
                loader={
                  loadingMore && (
                    <div className="flex justify-center py-6">
                      <BottomLoader />
                    </div>
                  )
                }
                endMessage={
                  <div className="text-center py-8 text-gray-400">
                    Nothing more
                  </div>
                }
              >
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {products.map((product) => (
                    <CardProduct key={product._id} product={product} />
                  ))}
                </div>
              </InfiniteScroll>

            </main>
          </div>
        </div>
      </div >
    </>
  );
}