import AcerNavbar from "@/components/navbar";
import { ChevronRight, Eye, Heart, Star } from "lucide-react";
import { ProductSpecial } from "./products/typescript.ts/extended-interfaces";
import Link from "next/link";
import { formatPrice } from "@/helpers/FormatMoney";
import Banner from "@/components/banner";
import DetailEcommerce from "@/components/detailEcommerce";


export default async function Home() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
  const data = await resp.json()
  console.log(data, '<<< data')

  const featuredProducts: ProductSpecial[] = data.data.data.sort(() => 0.5 - Math.random()).slice(0, 10)

  return (
    <>
      <AcerNavbar />
      <div className="min-h-screen bg-gray-50">

        <Banner />
        <DetailEcommerce/>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Discover our best-selling items</p>
            </div>
            <Link
              href='/products'
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              See All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition group">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="cursor-pointer w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${product.status === 'Available now' ? 'bg-green-500' :
                    product.status === 'Pre-order' ? 'bg-red-500' : 'bg-orange-500'
                    }`}>
                    {product.status}
                  </span>
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="cursor-pointer bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                      <Heart className="cursor-pointer w-4 h-4" />
                    </button>
                    <button className="cursor-pointer bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                      <Eye className="cursor-pointer w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2 h-12">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="cursor-pointer w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.excerpt})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-600">{formatPrice(product.specialPrice ?? product.price * 0.9)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
                  </div>
                  <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-6">Get the latest updates on new products and upcoming sales</p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-4">YourStore</h3>
                <p className="text-sm">Your trusted online shopping destination for quality products at great prices.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">FAQs</a></li>
                  <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Electronics</a></li>
                  <li><a href="#" className="hover:text-white">Accessories</a></li>
                  <li><a href="#" className="hover:text-white">Gaming</a></li>
                  <li><a href="#" className="hover:text-white">Audio</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                <ul className="space-y-2 text-sm">
                  <li>Email: support@yourstore.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Hours: Mon-Fri 9AM-6PM</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; 2024 YourStore. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}