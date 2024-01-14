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
} from "native-base";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import calculateBMI from "@/utils/bmiCalculator";
import ProfileNavigationCard from "@/components/Profile/ProfileNavigationCard";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();

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
      badges: ["Измерение глюкозы", "Инъекции инсулина"],
      route: "/(modals)/profile/notificationDataSettings",
    },
    {
      id: 4,
      icon: "archive",
      title: "Дополнительно",
      badges: ["Экспорт данных"],
      route: "/(modals)/profile/archiveDataSettings",
    },
  ];

  return (
    <ScrollView>
      <VStack py={2} alignItems="center" space="2.5" px="4">
        <Button shadow={1} w={"100%"} bg={"light.100"} borderRadius={100}>
          <HStack alignItems="center">
            <MaterialCommunityIcons name="google" size={28} color={"#EA4335"} />
            <Text ml={4} color="coolGray.600">
              продолжить с Google
            </Text>
          </HStack>
        </Button>

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

        <Stack w={64} direction="column" mb="2.5" mt="1.5" space={3}>
          {!isSignedIn && (
            <Button
              borderRadius={100}
              shadow={1}
              colorScheme="danger"
              onPress={() => signOut()}>
              Выйти
            </Button>
          )}

          {!isSignedIn && (
            <Button
              borderRadius={100}
              colorScheme="indigo"
              onPress={() => router.push("/(modals)/login")}>
              Войти
            </Button>
          )}
        </Stack>
        <Stack alignItems={"center"}>
          <Text>
            Copyright with{" "}
            <MaterialCommunityIcons color={"red"} size={18} name="heart" />
          </Text>
          <Text fontWeight={"semibold"}>by miliash, 2024</Text>
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
