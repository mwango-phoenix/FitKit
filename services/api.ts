import { collection, getDocs, query, where } from "firebase/firestore";
import { Routine, Exercise } from "@/.expo/types/routine";
import { db } from "../FirebaseConfig";

export const fetchRoutines = async (): Promise<Routine[]> => {
  const routinesQuery = query(collection(db, "routines"));
  const querySnapshot = await getDocs(routinesQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Routine, "id">),
  }));
};

export const fetchExercise = async (exerciseId: string): Promise<Exercise[]> => {
  const exercisesQuery = query(collection(db, "exercises"), where("exerciseId", "==", exerciseId));
  const querySnapshot = await getDocs(exercisesQuery);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Exercise, "id">),
  }));
};
