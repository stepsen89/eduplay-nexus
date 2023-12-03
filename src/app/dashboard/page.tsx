"use client";

import Awards from "@/components/Awards/Awards";
import CourseCard from "@/components/Card";
import CompetitionCard from "@/components/Competition";
import LoadingScreen from "@/components/LoadingScreen";
import Topics from "@/components/Topics/Topics";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserDataContext";
import { getUserProgressInformation } from "@/firebase/getData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuthContext();
  const { setInitialUserInformation, awards, progress, overallProgress, points } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUserProgressInformation(user.uid).then((result) => {
        setInitialUserInformation(result.result);
      });
    }
  }, [user, loading]);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {user ? (
        <div className="w-full pt-6 px-12">
          <div className="flex justify-between pr-12">
            <div>
              <h2 className="text-xl font-bold"> Current Course: </h2>
              <CourseCard
                title="JavaScript"
                description="Master JavaScript - from beginner to advanced."
                overallProgress={overallProgress}
              ></CourseCard>
            </div>
            <div>
              <h2 className="text-lg font-bold"> Leaderboard: </h2>

              <CompetitionCard points={points} />
            </div>
          </div>
          {progress && <Topics progress={progress} userId={user.uid} />}
          <Awards awards={awards} />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
