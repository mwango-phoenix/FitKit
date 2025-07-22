import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { Colours } from "@/constants/Colours";
const TabIcon = ({ txt, icon, isFocus }: any) => {
  if (isFocus) {
    return (
      <View>
        <Image
          source={icon}
          style={{ width: 24, height: 24 }}
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
          style={{ width: 24, height: 24 }}
          tintColor={Colours.icon.unfocused}
        />
        <Text className="text-light/40">{txt}</Text>
      </View>
  )
};

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
