"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const deals = [
  {
    id: 1,
    name: "Tecno Spark 8C, 4GB ...",
    originalPrice: "650,000 UGX",
    salePrice: "471,700 UGX",
    image: "/modern-smartphone.png",
  },
  {
    id: 2,
    name: "Smart Watch BT For IOS...",
    originalPrice: "95,000 UGX",
    salePrice: "80,500 UGX",
    image: "/modern-smartwatch.png",
  },
  {
    id: 3,
    name: "Hisens TV,Smart HDMI...",
    originalPrice: "650,000 UGX",
    salePrice: "571,700 UGX",
    image: "/smart-tv.jpg",
  },
  {
    id: 4,
    name: "Electro Master Kettle 2L...",
    originalPrice: "80,000 UGX",
    salePrice: "72,700 UGX",
    image: "/electric-kettle.jpg",
  },
  {
    id: 5,
    name: "Micro SD card Memory c...",
    originalPrice: "60,000 UGX",
    salePrice: "25,700 UGX",
    image: "/memory-card.jpg",
  },
  {
    id: 6,
    name: "DJack Speaker 3.0CH...",
    originalPrice: "450,000 UGX",
    salePrice: "165,200 UGX",
    image: "/speaker-system.jpg",
  },
];

export function HalfPriceDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-red-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-white">
            <span className="font-bold">SIMBULA</span> with a gadget today
          </div>
          <div className="text-white">
            <span className="font-bold">HALF PRICE DEALS:</span> Ends in:{" "}
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}hrs
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-3">
                <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium mb-2 line-clamp-2">
                  {deal.name}
                </h3>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-primary">
                    {deal.salePrice}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {deal.originalPrice}
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
