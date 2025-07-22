import { Tabs } from "expo-router";

const TabIcon = () => {
  return (
    <>
      {/* <Image source={require('@/assets/icon.png')} style={{ width: 24, height: 24 }} />
      <Text>Tab</Text> */}
    </>
  )
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
