// @ts-ignore

"use client";
import {
  Award,
  GPTLearningContent,
  Progress,
  ProgressType,
  UserDataContextType,
} from "@/utils/types";
// @ts-ignore
import React from "react";

//@ts-ignore
export const UserDataContext = React.createContext<UserDataContextType>({});

export const useUserContext = () => React.useContext(UserDataContext);

const calculateProgress = (progress: Progress) => {
  if (progress) {
    let totalEntries = 0;
    let completedEntries = 0;

    for (let key in progress) {
      totalEntries++;
      if (progress[key as keyof Progress].completed) {
        completedEntries++;
      }
    }
    return completedEntries;
  } else {
    return 0;
  }
};

export const UserDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = React.useState<Progress>({});
  const [totalChallenges, setTotalChallenges] = React.useState<number>(0);
  const [overallProgress, setOverallProgress] = React.useState<number>(0);
  const [awards, setAwards] = React.useState<Award[]>([]);
  const [showNewAward, setShowNewAward] = React.useState<boolean>(false);
  const [points, setPoints] = React.useState<number>(0);
  const [currentModule, setCurrentModule] = React.useState<string>();

  const [gptLearningContent, setGptLearningContent] = React.useState<GPTLearningContent>({});

  const updateProgress = (currentModule: string, field: keyof ProgressType) => {
    const previousFieldData: ProgressType = progress[currentModule as keyof typeof progress];
    if (field === "awarded") {
      previousFieldData[field] = previousFieldData[field] + 1;
      setTotalChallenges(totalChallenges + 1);
    } else if (field === "completed") {
      previousFieldData[field] = true;
    }

    setProgress((prevState) => ({ ...prevState, [currentModule]: previousFieldData }));
    const overallProgressCalculated = calculateProgress(progress);
    setOverallProgress(overallProgressCalculated);
  };

  const resetProgress = (module: string) => {
    const initialProgressData: ProgressType = {
      awarded: 0,
      completed: false,
    };

    setProgress((prevState) => ({ ...prevState, [module]: initialProgressData }));
    const overallProgressCalculated = calculateProgress(progress);
    setOverallProgress(overallProgressCalculated);
  };

  const updateNewAwardSwal = (state: boolean) => {
    setShowNewAward(state);
  };

  const updateGPTLearningContent = (learningContent: GPTLearningContent) => {
    setGptLearningContent(learningContent);
  };

  const updateAward = (award: Award) => {
    setAwards([...awards, award]);
  };

  const removeAward = (award: Award) => {
    const newAwards = awards.filter((givenAward) => givenAward !== award);
    setAwards(newAwards);
  };

  const updatePoints = (pointsToAdd: number) => {
    setPoints(points + pointsToAdd);
  };

  const updateCurrentModule = (currentModule: string) => {
    setCurrentModule(currentModule);
  };

  const setInitialUserInformation = (userInfo: any) => {
    const setProgressData: Progress = {
      functions: userInfo.functions,
      variables: userInfo.variables,
      arrays: userInfo.arrays,
      objects: userInfo.objects,
    };
    setCurrentModule(userInfo.currentModule);
    setAwards(userInfo.awards);
    setProgress(setProgressData);
    const overallProgressCalculated = calculateProgress(setProgressData);
    setOverallProgress(overallProgressCalculated);
    setPoints(userInfo.points);
    setTotalChallenges(userInfo.totalChallenges);
  };

  const resetUserContext = () => {
    setProgress({});
    setAwards([]);
    setPoints(0);
    setCurrentModule(undefined);
    setOverallProgress(0);
  };

  //@ts-ignore
  return (
    <UserDataContext.Provider
      value={{
        awards,
        showNewAward,
        //@ts-ignore
        progress,
        //@ts-ignore
        currentModule,
        points,
        totalChallenges,
        overallProgress,
        gptLearningContent,
        updatePoints,
        //@ts-ignore
        updateProgress,
        updateCurrentModule,
        updateNewAwardSwal,
        updateAward,
        setInitialUserInformation,
        resetUserContext,
        updateGPTLearningContent,
        resetProgress,
        removeAward,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
