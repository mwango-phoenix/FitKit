import { collection, getDocs, doc, getDoc, query } from "firebase/firestore";
import { Routine, Exercise } from "@/.expo/types/routine";
import { db } from "../FirebaseConfig";

export const fetchRoutines = async (): Promise<Routine[]> => {
  const routinesQuery = query(collection(db, "routines"));
  const querySnap = await getDocs(routinesQuery);

  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Routine, "id">),
  }));
};

export const fetchExercise = async (exerciseId: string): Promise<Exercise> => {
  const docRef = doc(db, "exercises", exerciseId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Exercise with ID ${exerciseId} not found`);
  }

  return docSnap.data() as Omit<Exercise, "id">;

};
