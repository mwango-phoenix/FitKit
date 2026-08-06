import { Exercise } from "@/.expo/types/routine";
import { fetchExercises } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import ExerciseTile from "./ExerciseTile";
import ExerciseBottom from "./modals/ExerciseBottom";
import SearchBar from "./SearchBar";
import SwitchSelector from "./SwitchSelector";
import { BottomSheetFuncs } from "./modals/BottomSheet";

const ExerciseList: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [search, setSearch] = useState("");
  const [movement, setMovement] = useState<string | undefined>(undefined);

  const sheetRef = useRef<BottomSheetFuncs>(null);

  const fetchFn = useCallback(() => fetchExercises(movement), [movement]);
  const { data: exercises, loading } = useFetch(fetchFn);

  const filteredExercises = useMemo(
    () =>
      (exercises ?? []).filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase())
      ),
    [exercises, search]
  );

  const handleExercisePress = (exercise: Exercise) => {
    setSelectedExercise({ ...exercise });
    sheetRef.current?.snapToIndex(1);
  };

  return (
    <View className="flex-1">
      <SearchBar value={search} onChangeText={setSearch} />
      <SwitchSelector
        options={["all", "push", "pull", "legs"]}
        value={movement ?? "all"}
        onChange={setMovement}
      />
      <FlatList
        data={filteredExercises}
        renderItem={({ item }: { item: Exercise }) => (
          <View className="flex-1 h-40">
            <ExerciseTile exercise={item} onPress={() => handleExercisePress(item)} />
          </View>
        )}
        keyExtractor={(item) => item.exerciseId}
        contentContainerStyle={{ paddingBottom: 20 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      <ExerciseBottom
        exercise={selectedExercise}
        ref={sheetRef}
        onClose={() => setSelectedExercise(null)}
      />
    </View>
  );
};

export default ExerciseList;