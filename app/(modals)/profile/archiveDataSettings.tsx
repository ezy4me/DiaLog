import {
  Text,
  ScrollView,
  VStack,
  Button,
  Box,
  Stack,
  useColorMode,
} from "native-base";
import React from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import useAuthStore from "@/app/store/authStore";
const Page = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const { onLogout } = useAuthStore();

  const onHandleLogout = async () => {
    await AsyncStorage.clear();
    await onLogout().then(() => {
      router.push("/(modals)/login");
    });
  };

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" mt="4" px="4">
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Экспорт данных
        </Text>
        <Stack
          direction={"row"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <AntDesign
              name="pdffile1"
              size={18}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text ml={2}>В формате .pdf </Text>
          </Box>
          <Button w={24} borderRadius={100} shadow={1} colorScheme="indigo">
            <MaterialCommunityIcons
              name="file-export"
              size={24}
              color={colorMode == "light" ? "black" : "white"}
            />
          </Button>
        </Stack>

        <Text fontWeight={"semibold"} fontSize={"md"}>
          Аккаунт
        </Text>
        <Stack
          direction={"row"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialIcons
              name="delete"
              size={18}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text ml={2}>Удалить аккаунт</Text>
          </Box>
          <Button
            w={24}
            borderRadius={100}
            shadow={1}
            colorScheme="danger"
            onPress={() => {}}>
            Удалить
          </Button>
        </Stack>
        <Stack
          direction={"row"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={18}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text ml={2}>Выйти</Text>
          </Box>
          <Button
            w={24}
            borderRadius={100}
            shadow={1}
            colorScheme="danger"
            onPress={onHandleLogout}>
            Выйти
          </Button>
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
