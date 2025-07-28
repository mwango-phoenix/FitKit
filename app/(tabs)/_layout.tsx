import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { Colours } from "@/constants/Colours";
const TabIcon = ({ txt, icon, isFocus }: any) => {
  if (isFocus) {
    return (
      <View className="flex flex-col w-full  min-w-[115px] min-h-[60px] items-center justify-center overflow-hidden">
        <Image
          source={icon}
          style={{ width: 30, height: 28 }}
          tintColor={Colours.icon.focused}
        />
        <Text className="text-light font-mono font-bold text-xs">{txt}</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-col w-full  min-w-[115px] min-h-[60px] items-center justify-center overflow-hidden">
      <Image
        source={icon}
        style={{ width: 30, height: 28 }}
        tintColor={Colours.icon.unfocused}
      />
      <Text className="text-light/40 font-mono font-bold text-xs">{txt}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: Colours.darkBackground,
          height: 90,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Workouts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              txt="Workouts"
              icon={require("@/assets/images/heart.png")}
              isFocus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          title: "Exercise",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              txt="Exercise"
              icon={require("@/assets/images/situp.png")}
              isFocus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              txt="Planner"
              icon={require("@/assets/images/planner.png")}
              isFocus={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
