import firebase_app from "./config";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app);

type ProgressUpdate = {
  userId: string;
  progress: {
    variables?: number;
    functions?: number;
    scopes?: number;
  };
};

const initialUserSetup = {
  awards: [],
  awardNotifications: {
    fiveCompleted: false,
    tenCompleted: false,
    "250Points": false,
    "500Points": false,
  },
  currentTopic: "arrays",
  points: 0,
  totalChallenges: 0,
  functions: {
    awarded: 0,
    completed: false,
    lastSeen: 1,
  },
  variables: {
    awarded: 0,
    completed: false,
    lastSeen: 1,
  },
  arrays: {
    awarded: 0,
    completed: false,
    lastSeen: 1,
  },
  objects: { awarded: 0, completed: false, lastSeen: 1 },
};

const initialLearningPath = {
  arrays: [{ challengeInstruction: "Create an empty array", points: 0 }],
  variables: [{ challengeInstruction: "Create a new variable", points: 0 }],
  functions: [{ challengeInstruction: "Create a function which returns 'Hello World'", points: 0 }],
};

export default async function addData(data: ProgressUpdate) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, "progress", data.userId), data.progress);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function setNewUser(userId: string) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, "users", userId), initialUserSetup);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function setNewGptLearningPath(userId: string) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, "gpt-path", userId), initialLearningPath);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
