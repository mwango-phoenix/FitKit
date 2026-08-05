import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchExercise } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import ExerciseItem from "@/components/ExerciseItem";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const fetchFn = React.useCallback(() => fetchExercise(id), [id]);
  const { data: exercise, loading, error } = useFetch(fetchFn);

  if (loading) return <ActivityIndicator size="large" />;
  if (error || !exercise) return <Text>Exercise not found</Text>;

  return (
    <View>
      <ExerciseItem exercise={exercise} />
    </View>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({});