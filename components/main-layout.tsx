"use client";

import type React from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoriesSidebar } from "@/components/categories-sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {showSidebar && (
          <div className="hidden lg:block fixed left-0 top-[120px] bottom-0 z-40">
            <CategoriesSidebar />
          </div>
        )}
        <main
          className={`flex-1 ${
            showSidebar ? "lg:ml-64" : ""
          } min-h-[calc(100vh-120px)]`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
