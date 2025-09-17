"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/dummy-data";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { logoutAction } from "@/lib/actions/auth";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, setUser } = useAuth();
  const { getTotalItems, setIsOpen } = useCart();

  const handleLogout = async () => {
    await logoutAction();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <p className="text-balance">
              Free shipping on orders over Ugx 20,000 | New Year Sale - Up to
              50% off!
            </p>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contact" className="hover:underline cursor-pointer">
                Contact
              </Link>
              <Link href="/help" className="hover:underline cursor-pointer">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Gadget Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors cursor-pointer">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 space-y-2">
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/deals"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Deals
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 cursor-pointer"
                onClick={() => setIsSearchOpen(true)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex cursor-pointer"
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex cursor-pointer"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex cursor-pointer"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="cursor-pointer">
                      Register
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden cursor-pointer"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through our store
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {user ? (
                    <div className="border-b pb-4">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="mt-2 cursor-pointer bg-transparent"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="border-b pb-4 space-y-2">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full cursor-pointer bg-transparent"
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild className="w-full cursor-pointer">
                        <Link href="/register">Register</Link>
                      </Button>
                    </div>
                  )}

                  <Link
                    href="/"
                    className="block py-2 text-lg font-medium cursor-pointer"
                  >
                    Home
                  </Link>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Categories</p>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center space-x-3 py-2 pl-4 cursor-pointer"
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/deals"
                    className="block py-2 text-lg font-medium cursor-pointer"
                  >
                    Deals
                  </Link>
                  <Link
                    href="/about"
                    className="block py-2 text-lg font-medium cursor-pointer"
                  >
                    About
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
          <div className="bg-background w-full max-w-2xl mx-4 rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 pr-4"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm">
                Start typing to search products...
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
