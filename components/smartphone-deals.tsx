"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bannerDeals = [
  {
    id: 1,
    title: "Crazy phone Deals",
    image: "/person-using-smartphone.jpg",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-400",
  },
  {
    id: 2,
    title: "SAMSUNG PHONE DEALS",
    image: "/samsung-phone-stand.jpg",
    bgColor: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    id: 3,
    title: "CAMON 19",
    image: "/tecno-camon-phones.jpg",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-700",
  },
];

const phoneDeals = [
  {
    id: 1,
    name: "Tecno Spark 8C, 4GB ...",
    originalPrice: "650,000 UGX",
    salePrice: "471,700 UGX",
    image: "/tecno-spark-phone.jpg",
    isRefurbished: false,
  },
  {
    id: 2,
    name: "Smart Watch BT For IOS...",
    originalPrice: "95,000 UGX",
    salePrice: "80,500 UGX",
    image: "/smartwatch-black.jpg",
    isRefurbished: false,
  },
  {
    id: 3,
    name: "Hisens TV,Smart HDMI...",
    originalPrice: "650,000 UGX",
    salePrice: "571,700 UGX",
    image: "/red-smartphone.jpg",
    isRefurbished: true,
  },
  {
    id: 4,
    name: "Electro Master Kettle 2L...",
    originalPrice: "80,000 UGX",
    salePrice: "72,700 UGX",
    image: "/iphone-gold.jpg",
    isRefurbished: true,
  },
  {
    id: 5,
    name: "Micro SD card Memory c...",
    originalPrice: "60,000 UGX",
    salePrice: "25,700 UGX",
    image: "/purple-smartphone.jpg",
    isRefurbished: false,
  },
  {
    id: 6,
    name: "DJack Speaker 3.0CH...",
    originalPrice: "450,000 UGX",
    salePrice: "165,200 UGX",
    image: "/blue-smartphone.jpg",
    isRefurbished: false,
  },
];

export function SmartphoneDeals() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            SMARTPHONE DEALS Up to 30% off
          </h2>
        </div>

        {/* Banner Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {bannerDeals.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-lg p-6 text-white relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            >
              <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
              <div className="absolute right-0 bottom-0 opacity-20">
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-32 h-32 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Phone Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {phoneDeals.map((phone) => (
            <Card
              key={phone.id}
              className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-3">
                <div className="relative">
                  <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={phone.image || "/placeholder.svg"}
                      alt={phone.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {phone.isRefurbished && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                      REFURBISHED
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-2 line-clamp-2">
                  {phone.name}
                </h3>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-primary">
                    {phone.salePrice}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {phone.originalPrice}
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
