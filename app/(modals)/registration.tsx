import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Text,
  ScrollView,
  useColorMode,
  AspectRatio,
  Image,
} from "native-base";
import {
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAppSettingsStore from "../store/appSettingsStore";
import CustomSwitch from "../UI/CustomSwitch";
import Colors from "@/constants/Colors";

const Page = () => {
  const router = useRouter();

  const { startUp, setStartUp } = useAppSettingsStore((state) => ({
    startUp: state.startUp,
    setStartUp: state.setStartUp,
  }));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode } = useColorMode();

  const onRegister = () => {
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
        Введите свои учетные данные
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

      <CustomSwitch
            selectionMode={"USER"}
            roundCorner={true}
            options={[
              { label: "Пациент", value: "USER" },
              { label: "Доктор", value: "DOCTOR" },
            ]}
            onSelectSwitch={() => {}}
            selectionColor={Colors.primary}
          />

      <Button
        onPress={() => onRegister()}
        w={"full"}
        mt="2"
        colorScheme="indigo"
        borderRadius={100}>
        Зарегистрироваться
      </Button>

    </ScrollView>
  );
};

export default Page;
