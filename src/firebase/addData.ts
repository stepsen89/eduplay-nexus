import firebase_app from "./config";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { initialLearningPath, initialUserSetup } from "./constants";

const db = getFirestore(firebase_app);

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
