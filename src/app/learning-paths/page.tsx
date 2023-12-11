"use client";

import Awards from "@/components/Awards/Awards";
import CourseCard from "@/components/Card";
import LearningPath from "@/components/LearningPath";
import LoadingScreen from "@/components/LoadingScreen";
import Topics from "@/components/Topics/Topics";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserDataContext";
import { getUserGptLearningPath } from "@/firebase/getData";
import {
  resetModuleInFirestore,
  updateQuestions,
  updateSingleFieldForUser,
} from "@/firebase/updateFields";
import { Award, GPTLearningContent, GPTSingleLearningContent, Module } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, loading } = useAuthContext();
  const [showResetWarning, setShowResetWarning] = useState<boolean>(false);
  const [moduleToReset, setModuleToReset] = useState<string>("");
  const [generatedPaths, setGeneratedPaths] = useState<
    | {
        name: string;
        value: GPTSingleLearningContent[];
      }[]
    | null
  >(null);
  const { resetProgress, removeAward, progress, awards } = useUserContext();
  function setGeneratedPathsAndName(path: GPTLearningContent): { name: string; value: any[] }[] {
    return Object.entries(path).map(([key, value]) => ({ name: key, value }));
  }

  const showResetPopUp = (module: string) => {
    setShowResetWarning(true);
    setModuleToReset(module);
  };

  const handleReset = () => {
    setShowResetWarning(false);
    resetModuleInFirestore(user.uid, moduleToReset);
    resetProgress(moduleToReset);
    removeAward(moduleToReset as Award);
    const updatedAwards = awards.filter((givenAward) => givenAward !== moduleToReset);

    updateSingleFieldForUser(user.uid, {
      [moduleToReset]: { awarded: 0, completed: false },
      awards: updatedAwards,
    }).then(() => fetchGptLearningContentForPathView());
  };

  const fetchGptLearningContentForPathView = () => {
    getUserGptLearningPath(user.uid).then((result) => {
      console.log(result);
      const paths = result.result as GPTLearningContent;
      const gptPaths = setGeneratedPathsAndName(paths);
      setGeneratedPaths(gptPaths);
    });
  };

  useEffect(() => {
    if (user) {
      fetchGptLearningContentForPathView();
    }
  }, [user, loading, progress]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="">
      <div className="w-full px-12 pt-2">
        <div className="">
          <div>
            <h1 className="text-3xl font-bold leading-snug"> Your personalised learning paths: </h1>
          </div>
          {generatedPaths &&
            generatedPaths.map((path) => (
              <LearningPath key={path.name} generatedPath={path} resetMyPath={showResetPopUp} />
            ))}
        </div>
      </div>
      {showResetWarning && (
        <div className="absolute top-1/3 left-1/3 w-650">
          <div className=" bg-slate-300 rounded-lg shadow drop-shadow-2xl h-auto">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => setShowResetWarning(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-8 flex">
              <div className="flex flex-col justify-center pl-2">
                <h3 className="pb-2 text-xl font-bold text-black ">
                  You are about to reset your generated path
                </h3>
                <p className="text-md pb-2 pt-4">
                  Be careful, this will remove all learnings in this module and you will need to
                  re-do the module. This could lead to a completely new set of questions.{" "}
                </p>
                <button
                  type="button"
                  className="text-white self-end bg-purple-600 focus:ring-4  rounded-lg  items-center py-3 px-4 text-center tracking-widest"
                  onClick={handleReset}
                >
                  Got it! Reset now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
