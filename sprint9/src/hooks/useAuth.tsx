"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export function useAuth() {
  const context = useContext(AuthContext);
  const router = useRouter();
  const pathName = usePathname();

  if (!context) {
    console.error("콘텍스트 에러");
    throw new Error("Error: not used within AuthProvider");
  }

  const { user, isLoading } = context;

  useEffect(() => {
    if (user && pathName === "/login") {
      router.push("/items");
    }
    if (user && pathName === "/sign-up") {
      router.push("/login");
    }
  }, [user, pathName, router]);

  return context;
}
