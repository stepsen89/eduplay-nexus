"use client";

import Awards from "@/components/Awards/Awards";
import CourseCard from "@/components/Card";
import LoadingScreen from "@/components/LoadingScreen";
import Topics from "@/components/Topics/Topics";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserDataContext";
import { getUserProgressInformation } from "@/firebase/getData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuthContext();
  const { setInitialUserInformation, awards, progress } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else if (user) {
      getUserProgressInformation(user.uid).then((result) => {
        setInitialUserInformation(result.result);
      });
    }
  }, [user, router]);

  const calculateProgress = () => {
    if (progress) {
      let totalEntries = 0;
      let completedEntries = 0;

      for (let key in progress) {
        totalEntries++;
        if (progress[key].completed) {
          completedEntries++;
        }
      }

      let overallProgress = (completedEntries / totalEntries) * 100;

      return overallProgress;
    } else {
      return 0;
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {user ? (
        <div className="w-full pt-6 px-12">
          <h2 className="text-xl font-bold"> Current Course: </h2>
          <CourseCard
            title="JavaScript"
            description="Master JavaScript - from beginner to advanced."
            overallProgress={calculateProgress()}
          ></CourseCard>
          <Topics progress={progress} userId={user.uid} />
          <Awards awards={awards} />
        </div>
      ) : (
        <p> No user </p>
      )}
    </div>
  );
}
