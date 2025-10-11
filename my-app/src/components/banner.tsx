'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Banner {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  buttonText: string;
}

export default function Banner() {
    const [currentBanner, setCurrentBanner] = useState<number>(0)
    const banners: Banner[] = [
    {
      id: "68e61cc99dc62a8115b11ae5",
      name: "Acer Predator Helios 16",
      subtitle: "Big Sale Up to 50% Off",
      image: "https://dbklik.co.id/public/uploads/all/I3dsRwXHurmsjCG8AUc1o7r8l5xi0RX9Y65Gbd7i.jpg",
      buttonText: "Shop Now"
    },
    {
      id: "68e61cc99dc62a8115b11afc",
      name: "Acer Nitro 5",
      subtitle: "Exclusive Products Just for You",
      image: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/csm_4_zu_3_nitro5_4157e3db7b.jpg",
      buttonText: "Discover More"
    },
    {
      id: "68e61cc99dc62a8115b11b06",
      name: "Acer Predator Triton 500",
      subtitle: "Limited Time Offer - Don't Miss Out!",
      image: "https://gizmologi.id/wp-content/uploads/2020/07/harga-acer-predator-triton-500.jpeg",
      buttonText: "Get Deals"
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
         <section className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={banners[currentBanner].image}
              alt={banners[currentBanner].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="max-w-xl ml-12 text-white">
                <h2 className="text-5xl font-bold mb-4">{banners[currentBanner].name}</h2>
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
    )
}