"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import NavProgressBar from "./NavProgressBar";
import { useUserContext } from "@/context/UserDataContext";
import { getUserProgressInformation } from "@/firebase/getData";
import LoadingScreen from "./LoadingScreen";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const [loadingInitialUserInformation, setLoadingInitialUserInformation] =
    React.useState<boolean>(false);
  const router = useRouter();
  const { points, setInitialUserInformation } = useUserContext();

  useEffect(() => {
    if (user === null && !loading) {
      router.push("/");
    } else if (user) {
      setLoadingInitialUserInformation(true);
      getUserProgressInformation(user.uid).then((result) => {
        setInitialUserInformation(result.result);
        setLoadingInitialUserInformation(false);
      });
    }
  }, [loading, user]);

  if (loading || loadingInitialUserInformation) {
    return (
      <div className="flex flex-col w-full h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return user ? (
    <main className="h-screen flex">
      <SideBar />
      <div className="w-full overflow-auto 3xl:pl-24">
        <NavProgressBar points={points} />
        {children}
      </div>
    </main>
  ) : (
    <>{children}</>
  );
}
