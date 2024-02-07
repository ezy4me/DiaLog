import {
  Text,
  Button,
  Box,
  ScrollView,
  VStack,
  Stack,
  Input,
  HStack,
  Select,
  Center,
} from "native-base";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import calculateBMI from "@/utils/bmiCalculator";
import ProfileNavigationCard from "@/components/Profile/ProfileNavigationCard";
import { TouchableOpacity } from "react-native";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();

  const navigateToPage = (route: any) => {
    router.push(route);
  };

  const navigationData = [
    {
      id: 1,
      icon: "person",
      title: "Личные данные",
      badges: ["Почта", "Имя", "Рост", "Вес", "Пол", "Тип диабета"],
      route: "/(modals)/profile/personalDataSettings",
    },
    {
      id: 2,
      icon: "apps",
      title: "Настройки приложения",
      badges: ["Тема", "Язык", "Метрика"],
      route: "/(modals)/profile/appDataSettings",
    },
    {
      id: 3,
      icon: "notifications",
      title: "Уведомления",
      badges: ["Уровень глюкозы", "Инъекции инсулина"],
      route: "/(modals)/profile/notificationDataSettings",
    },
    {
      id: 4,
      icon: "archive",
      title: "Дополнительно",
      badges: ["Экспорт данных", "Удаление", "Выход"],
      route: "/(modals)/profile/archiveDataSettings",
    },
  ];

  return (
    <ScrollView>
      <VStack py={2} alignItems="center" space="2.5" px="4">
        {navigationData.map(({ id, icon, title, badges, route }) => (
          <ProfileNavigationCard
            key={id}
            id={id}
            icon={icon}
            title={title}
            badges={badges}
            route={route}
          />
        ))}

        <TouchableOpacity onPress={() => navigateToPage("/(modals)/aboutApp")}>
          <Text color={"indigo.400"}>О приложении</Text>
        </TouchableOpacity>

        {/* <Button shadow={1} w={"100%"} bg={"light.100"} borderRadius={100}>
          <HStack alignItems="center">
            <MaterialCommunityIcons name="google" size={20} color={"#EA4335"} />
            <Text ml={4} color="coolGray.600">
              продолжить с Google
            </Text>
          </HStack>
        </Button> */}

        {!isSignedIn && (
          <Button
            w={"full"}
            borderRadius={100}
            colorScheme="indigo"
            onPress={() => router.push("/(modals)/login")}>
            Войти
          </Button>
        )}

        <Center alignItems={"center"}>
          <Text>
            Copyright with{" "}
            <MaterialCommunityIcons color={"red"} size={18} name="heart" />
          </Text>
          <Text fontWeight={"semibold"}>by miliash, 2024</Text>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Page;
