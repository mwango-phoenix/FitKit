// components/RoutineList.tsx
import { Routine } from "@/.expo/types/routine";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import RoutineTile from "./RoutineTile";
import BottomSheet from "@gorhom/bottom-sheet";
import RoutineBottom from "./modals/RoutineBottom";
import { useFetch } from "@/services/useFetch";
import { fetchRoutines } from "@/services/api";



const RoutineList: React.FC = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

  const sheetRef = useRef<BottomSheet>(null);

  const { data: routines, loading } = useFetch(fetchRoutines);

  const openBottomSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(1);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-2 text-lg text-gray-700">Loading Routines...</Text>
      </View>
    );
  }

  const handleRoutinePress = (routine: Routine) => {
    setSelectedRoutine(routine);
    openBottomSheet();
  };

  return (
    <View className="flex-1 ">
      <FlatList
        data={routines}
        renderItem={({ item }: { item: Routine }) => (
          <RoutineTile
            id={item.id}
            name={item.name}
            img={item.bgImage}
            onPress={() => handleRoutinePress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <RoutineBottom routine={selectedRoutine} ref={sheetRef}/>
      
      
    </View>
  );
};

export default RoutineList;
