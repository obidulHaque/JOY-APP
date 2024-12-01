import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";

// Component for rendering tab icons with text
const TabIcon = ({ icon, color, name, focused }) => (
  <View className="flex items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      style={{ width: 24, height: 24 }}
    />
    <Text
      className={`text-xs ${focused ? "font-semibold" : "font-regular"}`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const TabLayout = () => {
  const tabScreenOptions = {
    tabBarActiveTintColor: "#FFA001",
    tabBarInactiveTintColor: "#257180",
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: "#161622",
      borderTopWidth: 1,
      borderTopColor: "#232533",
      height: 84,
    },
    tabBarItemStyle: {
      padding: 20, // Adjusts spacing around each tab
    },
  };

  return (
    <>
      <Tabs screenOptions={tabScreenOptions}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
