import React, { useEffect } from "react";
import { Text, Button, ScrollView, VStack, Center, Stack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ProfileNavigationCard from "@/components/Profile/ProfileNavigationCard";

const Page = () => {
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
      badges: ["Тема", "Уведомления"],
      route: "/(modals)/profile/appDataSettings",
    },
    {
      id: 3,
      icon: "archive",
      title: "Дополнительно",
      badges: ["Экспорт данных", "Удаление", "Выход"],
      route: "/(modals)/profile/archiveDataSettings",
    },
  ];

  return (
    <VStack
      _light={{ bg: "coolGray.50" }}
      _dark={{ bg: "coolGray.900" }}
      h={"full"}
      borderRadius={0}
      py={2}
      alignItems="center"
      justifyContent={"space-between"}
      space="2.5">
      <VStack alignItems="center" space="2.5">
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
          <Text color="indigo.400">О приложении</Text>
        </TouchableOpacity>
      </VStack>

      <Center alignItems="center">
        <Text>
          Copyright with{" "}
          <MaterialCommunityIcons color="red" size={18} name="heart" />
        </Text>
        <Text fontWeight="semibold">by miliash, 2024</Text>
      </Center>
    </VStack>
  );
};

export default Page;
