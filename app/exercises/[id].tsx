import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ExerciseDetails</Text>
    </View>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({});
