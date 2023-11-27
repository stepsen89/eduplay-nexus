"use client";

import React, { useEffect } from "react";

import LearningCard from "@/components/LearningCard";
import { questions } from "@/utils/questions";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function LearningPage() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 border">
      <LearningCard question={questions.functions} />
    </main>
  );
}
