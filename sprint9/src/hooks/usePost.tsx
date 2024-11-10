"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export function usePost() {
  const context = useContext(AuthContext);
  const router = useRouter();
  const pathName = usePathname();

  if (!context) {
    console.error("콘텍스트 에러");
    throw new Error("Error: not used within AuthProvider");
  }

  const { user, signUp, login } = context;

  useEffect(() => {
    if (login.isSuccess && pathName === "/login") {
      router.push("/items");
    }
    if (signUp.isSuccess && pathName === "/sign-up") {
      router.push("/login");
    }
  }, [user, pathName, router, signUp.isSuccess, login.isSuccess]);

  return context;
}
