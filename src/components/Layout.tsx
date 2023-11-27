"use client";

import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user == null) console.log("test");
  }, [user]);
  return user ? (
    <div className="flex">
      <SideBar />
      <div className="flex text-white w-full flex-col h-screen px-2 bg-black">{children}</div>
    </div>
  ) : (
    <div className="mb-10">
      <h1> I am not a logged in user </h1>
      {children}
    </div>
  );
}
