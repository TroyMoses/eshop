"use client";

const brands = [
  {
    id: 1,
    name: "Nokia",
    logo: "/nokia-logo.jpg",
    bgColor: "bg-gray-800",
  },
  {
    id: 2,
    name: "Hisense",
    logo: "/hisense-logo.jpg",
    bgColor: "bg-gray-700",
  },
  {
    id: 3,
    name: "Vision",
    logo: "/vision-logo.jpg",
    bgColor: "bg-red-600",
  },
  {
    id: 4,
    name: "Realme",
    logo: "/placeholder.svg?height=80&width=80",
    bgColor: "bg-black",
  },
  {
    id: 5,
    name: "Ulefone",
    logo: "/placeholder.svg?height=80&width=80",
    bgColor: "bg-gray-900",
  },
  {
    id: 6,
    name: "Samsung",
    logo: "/placeholder.svg?height=80&width=80",
    bgColor: "bg-blue-600",
  },
  {
    id: 7,
    name: "Brand 7",
    logo: "/placeholder.svg?height=80&width=80",
    bgColor: "bg-red-500",
  },
  {
    id: 8,
    name: "Brand 8",
    logo: "/placeholder.svg?height=80&width=80",
    bgColor: "bg-red-600",
  },
];

export function TopBrands() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            TOP BRANDS
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl">
            {brands.map((brand) => (
              <div key={brand.id} className="group cursor-pointer">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${brand.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <img
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
