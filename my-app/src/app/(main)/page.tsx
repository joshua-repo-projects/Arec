'use client'

import AcerNavbar from "@/components/navbar";
import { ChevronLeft, ChevronRight, Eye, Heart, Star } from "lucide-react";
import { useState } from "react";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
}

interface Card {
  icon: string,
  title: string,
  description: string
}

interface FeatureProduct {
  id: number,
  name: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviews: number,
  image: string,
  badge: string
}

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState<number>(0)

  const banners: Banner[] = [
    {
      id: 1,
      title: "NEW SEASON COLLECTION",
      subtitle: "Big Sale Up to 50% Off",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      title: "PREMIUM QUALITY",
      subtitle: "Exclusive Products Just for You",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop",
      buttonText: "Discover More"
    },
    {
      id: 3,
      title: "FLASH SALE",
      subtitle: "Limited Time Offer - Don't Miss Out!",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop",
      buttonText: "Get Deals"
    }
  ];

  const infoCards: Card[] = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Free delivery for orders over $100"
    },
    {
      icon: "💳",
      title: "Secure Payment",
      description: "100% secure payment methods"
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Dedicated customer support"
    }
  ];

  const featuredProducts: FeatureProduct[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "Hot"
    },
    {
      id: 2,
      name: "Smart Watch Pro Series",
      price: 449.99,
      originalPrice: 599.99,
      rating: 4.9,
      reviews: 412,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      badge: "New"
    },
    {
      id: 3,
      name: "Professional Camera Kit",
      price: 1299.99,
      originalPrice: 1599.99,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
      badge: "Sale"
    },
    {
      id: 4,
      name: "Mechanical Gaming Keyboard",
      price: 159.99,
      originalPrice: 229.99,
      rating: 4.6,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop",
      badge: "Hot"
    },
    {
      id: 5,
      name: "Ultra HD Webcam",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.5,
      reviews: 201,
      image: "https://images.unsplash.com/photo-1589739900243-c488e2e8cbf5?w=400&h=400&fit=crop",
      badge: "New"
    },
    {
      id: 6,
      name: "Wireless Gaming Mouse",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      badge: "Hot"
    },
    {
      id: 7,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.7,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      badge: "Sale"
    },
    {
      id: 8,
      name: "USB-C Hub Adapter",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.4,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
      badge: "New"
    },
    {
      id: 9,
      name: "Laptop Stand Aluminum",
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.6,
      reviews: 378,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      badge: "Hot"
    },
    {
      id: 10,
      name: "Noise Cancelling Earbuds",
      price: 199.99,
      originalPrice: 279.99,
      rating: 4.9,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      badge: "Sale"
    }
  ];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    setInterval(() => 300)
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <>
      <AcerNavbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="bg-black text-white py-2">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm">
              Free Shipping on Orders Over $100 | Use Code: FREESHIP
            </div>
          </div>
        </header>

        {/* Banner Carousel */}
        <section className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="max-w-xl ml-12 text-white">
                <h2 className="text-5xl font-bold mb-4">{banners[currentBanner].title}</h2>
                <p className="text-xl mb-6">{banners[currentBanner].subtitle}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
                  {banners[currentBanner].buttonText}
                </button>
              </div>
            </div>

            <button
              onClick={prevBanner}
              className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextBanner}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`w-3 h-3 rounded-full transition ${idx === currentBanner ? 'bg-white' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detail Info Ecommerce */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((info, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <div className="text-4xl mb-3">{info.icon}</div>
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Discover our best-selling items</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              See All
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition group">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cursor-pointer w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${product.badge === 'Hot' ? 'bg-red-500' :
                      product.badge === 'New' ? 'bg-green-500' : 'bg-orange-500'
                    }`}>
                    {product.badge}
                  </span>
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="cursor-pointer bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="cursor-pointer bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2 h-12">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  </div>
                  <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
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

        {/* Footer */}
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