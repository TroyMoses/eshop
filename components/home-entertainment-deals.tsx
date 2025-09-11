"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bannerDeals = [
  {
    id: 1,
    title: "Cinema at home",
    subtitle: "Television deals",
    image: "/placeholder.svg?height=200&width=300",
    bgColor: "bg-gradient-to-r from-red-600 to-orange-600",
  },
  {
    id: 2,
    title: "Sound Bars",
    subtitle: "Party bat home",
    image: "/placeholder.svg?height=200&width=300",
    bgColor: "bg-gradient-to-r from-purple-600 to-blue-600",
  },
  {
    id: 3,
    title: "Home theaters",
    subtitle: "Sound setup",
    image: "/placeholder.svg?height=200&width=300",
    bgColor: "bg-gradient-to-r from-gray-700 to-gray-900",
  },
];

const entertainmentDeals = [
  {
    id: 1,
    name: "Tecno Spark 8C, 4GB ...",
    originalPrice: "650,000 UGX",
    salePrice: "471,700 UGX",
    image: "/tecno-spark-phone.jpg",
    badge: null,
  },
  {
    id: 2,
    name: "Smart Watch BT For IOS...",
    originalPrice: "95,000 UGX",
    salePrice: "80,500 UGX",
    image: "/smartwatch-black.jpg",
    badge: null,
  },
  {
    id: 3,
    name: "Hisens TV,Smart HDMI...",
    originalPrice: "650,000 UGX",
    salePrice: "571,700 UGX",
    image: "/smart-tv.jpg",
    badge: "1 Year W",
  },
  {
    id: 4,
    name: "Electro Master Kettle 2L...",
    originalPrice: "80,000 UGX",
    salePrice: "72,700 UGX",
    image: "/electric-kettle.jpg",
    badge: null,
  },
  {
    id: 5,
    name: "Micro SD card Memory c...",
    originalPrice: "60,000 UGX",
    salePrice: "25,700 UGX",
    image: "/memory-card.jpg",
    badge: "HIFINIT",
  },
  {
    id: 6,
    name: "DJack Speaker 3.0CH...",
    originalPrice: "450,000 UGX",
    salePrice: "165,200 UGX",
    image: "/speaker-system.jpg",
    badge: null,
  },
];

export function HomeEntertainmentDeals() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            HOME ENTERTAINMENT DEALS Up to 30% off
          </h2>
        </div>

        {/* Banner Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {bannerDeals.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-lg p-6 text-white relative overflow-hidden cursor-pointer hover:scale-105 transition-transform min-h-[120px]`}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-30">
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Entertainment Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {entertainmentDeals.map((product) => (
            <Card
              key={product.id}
              className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-3">
                <div className="relative">
                  <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.badge && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-black text-xs">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-primary">
                    {product.salePrice}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
