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

    let overallProgress = (completedEntries / totalEntries) * 100;

    return overallProgress;
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

  const updateProgress = (currentTopic: string, field: keyof ProgressType) => {
    const previousFieldData: ProgressType = progress[currentTopic as keyof typeof progress];
    if (field === "awarded" || field === "lastSeen") {
      previousFieldData[field] = previousFieldData[field] + 1;
      setTotalChallenges(totalChallenges + 1);
    } else if (field === "completed") {
      previousFieldData[field] = true;
    }
    setProgress((prevState) => ({ ...prevState, previousFieldData }));
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

  const updatePoints = (pointsToAdd: number) => {
    setPoints(points + pointsToAdd);
  };

  const updateCurrentModule = (currentTopic: string) => {
    setCurrentModule(currentTopic);
  };

  const setInitialUserInformation = (userInfo: any) => {
    const setProgressData: Progress = {
      functions: userInfo.functions,
      variables: userInfo.variables,
      arrays: userInfo.arrays,
      objects: userInfo.objects,
    };
    setCurrentModule(userInfo.currentTopic);
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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
