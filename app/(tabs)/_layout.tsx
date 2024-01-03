import { View, Text, ViewStyle } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  focused: boolean;
}) {
  const iconStyles: ViewStyle = {
    top: 0,
    position: "relative",
    padding: 0,
    borderRadius: 0,
    backgroundColor: "white",
  };

  if (props.focused) {
    iconStyles.top = -12;
    iconStyles.position = "absolute";
    iconStyles.padding = 8;
    iconStyles.borderRadius = 50;
    iconStyles.backgroundColor = Colors.secondary;
  }

  return <MaterialCommunityIcons size={28} style={iconStyles} {...props} />;
}

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerTitleAlign: "center",
        headerTitleStyle: {
          textTransform: "uppercase",
          fontFamily: "mon-sb",
        },
        headerStyle: {
          backgroundColor: Colors.secondary,
        },
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
      }}>
      <Tabs.Screen
        name="diary"
        options={{
          headerTitle: "Дневник",
          tabBarLabel: "Дневник",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              name="google-analytics"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          headerTitle: "Питание",
          tabBarLabel: "Питание",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon name="food-apple" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Дом",
          tabBarLabel: "Дом",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          headerTitle: "Знания",
          tabBarLabel: "Знания",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon name="book" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Профиль",
          tabBarLabel: "Профиль",
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon name="account" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
