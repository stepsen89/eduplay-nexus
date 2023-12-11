export type Award =
  | "basic"
  | "functions"
  | "variables"
  | "arrays"
  | "objects"
  | "fiveCompleted"
  | "firstCompleted"
  | "tenCompleted"
  | "fifteenCompleted"
  | "250Points"
  | "500Points";

export type Module = "functions" | "variables" | "arrays" | "objects";

export type ProgressType = {
  awarded: number;
  completed: boolean;
};

export type Progress = {
  variables: ProgressType;
  functions: ProgressType;
  objects: ProgressType;
  arrays: ProgressType;
};

export type GPTSingleLearningContent = {
  challengeInstruction: string;
  labels: string[];
  points?: number;
  answerGiven?: string;
  feedback?: string;
};

export type GPTLearningContent = {
  [K in Module]: GPTSingleLearningContent[];
};

type AwardNotification = {
  [K in Award]: boolean;
};

export type UserDataContextType = {
  progress: Progress;
  points: number;
  currentModule: Module;
  awards: Award[];
  awardNotifications: AwardNotification;
  showNewAward: boolean;
  totalChallenges: number;
  overallProgress: number;
  gptLearningContent: GPTLearningContent;
  updateProgress: (field: string, value: string) => void;
  updateCurrentModule: (currentModule: string) => void;
  updatePoints: (pointsToAdd: number) => void;
  updateAward: (award: Award) => void;
  setInitialUserInformation: (userInfo: any) => void;
  updateNewAwardSwal: (state: boolean) => void;
  resetUserContext: () => void;
  updateGPTLearningContent: (learningContent: GPTLearningContent) => void;
  resetProgress: (module: string) => void;
  removeAward: (award: Award) => void;
};

export type UserData = {
  progress: {
    variables: ProgressType;
    functions: ProgressType;
    objects: ProgressType;
    arrays: ProgressType;
  };
  totalChallenges: number;
  points: number;
  currentModule: Module;
  awards: string[] | null;
  learningContent: GPTLearningContent;
};

export type Question = {
  question: string;
  labels: string[];
};
