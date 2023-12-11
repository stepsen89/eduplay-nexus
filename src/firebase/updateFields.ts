import firebase_app from "./config";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";

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

export async function updateQuestions(
  userId: string,
  field: string,
  points: number,
  answerGiven: string,
  feedback: string,
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
      lastElement.answerGiven = answerGiven; // update answer given
      lastElement.feedback = feedback; // update feedback
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

const resetModules = {
  functions: "Create a new function which returns 'Hello World'",
  variables: "Create a new variable called 'myVar' and assign it a value of 5",
  objects:
    "Create a new object called 'myObj' with a property called 'myProp' and assign it a value of 5",
  arrays: "Create a new array called 'myArr' with a value of 5",
};

export async function resetModuleInFirestore(userId: string, module: string) {
  let result = null;
  let error = null;

  const docRef = doc(db, "gpt-path", userId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const initialModule = {
        challengeInstruction: resetModules[module as keyof typeof resetModules],
        points: 0,
      };

      result = await updateDoc(docRef, { [module]: [initialModule] }); // write array back to document
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
