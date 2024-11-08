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

  const { user, isLoading, signUp } = context;

  console.log("signUp:", signUp);

  useEffect(() => {
    if (user && pathName === "/login") {
      router.push("/items");
    }
    if (signUp.isSuccess && pathName === "/sign-up") {
      router.push("/login");
    }
  }, [user, pathName, router, signUp.isSuccess]);

  return context;
}
