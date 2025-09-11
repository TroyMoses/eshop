"use server";

import { revalidatePath } from "next/cache";

// Base API URL - replace with your FastAPI backend URL
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000/api";

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Product Management Actions
export async function createProduct(formData: FormData) {
  const productData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number.parseFloat(formData.get("price") as string),
    category: formData.get("category"),
    brand: formData.get("brand"),
    stock: Number.parseInt(formData.get("stock") as string),
    featured: formData.get("featured") === "on",
  };

  try {
    await apiCall("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
    revalidatePath("/admin/products");
    return { success: true, message: "Product created successfully" };
  } catch {
    return { success: false, message: "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const productData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number.parseFloat(formData.get("price") as string),
    category: formData.get("category"),
    brand: formData.get("brand"),
    stock: Number.parseInt(formData.get("stock") as string),
    featured: formData.get("featured") === "on",
  };

  try {
    await apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
    revalidatePath("/admin/products");
    return { success: true, message: "Product updated successfully" };
  } catch {
    return { success: false, message: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await apiCall(`/products/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted successfully" };
  } catch {
    return { success: false, message: "Failed to delete product" };
  }
}

// Banner Management Actions
export async function createBanner(formData: FormData) {
  const bannerData = {
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    image: formData.get("image"),
    link: formData.get("link"),
    buttonText: formData.get("buttonText"),
    active: formData.get("active") === "on",
    order: Number.parseInt(formData.get("order") as string),
  };

  try {
    await apiCall("/banners", {
      method: "POST",
      body: JSON.stringify(bannerData),
    });
    revalidatePath("/admin/banners");
    return { success: true, message: "Banner created successfully" };
  } catch {
    return { success: false, message: "Failed to create banner" };
  }
}

export async function updateBanner(id: string, formData: FormData) {
  const bannerData = {
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    image: formData.get("image"),
    link: formData.get("link"),
    buttonText: formData.get("buttonText"),
    active: formData.get("active") === "on",
    order: Number.parseInt(formData.get("order") as string),
  };

  try {
    await apiCall(`/banners/${id}`, {
      method: "PUT",
      body: JSON.stringify(bannerData),
    });
    revalidatePath("/admin/banners");
    return { success: true, message: "Banner updated successfully" };
  } catch {
    return { success: false, message: "Failed to update banner" };
  }
}

// Contact Form Action
export async function submitContactForm(formData: FormData) {
  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  try {
    await apiCall("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    });
    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    };
  }
}

// Newsletter Subscription Action
export async function subscribeNewsletter(formData: FormData) {
  const subscriptionData = {
    email: formData.get("email"),
    name: formData.get("name"),
  };

  try {
    await apiCall("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(subscriptionData),
    });
    return { success: true, message: "Successfully subscribed to newsletter!" };
  } catch {
    return {
      success: false,
      message: "Failed to subscribe. Please try again.",
    };
  }
}

// Review Submission Action
export async function submitReview(formData: FormData) {
  const reviewData = {
    productId: formData.get("productId"),
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    rating: Number.parseInt(formData.get("rating") as string),
    title: formData.get("title"),
    comment: formData.get("comment"),
  };

  try {
    await apiCall("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
    revalidatePath(`/products/${reviewData.productId}`);
    return { success: true, message: "Review submitted successfully!" };
  } catch {
    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    };
  }
}

// Promotion Management Actions
export async function createPromotion(formData: FormData) {
  const promotionData = {
    title: formData.get("title"),
    description: formData.get("description"),
    discountType: formData.get("discountType"),
    discountValue: Number.parseFloat(formData.get("discountValue") as string),
    code: formData.get("code"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    active: formData.get("active") === "on",
  };

  try {
    await apiCall("/promotions", {
      method: "POST",
      body: JSON.stringify(promotionData),
    });
    revalidatePath("/admin/promotions");
    return { success: true, message: "Promotion created successfully" };
  } catch {
    return { success: false, message: "Failed to create promotion" };
  }
}

// Testimonial Management Actions
export async function createTestimonial(formData: FormData) {
  const testimonialData = {
    customerName: formData.get("customerName"),
    customerImage: formData.get("customerImage"),
    rating: Number.parseInt(formData.get("rating") as string),
    comment: formData.get("comment"),
    location: formData.get("location"),
    featured: formData.get("featured") === "on",
  };

  try {
    await apiCall("/testimonials", {
      method: "POST",
      body: JSON.stringify(testimonialData),
    });
    revalidatePath("/admin/testimonials");
    return { success: true, message: "Testimonial created successfully" };
  } catch {
    return { success: false, message: "Failed to create testimonial" };
  }
}
