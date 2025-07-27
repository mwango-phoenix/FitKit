import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { Colours } from "@/constants/Colours";
const TabIcon = ({ txt, icon, isFocus }: any) => {
  if (isFocus) {
    return (
      <View>
        <Image
          source={icon}
          style={{ width: 30, height: 28 }}
          tintColor={Colours.icon.focused}
        />
        <Text className="text-light">{txt}</Text>
      </View>
    );
  }
  return (
    <View>
      <Image
        source={icon}
        style={{ width: 30, height: 28 }}
        tintColor={Colours.icon.unfocused}
      />
      <Text className="text-light/40">{txt}</Text>
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
          height: 70,
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
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              txt="Exercises"
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
