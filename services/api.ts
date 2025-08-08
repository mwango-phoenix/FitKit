import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
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

  return { ...(docSnap.data() as Omit<Exercise, "exerciseId">), exerciseId: exerciseId };

};


export const fetchExercises = async (
  movement?: string
): Promise<Exercise[]> => {
  let exercisesQuery;

  if (movement) {
    // Filter by movement type if available (push, pull, legs, etc.)
    exercisesQuery = query(
      collection(db, "exercises"),
      where("movement", "==", movement)
    );
  } else {
    // No filter — fetch all
    exercisesQuery = query(collection(db, "exercises"));
  }

  const querySnap = await getDocs(exercisesQuery);

  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Exercise, "id">),
  }));
};
