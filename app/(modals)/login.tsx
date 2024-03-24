import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Text,
  ScrollView,
  useColorMode,
  AspectRatio,
  Image,
} from "native-base";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAppSettingsStore from "../store/appSettingsStore";
import useAuthStore from "../store/authStore";

const Page = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const { user, onLogin } = useAuthStore((state) => ({
    onLogin: state.onLogin,
    user: state.user,
  }));

  const { startUp, setStartUp } = useAppSettingsStore((state) => ({
    startUp: state.startUp,
    setStartUp: state.setStartUp,
  }));

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user?.role === "USER") {
      setStartUp(Promise.resolve(false));
      router.push("/(tabs)");
    } else if (user?.role === "DOCTOR") {
      setStartUp(Promise.resolve(false));
      router.push("/(tabs)/patients");
    }
  }, [user]);

  const onHandleEnter = async () => {
    if (email && password) await onLogin(email, password);
  };

  const onReg = () => {
    router.push("/(modals)/registration");
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
          type="password"
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
        onPress={onHandleEnter}
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

      <Button
        onPress={() => onReg()}
        w={"full"}
        mt="2"
        colorScheme="indigo"
        borderRadius={100}>
        Регистрация
      </Button>

      {/* <Button shadow={1} w={"100%"} bg={"light.100"} borderRadius={100}>
        <HStack alignItems="center">
          <MaterialCommunityIcons name="google" size={20} color={"#EA4335"} />
          <Text ml={4} color="coolGray.600">
            продолжить с Google
          </Text>
        </HStack>
      </Button> */}
    </ScrollView>
  );
};

export default Page;
