import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  ScrollView,
  Stack,
  useColorMode,
  AspectRatio,
  Image,
  Divider,
} from "native-base";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAppSettingsStore from "../store/appSettingsStore";

const Page = () => {
  const router = useRouter();

  const { startUp, setStartUp } = useAppSettingsStore((state) => ({
    startUp: state.startUp,
    setStartUp: state.setStartUp,
  }));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode } = useColorMode();

  const onEnter = () => {
    setStartUp('false');
    router.push("/(tabs)");
  };

  return (
    <ScrollView px={4}>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Center>
          <Image
            w={"40"}
            h={"40"}
            source={require("../../assets/images/mocking-bear.png")}
            alt="image"
          />
        </Center>
      </AspectRatio>

      <Text mb={4} textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>
        У тебя уже есть аккаунт?
      </Text>

      <FormControl>
        <Input
          mb={4}
          variant="rounded"
          placeholder="Почта"
          value={email}
          onChangeText={setEmail}
          rightElement={
            <Box
              borderLeftWidth={1}
              borderLeftColor={"muted.200"}
              p={2}
              borderRadius={16}
              children={
                <Entypo
                  name="mail"
                  size={18}
                  color={colorMode == "light" ? "#525252" : "white"}
                />
              }
            />
          }
        />
        <Input
          mb={4}
          variant="rounded"
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          rightElement={
            <Box
              borderLeftWidth={1}
              borderLeftColor={"muted.200"}
              p={2}
              borderRadius={16}
              children={
                <MaterialIcons
                  name="lock"
                  size={18}
                  color={colorMode == "light" ? "#525252" : "white"}
                />
              }
            />
          }
        />
      </FormControl>

      <Button
        onPress={() => onEnter()}
        w={"full"}
        mt="2"
        colorScheme="indigo"
        borderRadius={100}>
        Войти
      </Button>

      <HStack my="6" justifyContent="center" alignItems="center">
        <Box mr={2} borderColor={"light.300"} borderTopWidth={1} w={24} />
        <Text fontSize="sm">или</Text>
        <Box ml={2} borderColor={"light.300"} borderTopWidth={1} w={24} />
      </HStack>

      <Button shadow={1} w={"100%"} bg={"light.100"} borderRadius={100}>
        <HStack alignItems="center">
          <MaterialCommunityIcons name="google" size={20} color={"#EA4335"} />
          <Text ml={4} color="coolGray.600">
            продолжить с Google
          </Text>
        </HStack>
      </Button>
    </ScrollView>
  );
};

export default Page;
