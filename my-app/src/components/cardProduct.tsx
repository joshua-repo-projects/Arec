import { ProductSpecial } from "@/app/(main)/products/typescript.ts/extended-interfaces";
import { Product } from "@/app/(main)/products/typescript.ts/interfaces";
import { useProduct } from "@/app/context/ProductContext";
import { formatPrice } from "@/helpers/FormatMoney";
import { Heart, Star } from "lucide-react";


type TCardProductWithSpecial = {
    product: ProductSpecial
}

export default function CardProduct({product}: TCardProductWithSpecial) {
    const {wishlist, toggleWishlist} = useProduct()


    return (
        <div key={product._id} className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition group">
                    <div className="relative">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <button
                        onClick={() => toggleWishlist(product._id)}
                        className={`cursor-pointer absolute top-3 right-3 p-2 rounded-full transition ${wishlist.includes(product._id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product._id) ? 'fill-current' : ''}`} />
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
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
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
                          Regular Price {formatPrice(product.price)}
                        </div>
                        <div className="text-xl font-bold text-red-600">
                          Special Price {formatPrice(product.specialPrice ?? product.price * 0.9)}
                        </div>
                      </div>

                      <button className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>
    )
}