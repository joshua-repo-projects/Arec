'use client'

interface Card {
  icon: string,
  title: string,
  description: string
}

export default function DetailEcommerce() {
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

    return (
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
    )
}