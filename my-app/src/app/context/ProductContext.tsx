'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { showError } from "@/helpers/alert"
import { Loading } from "@/components/loading"
import { IWishListItem } from "../(main)/wishlist/page"
import { ProductSpecial } from "../(main)/products/typescript.ts/extended-interfaces"

interface IPagination {
    totalProducts: number
    totalPages: number
    currentPage: number
    limit: number
}

type ProductContextType = {
    products: ProductSpecial[]
    pagination: IPagination | null
    wishlists: IWishListItem[]
    loadMore: boolean
    toggleWishlist: (productId: string) => void
    fetchProducts: (page?: number, append?: boolean, search?: string) => Promise<void>
    loadingMore: boolean
    fetchWishlists: () => Promise<void>
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<ProductSpecial[]>([])
    const [wishlists, setWishLists] = useState<IWishListItem[]>([])
    const [pagination, setPagination] = useState<IPagination | null>(null)
    const [loadMore, setLoadMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const fetchProducts = async (page: number = 1, append: boolean = false, search: string = '') => {
        if (loading || (append && loadingMore)) return

        if (append) setLoadingMore(true)
        else setLoading(true)

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&search=${encodeURIComponent(search)}`)
            const data = await resp.json()
            const allProducts = data.data.data
            setProducts((el) =>
                append ? [...el, ...allProducts] : allProducts
            )
            setPagination(data.data.pagination)
            setLoadMore(data.data.pagination.currentPage < data.data.pagination.totalPages)
        } catch (error) {
            console.log(error, '<<< error ProductContext')
            showError(error)
        } finally {
            await new Promise((reload) => setTimeout(reload, 500))
            if (append) setLoadingMore(false)
            setLoading(false)
        }
    }

    async function fetchWishlists() {
        try {
            setLoading(true)
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await resp.json()

            if (!resp.ok) {
                return
            }

            setWishLists(data.data)
        } catch (error) {
            console.log(error, '<<<error wishlist')
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts(1, false)
        fetchWishlists()
    }, [])

    const toggleWishlist = async (productId: string): Promise<void> => {
        try {
            setLoading(true)
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ productId })
            })

            const data = await resp.json()
            if (!resp.ok) {
                if (resp.status === 401) {
                    window.location.href = '/login'
                } else {
                    showError(data.message)
                }
                return;
            }

            if (resp.ok) {
                await fetchWishlists();
            }
        } catch (error) {
            console.log(error, '<<<  add wishlist at product page')
            showError(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <ProductContext.Provider value={{ products, wishlists, toggleWishlist, pagination, fetchProducts, loadMore, loadingMore, fetchWishlists }}>
            {children}
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
                    <Loading />
                </div>
            )}
        </ProductContext.Provider>
    )
}

export function useProduct() {
    const context = useContext(ProductContext)
    if (!context) throw new Error('useProduct must be used within a ProductProvider')
    return context
}
