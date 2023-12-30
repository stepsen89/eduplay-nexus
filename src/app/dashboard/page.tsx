"use client";

import Awards from "@/components/Awards";
import CourseCard from "@/components/Card";
import LoadingScreen from "@/components/LoadingScreen";
import Modules from "@/components/Modules";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserDataContext";
import { getUserGptLearningPath, getUserProgressInformation } from "@/firebase/getData";
import { GPTLearningContent } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuthContext();
  const {
    setInitialUserInformation,
    awards,
    progress,
    overallProgress,
    gptLearningContent,
    updateGPTLearningContent,
  } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUserProgressInformation(user.uid).then((result) => {
        setInitialUserInformation(result.result);
        getUserGptLearningPath(user.uid).then((result) => {
          const overallContent = result.result as GPTLearningContent;
          updateGPTLearningContent(overallContent);
        });
      });
    }
  }, [user, loading]);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {user ? (
        <div className="w-full px-12">
          <h1 className="pb-6 text-3xl font-bold"> Dashboard </h1>
          <div className="flex justify-between pr-12">
            <div>
              <h2 className="text-xl font-bold"> Current Course: </h2>
              <CourseCard
                title="JavaScript"
                description="Master JavaScript - from beginner to advanced."
                overallProgress={overallProgress}
              ></CourseCard>
            </div>
          </div>
          {progress && (
            <div className="h-auto flex flex-col items-start">
              <Modules
                progress={progress}
                userId={user.uid}
                gptLearningContent={gptLearningContent}
              />
              <Link
                className={`text-white py-2 px-8 border rounded-lg bg-purple-600 mt-6`}
                href="/learning-paths"
              >
                See my learning paths
              </Link>
            </div>
          )}

          <Awards awards={awards} />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
