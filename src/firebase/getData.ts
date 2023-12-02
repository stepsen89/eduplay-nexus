import { setNewUser } from "./addData";
import firebase_app from "./config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function getLearningContent(name: string) {
  let docRef = doc(db, "questions", name);
  let result = null;
  let error = null;
  let docSnap = null;

  try {
    docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error(error);
  }

  return { result, error };
}

export async function getUserProgressInformation(userId: string) {
  let docRef = doc(db, "users", userId);
  let result = null;
  let error = null;
  let docSnap = null;

  try {
    docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    } else {
      result = await setNewUser(userId);
      console.error("No such document!, but creating new document");
      docSnap = await getDoc(docRef);
      result = docSnap.data();
    }
  } catch (error) {
    console.error(error);
  }

  return { result, error };
}
