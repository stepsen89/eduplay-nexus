export type Award =
  | "basic"
  | "functions"
  | "variables"
  | "arrays"
  | "objects"
  | "fiveCompleted"
  | "firstCompleted"
  | "tenCompleted";

export type Topic = "functions" | "variables" | "scopes";

export type ProgressType = {
  awarded: number;
  completed: boolean;
  lastSeen: number;
};

export type Progress = {
  variables: ProgressType;
  functions: ProgressType;
  scopes: ProgressType;
};

export type UserDataContextType = {
  progress: Progress;
  points: number;
  currentTopic: Topic;
  awards: Award[];
  showNewAward: boolean;
  updateProgress: (field: string, value: string) => void;
  updateCurrentTopic: (currentTopic: string) => void;
  updatePoints: (pointsToAdd: number) => void;
  updateAward: (award: Award) => void;
  setInitialUserInformation: (userInfo: any) => void;
  updateNewAwardSwal: (state: boolean) => void;
};

export type UserData = {
  progress: {
    variables: ProgressType;
    functions: ProgressType;
    scopes: ProgressType;
  };
  points: number;
  currentTopic: Topic;
  awards: string[] | null;
};
