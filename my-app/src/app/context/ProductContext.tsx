'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Product } from "../(main)/products/typescript.ts/interfaces"
import { showError } from "@/helpers/alert"
import { Loading } from "@/components/loading"

interface IPagination {
    totalProducts: number
    totalPages: number
    currentPage: number
    limit: number
}

type ProductContextType = {
    products: Product[]
    pagination: IPagination | null
    wishlist: string[]
    loadMore: boolean
    toggleWishlist: (id: string) => void
    fetchProducts: (page?: number, append?: boolean) => Promise<void>
    loadingMore: boolean
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([])
    const [wishlist, setWishList] = useState<string[]>([])
    const [pagination, setPagination] = useState<IPagination | null>(null)
    const [loadMore, setLoadMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const fetchProducts = async (page: number = 1, append: boolean = false) => {
        if (loading || (append && loadingMore)) return

        if (append) setLoadingMore(true)
        else setLoading(true)

        try {
            const resp = await fetch(`http://localhost:3000/api/products?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
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
            if(append) setLoadingMore(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts(1, false)
    }, [])

    const toggleWishlist = (productId: string): void => {
        setWishList((prev: string[]) =>
            prev.includes(productId)
                ? prev.filter((id: string) => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <ProductContext.Provider value={{ products, wishlist, toggleWishlist, pagination, fetchProducts, loadMore, loadingMore }}>
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
