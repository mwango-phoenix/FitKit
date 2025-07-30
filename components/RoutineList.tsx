// components/RoutineList.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import RoutineTile from "./RoutineTile";

interface Routine {
  id: string;
  name: string;
  bgImage: string;
  exercises: string[];
}

const RoutineList: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-2 text-lg text-gray-700">Loading Routines...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={routines}
      renderItem={({ item }: { item: Routine }) => (
          <RoutineTile id={item.id} name={item.name} img={item.bgImage} />
        // <Text className="text-lg text-gray-800 p-4">{item.name} </Text>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default RoutineList;
