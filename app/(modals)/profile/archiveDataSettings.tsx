import { useAuth } from "@clerk/clerk-expo";
import {
  View,
  Text,
  ScrollView,
  VStack,
  HStack,
  Button,
  Box,
  Stack,
  useColorMode,
} from "native-base";
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const Page = () => {
  const { colorMode } = useColorMode();

  const { signOut, isSignedIn } = useAuth();
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
          {!isSignedIn && (
            <Button
              w={24}
              borderRadius={100}
              shadow={1}
              colorScheme="danger"
              onPress={() => signOut()}>
              Удалить
            </Button>
          )}
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
          {!isSignedIn && (
            <Button
              w={24}
              borderRadius={100}
              shadow={1}
              colorScheme="danger"
              onPress={() => signOut()}>
              Выйти
            </Button>
          )}
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
