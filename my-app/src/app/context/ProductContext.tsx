'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Product } from "../(main)/products/typescript.ts/interfaces"
import { showError } from "@/helpers/alert"

type ProductContextType = {
    products: Product[]
    wishlist: string[]
    toggleWishlist: (id: string) => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({children}: {children: ReactNode}) {
    const [products, setProducts] = useState<Product[]>([])
    const [wishlist, setWishList] = useState<string[]>([])

    useEffect(() => {
        async function fetchData() {
          try {
            const resp = await fetch('http://localhost:3000/api/products', {
              method: 'GET',
              headers: {
                'Content-type': 'application/json'
              }
            })
            const data = await resp.json()
            // console.log(data)
            setProducts(data.data.data)
          } catch (error) {
            console.log(error)
            showError(error)
          }
        }
        fetchData()
      }, [])

    const toggleWishlist = (productId: string): void => {
    setWishList((prev: string[]) => 
      prev.includes(productId) 
        ? prev.filter((id: string) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <ProductContext.Provider value={{products, wishlist, toggleWishlist}}>
        {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
    const context = useContext(ProductContext)
    if(!context) throw new Error('useProduct must be used within a ProductProvider')
    return context
}
