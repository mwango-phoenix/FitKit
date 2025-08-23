import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setDate] = useState(today);

  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayHeaders = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const renderCalendarDays = () => {
    const days = [];

    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View
          key={`empty-${i}`}
          className="w-[14.28%] h-10 justify-center items-center"
        />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <TouchableOpacity
          key={day}
          onPress={() => setDate(new Date(year, month, day))}
          className={`w-[14.28%] h-8 justify-center items-center ${
            isSelected ? "bg-primary rounded-full" : ""
          }`}
        >
          <Text
            className={`text-md ${isSelected ? "text-dark" : "text-light"}`}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <>
      <View>
        <Text className="text-xl">Planner</Text>
      </View>

      <View className="my-4 justify-center items-center bg-darkBackground rounded-2xl p-4 w-full">
        {/* Header */}
        <View className="flex-row items-center justify-center w-full mb-4">
          <Text className="text-light text-xl font-medium">{monthName}</Text>
        </View>

        {/* Day Headers */}
        <View className="flex-row w-full mb-2">
          {dayHeaders.map((day, index) => (
            <View
              key={index}
              className="w-[14.28%] justify-center items-center"
            >
              <Text className="text-light text-md">{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap w-full">
          {renderCalendarDays()}
        </View>
      </View>

      <View className="mt-4 ml-4 justify-center">
        <Text className="text-dark text-lg font-medium">{monthName} {selectedDate.getDate()} plan:</Text>
      </View>
    </>
  );
}
