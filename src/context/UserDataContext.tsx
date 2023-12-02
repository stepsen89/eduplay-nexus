// @ts-ignore

"use client";
import { Award, ProgressType, UserDataContextType } from "@/utils/types";
// @ts-ignore
import React from "react";

//@ts-ignore
export const UserDataContext = React.createContext<UserDataContextType>({});

export const useUserContext = () => React.useContext(UserDataContext);

export const UserDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = React.useState({});
  const [totalChallenges, setTotalChallenges] = React.useState<number>(0);
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
    const setProgressData = {
      functions: userInfo.functions,
      variables: userInfo.variables,
      arrays: userInfo.arrays,
      objects: userInfo.objects,
    };
    setCurrentTopic(userInfo.currentTopic);
    setAwards(userInfo.awards);
    setProgress(setProgressData);
    setPoints(userInfo.points);
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
        updatePoints,
        //@ts-ignore
        updateProgress,
        updateCurrentTopic,
        updateNewAwardSwal,
        updateAward,
        setInitialUserInformation,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
