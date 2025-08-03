// components/RoutineList.tsx
import { Routine } from "@/.expo/types/routine";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { db } from "../FirebaseConfig";
import RoutineBottomSheet from "./modals/RoutineDetails";
import RoutineTile from "./RoutineTile";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import RoutineBottom from "./modals/RoutineBottom";

const RoutineList: React.FC = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const sheetRef = useRef<BottomSheet>(null);

  // Function to fetch routines from database (can be called for both real-time and one-time)
  const fetchRoutines = useCallback(async () => {
    setLoading(true);

    const routinesQuery = query(collection(db, "routines"));

    try {
      const querySnapshot = await getDocs(routinesQuery);
      const fetchedRoutines: Routine[] = [];
      querySnapshot.forEach((document) => {
        fetchedRoutines.push({
          id: document.id,
          ...(document.data() as Omit<Routine, "id">),
        });
      });
      setRoutines(fetchedRoutines);
    } catch (error) {
      console.error("Error fetching one-time routines: ", error);
      Alert.alert("Error", "Failed to load routines. Please try again.");
    } finally {
      setLoading(false);
    }
    return undefined;
  }, []);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  const openBottomSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
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
