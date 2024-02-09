import React, { useEffect } from "react";
import { Text, Button, ScrollView, VStack, Center } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ProfileNavigationCard from "@/components/Profile/ProfileNavigationCard";
import useAuthStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Page = () => {
  const router = useRouter();
  const { accessToken, getAccessToken } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      await getAccessToken();
      console.log('accessToken: ', accessToken);
    };
  
    fetchData();
  }, [accessToken]);
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
          <Text color="indigo.400">О приложении</Text>
        </TouchableOpacity>



        <Center alignItems="center">
          <Text>
            Copyright with{" "}
            <MaterialCommunityIcons color="red" size={18} name="heart" />
          </Text>
          <Text fontWeight="semibold">by miliash, 2024</Text>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Page;
