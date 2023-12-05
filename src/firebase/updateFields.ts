import firebase_app from "./config";
import { getFirestore, updateDoc, doc, Firestore, getDoc } from "firebase/firestore";
import { firestore } from "firebase/app";

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

export async function updateGPTLearningPath(userId: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await updateDoc(doc(db, "gpt-path", userId), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// export async function updateLastQuestionWithPoints(userId: string, field: string, points: number) {
//   let result = null;
//   let error = null;

//   const docRef = doc(db, "gpt-path", userId);

//   try {
//     result = await updateDoc(docRef, {
//       [field]: firestore.FieldValue.arrayUnion("points", points),
//     });
//   } catch (e) {
//     error = e;
//   }

//   return { result, error };
// }

export async function updateQuestions(
  userId: string,
  field: string,
  points: number,
  challengeToAdd: { challengeInstruction: string; points: number }
) {
  let result = null;
  let error = null;

  const docRef = doc(db, "gpt-path", userId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const array = data[field];
      const lastElement = array[array.length - 1];
      lastElement.points = points; // update points
      array[array.length - 1] = lastElement; // update last element in array
      array.push(challengeToAdd);

      console.log("array", array);
      result = await updateDoc(docRef, { [field]: array }); // write array back to document
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
