'use client'

import { useProduct } from "@/app/context/ProductContext";
import CardProduct from "@/components/cardProduct";
import AcerNavbar from "@/components/navbar";
import { Grid, Heart, List } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomLoader from "@/components/bottomLoading";
import { Loading } from "@/components/loading";
import { IWishListItem } from "../wishlist/page";
import { formatPrice } from "@/helpers/FormatMoney";
import { ProductSpecial } from "./typescript.ts/extended-interfaces";
import { useRouter, useSearchParams } from "next/navigation";

export default function ListProduct() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('price_desc')
  const { products, fetchProducts, loadMore, pagination, loadingMore, toggleWishlist, fetchWishlists, wishlists } = useProduct()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  const fetchMore = async () => {
    if (pagination && loadMore) {
      await fetchProducts(pagination.currentPage + 1, true, search)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProducts(1, false, search).finally(() => setLoading(false))
  }, [search])

  useEffect(() => {
    fetchWishlists()
  }, [])

  if (loading) return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <Loading />
    </div>
  )

  return (
    <>
      <AcerNavbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Gaming Laptops</h1>
              <button
                onClick={() => router.push('/wishlist')}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Heart className="w-5 h-5" />
                My Wish List
                {wishlists.length > 0 && (
                  <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-sm font-semibold">
                    {wishlists.length}
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

                <div className="max-h-[450px] overflow-y-auto pr-2 space-y-4">
                  {wishlists.length === 0 ? (
                    <p className="text-gray-600">You have no items in your wish list.</p>
                  ) : (
                    <div className="space-y-3">
                      {wishlists.map((item: IWishListItem) => (
                        <div key={item._id} className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition">
                          {item.Product.map((product: ProductSpecial) => (
                            <div key={`${item._id}-${product._id}`} className="flex gap-3 items-start">
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{product.category}</p>
                                <p className="text-sm font-bold text-red-600 mt-1">
                                  {formatPrice(product.specialPrice ?? product.price * 0.9)}
                                </p>
                              </div>
                              <button
                                onClick={() => toggleWishlist(product._id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Heart className="cursor-pointer w-5 h-5 fill-current" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                        className={`cursor-pointer p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`cursor-pointer p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
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