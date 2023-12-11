"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserDataContext";
import { capitalizeFirstLetter } from "@/utils/helpers";

import { explanations } from "@/utils/explanations/explanations";
import InformationContentSection from "@/components/InformationContentSection";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";

export default function IntroductionPage() {
  const { user, loading } = useAuthContext();
  const { currentModule } = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  // eslint-disable-next-line @next/next/no-assign-module-variable
  const module = searchParams?.get("module");

  useEffect(() => {
    if (user == null && !loading) router.push("/");
  }, [user, router]);

  if (!currentModule) {
    <LoadingScreen />;
  }
  return (
    <div className="flex flex-col pl-12 pr-12 w-3/5 3xl:w-3/6">
      <div className="flex w-full justify-between items-start mb-8">
        <h1 className=" font-bold text-3xl leading-snug">
          Quick Recap: JavaScript {capitalizeFirstLetter(currentModule)}
        </h1>
        <Link className={`text-white py-2 px-8 border rounded-lg bg-purple-600`} href="/learning">
          Skip, I&lsquo;m ready to learn!
        </Link>
      </div>
      <p> {explanations[currentModule]?.overallExplanation}</p>
      {explanations[currentModule]?.content.map((section, index) => (
        <InformationContentSection key={index} section={section} />
      ))}
      <div className="flex justify-end h-36 items-center">
        <Link className={`text-white py-2 px-8 border rounded-lg bg-purple-500`} href="/learning">
          Got it! I&lsquo;m ready to learn
        </Link>
      </div>
    </div>
  );
}
