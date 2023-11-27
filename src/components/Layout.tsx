"use client";

import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  console.log("user should be here", user);

  return user ? (
    <div className="flex">
      <SideBar />
      <div className="flex text-white w-full flex-col h-screen px-2">{children}</div>
    </div>
  ) : (
    <>{children}</>
  );
}
