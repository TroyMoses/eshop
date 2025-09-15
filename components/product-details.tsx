"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/lib/types";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4" data-aos="fade-right">
        <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.originalPrice && (
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 cursor-pointer ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6" data-aos="fade-left">
        <div>
          <Badge variant="outline" className="mb-2">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold mb-2 text-balance">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-pretty">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-primary">
            UGX {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              Ugx{product.originalPrice}
            </span>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-sm">
              Save {discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              product.stock > 10
                ? "default"
                : product.stock > 0
                ? "secondary"
                : "destructive"
            }
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </Badge>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-sm text-destructive">
              Only {product.stock} left!
            </span>
          )}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity:
            </label>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="cursor-pointer"
              >
                -
              </Button>
              <span className="px-4 py-2 text-sm">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                disabled={quantity >= product.stock}
                className="cursor-pointer"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              size="lg"
              className="flex-1 cursor-pointer"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer bg-transparent"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer bg-transparent"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">
                On orders over Ugx 200,000
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Warranty</p>
              <p className="text-xs text-muted-foreground">1 year coverage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30-day policy</p>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications" className="cursor-pointer">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="shipping" className="cursor-pointer">
              Shipping
            </TabsTrigger>
            <TabsTrigger value="returns" className="cursor-pointer">
              Returns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                {product.specifications ? (
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No specifications available.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">Shipping Information</p>
                <p className="text-sm text-muted-foreground">
                  • Free standard shipping on orders over Ugx 200,000
                </p>
                <p className="text-sm text-muted-foreground">
                  • Express shipping available for Ugx 20,000
                </p>
                <p className="text-sm text-muted-foreground">
                  • Standard delivery: 1-2 business days
                </p>
                <p className="text-sm text-muted-foreground">
                  • Express delivery: 1 business day or hours
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="returns" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">Return Policy</p>
                <p className="text-sm text-muted-foreground">
                  • 30-day return window
                </p>
                <p className="text-sm text-muted-foreground">
                  • Items must be in original condition
                </p>
                <p className="text-sm text-muted-foreground">
                  • Free return shipping on defective items
                </p>
                <p className="text-sm text-muted-foreground">
                  • Refunds processed within 5-7 business days
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
