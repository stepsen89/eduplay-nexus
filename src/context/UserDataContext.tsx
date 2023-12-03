// @ts-ignore

"use client";
import { Award, Progress, ProgressType, UserDataContextType } from "@/utils/types";
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

    console.log(progress);
    let overallProgress = (completedEntries / totalEntries) * 100;

    console.log(overallProgress);

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
  const [currentTopic, setCurrentTopic] = React.useState<string>();

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

  const updateAward = (award: Award) => {
    setAwards([...awards, award]);
  };

  const updatePoints = (pointsToAdd: number) => {
    setPoints(points + pointsToAdd);
  };

  const updateCurrentTopic = (currentTopic: string) => {
    setCurrentTopic(currentTopic);
  };

  const setInitialUserInformation = (userInfo: any) => {
    const setProgressData: Progress = {
      functions: userInfo.functions,
      variables: userInfo.variables,
      arrays: userInfo.arrays,
      objects: userInfo.objects,
    };
    setCurrentTopic(userInfo.currentTopic);
    setAwards(userInfo.awards);
    setProgress(setProgressData);
    const overallProgressCalculated = calculateProgress(setProgressData);
    setOverallProgress(overallProgressCalculated);
    setPoints(userInfo.points);
  };

  const resetUserContext = () => {
    setProgress({});
    setAwards([]);
    setPoints(0);
    setCurrentTopic(undefined);
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
        currentTopic,
        points,
        totalChallenges,
        overallProgress,
        updatePoints,
        //@ts-ignore
        updateProgress,
        updateCurrentTopic,
        updateNewAwardSwal,
        updateAward,
        setInitialUserInformation,
        resetUserContext,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
