import { useState, useEffect } from "react";
import { fetchExercise } from "@/services/api";
import { Exercise } from "@/.expo/types/routine";

export const useFetchExercises = (exerciseIds: string[]) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (exerciseIds.length === 0) {
      setExercises([]);
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          exerciseIds.map((id) => fetchExercise(id))
        );
        setExercises(results);
        setError(null);
      } catch (err: any) {
        setError(err);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [exerciseIds]);

  return { exercises, loading, error };
};
