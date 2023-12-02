import firebase_app from "./config";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function updateSingleFieldForUser(userId: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await updateDoc(doc(db, "users", userId), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
