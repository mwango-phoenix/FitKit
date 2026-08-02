// components/RoutineList.tsx
import { Exercise } from "@/.expo/types/routine";
import { fetchExercises } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import ExerciseTile from "./ExerciseTile";
import ExerciseBottom from "./modals/ExerciseBottom";

const ExerciseList: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const sheetRef = useRef<BottomSheet>(null);

  const { data: exercises, loading } = useFetch(fetchExercises);

  //   if (loading) {
  //     return (
  //       <View className="flex-1 justify-center items-center">
  //         <ActivityIndicator size="large" color="#4F46E5" />
  //         <Text className="mt-2 text-lg text-gray-700">Loading Exercises...</Text>
  //       </View>
  //     );
  //   }

  const handleExercisePress = (exercise: Exercise) => {
    setSelectedExercise({ ...exercise });
    sheetRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    if (selectedExercise && sheetRef.current) {
      // Delay until after ref is populated
      const id = setTimeout(() => {
        sheetRef.current?.snapToIndex(1);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [selectedExercise]);

  return (
    <View className="flex-1 ">
      <FlatList
        data={exercises}
        renderItem={({ item }: { item: Exercise }) => (
          <View className="flex-1 h-40">
            <ExerciseTile
              exercise={item}
              onPress={() => handleExercisePress(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.exerciseId}
        contentContainerStyle={{ paddingBottom: 20 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      {selectedExercise && (
        <ExerciseBottom
          exercise={selectedExercise}
          ref={sheetRef}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </View>
  );
};

export default ExerciseList;
