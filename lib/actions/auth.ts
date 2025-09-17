"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  loginUser,
  registerUser,
  verifyToken,
  getUserById,
  type LoginCredentials,
  type RegisterCredentials,
} from "@/lib/auth";

export async function loginAction(credentials: LoginCredentials) {
  try {
    const user = await loginUser(credentials);

    if (!user) {
      return { error: "Invalid email or password" };
    }

    // Set HTTP-only cookie with token
    (
      await // Set HTTP-only cookie with token
      cookies()
    ).set("auth-token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return {
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch {
    return { error: "Login failed" };
  }
}

export async function registerAction(credentials: RegisterCredentials) {
  try {
    const user = await registerUser(credentials);

    if (!user) {
      return { error: "Registration failed" };
    }

    // Set HTTP-only cookie with token
    (
      await // Set HTTP-only cookie with token
      cookies()
    ).set("auth-token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return {
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "Registration failed" };
    }
  }
}

export async function logoutAction() {
  (await cookies()).delete("auth-token");
  redirect("/");
}

export async function getCurrentUser() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    (await cookies()).delete("auth-token");
    return null;
  }

  const user = await getUserById(payload.userId);
  return user;
}
