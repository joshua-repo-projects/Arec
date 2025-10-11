import ImageGallery from "@/components/imageGallery";
import QuantitySelector from "@/components/quantitySelector";
import SpecData from "@/components/specData";
import { Share2, ShoppingCart } from "lucide-react";
import { ProductSpecial } from "../typescript.ts/extended-interfaces";
import { formatPrice } from "@/helpers/FormatMoney";
import AcerNavbar from "@/components/navbar";
import WishlistButton from "@/components/wishlistButton";
import { Metadata } from "next";

interface IProps {
    params: Promise<{sku: string}>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const {sku} = await props.params 
 
  // fetch post information
  const post = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${sku}`).then((res) =>
    res.json()
  )
 
  return {
    title: post.data.name,
    description: post.data.description,
    openGraph: {
        images: [post.data.thumbnail]
    }
  }
}


export default async function DetailProduct(props: IProps) {
    const { sku } = await props.params
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${sku}`)
    const result = await resp.json()
    const data: ProductSpecial = result.data

    return (
        <>
            <AcerNavbar />
            <div className="bg-white min-h-screen">
                {/* Product Section */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Gallery */}
                        <ImageGallery images={data.images} />

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    {data.name}
                                </h1>
                                <p className="text-gray-600">{data.sku}</p>
                            </div>

                            {/* Highlights */}
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                                <h3 className="font-semibold text-gray-900 mb-3">Highlights:</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        <span><strong>Description</strong> – {data.description}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        <span><strong>Excerpt</strong> – {data.excerpt}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">•</span>
                                        <span><strong>Tags</strong> – {data.tags.join(', ')}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Price */}
                            <div className="border-t border-b border-gray-200 py-5">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-sm text-gray-500 line-through">{formatPrice(data.price)}</span>
                                    <span className="text-3xl font-bold text-red-600">{formatPrice(data.specialPrice ?? data.price * 0.9)}</span>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                                    <span>{data.status}</span>
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                    <QuantitySelector />
                                </div>

                                <div className="flex gap-3">
                                    <button className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                    <WishlistButton productId={data._id} />
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
                    <SpecData specs={data.specs} />

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
        </>
    );
}