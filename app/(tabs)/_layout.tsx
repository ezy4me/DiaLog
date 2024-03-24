import { View, Text, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorMode } from "native-base";
import useAuthStore from "@/app/store/authStore";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  focused: boolean;
}) {
  const { colorMode } = useColorMode();

  const iconStyles: ViewStyle = {
    top: 0,
    position: "relative",
    padding: 0,
    borderRadius: 0,
    backgroundColor: colorMode == "light" ? "white" : "#27272a",
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
  const { colorMode } = useColorMode();
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState<string>("USER");

  useEffect(() => {
    if (user) setRole(user?.role!);
  }, [user]);

  const tabsInfo: any = [
    {
      name: "diary",
      headerTitle: "Дневник",
      tabBarLabel: "Дневник",
      iconName: "google-analytics",
      href: role === "DOCTOR" ? null : "diary",
    },
    {
      name: "nutrition",
      headerTitle: "Питание",
      tabBarLabel: "Питание",
      iconName: "food-apple",
      href: role === "DOCTOR" ? null : "nutrition",
    },
    {
      name: "index",
      headerTitle: "Дом",
      tabBarLabel: "Дом",
      iconName: "home",
      href: role === "DOCTOR" ? null : "/",
    },
    {
      name: "book",
      headerTitle: "Знания",
      tabBarLabel: "Знания",
      iconName: "book",
      href: role === "DOCTOR" ? null : "book",
    },
    {
      name: "patients",
      headerTitle: "Пациенты",
      tabBarLabel: "Пациенты",
      href: role === "USER" ? null : "patients",
      iconName: "account-supervisor",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: colorMode == "light" ? "#525252" : "#e2e8f0",
        tabBarStyle: {
          backgroundColor: colorMode == "light" ? "white" : "#27272a",
          borderColor: colorMode == "light" ? "#e2e8f0" : "#3f3f46",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          textTransform: "uppercase",
          letterSpacing: 0.5,
          lineHeight: 32,
          borderBottomColor: "white",
          borderBottomWidth: 2,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          color: "white",
          fontFamily: "mon-sb",
        },
        headerStyle: {
          backgroundColor: "#4338ca",
        },
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
          padding: 2,
        },
      }}>
      {(tabsInfo || []).map((tab: any) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerTitle: tab.headerTitle,
            tabBarLabel: tab.tabBarLabel,
            href: role === "USER" ? tab.href : tab.href,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon name={tab.iconName} focused={focused} color={color} />
            ),
          }}
        />
      ))}

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Профиль",
          tabBarLabel: "Профиль",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="account" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
