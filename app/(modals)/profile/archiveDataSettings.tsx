import { useAuth } from "@clerk/clerk-expo";
import {
  View,
  Text,
  ScrollView,
  VStack,
  HStack,
  Button,
  Box,
} from "native-base";
import React from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <ScrollView bg={"white"} maxH={"100%"}>
      <VStack space="2.5" mt="4" px="4">
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Экспорт данных
        </Text>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <AntDesign name="pdffile1" size={18} color="black" />
            <Text ml={2}>В формате .pdf  </Text>

          </Box>
          <Button w={24} borderRadius={100} shadow={1} colorScheme="indigo">
            <MaterialCommunityIcons
              name="file-export"
              size={24}
              color="white"
            />
          </Button>
        </HStack>

        <Text fontWeight={"semibold"} fontSize={"md"}>
          Аккаунт
        </Text>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialIcons name="delete" size={18} color="black" />
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
        </HStack>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialCommunityIcons
              name="exit-to-app"
              size={18}
              color="black"
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
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
