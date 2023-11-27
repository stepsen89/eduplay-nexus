import firebase_app from "./config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(data) {
  let result = null;
  let error = null;

  console.log("test herre");

  try {
    result = await addDoc(collection(db, "setups"), data);
    console.log("Document written with ID: ", result.id);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
