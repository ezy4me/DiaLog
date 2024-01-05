import {
  Text,
  Button,
  Box,
  ScrollView,
  VStack,
  Stack,
  Input,
  HStack,
  InputRightAddon,
  Select,
  CheckIcon,
} from "native-base";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("190");
  const [gender, setGender] = useState("");

  const calculateBMI = (weight: number, height: number) => {
    if (!isNaN(height) && !isNaN(weight)) {
      const heightInMeters = height / 100;

      const bmi = weight / (heightInMeters * heightInMeters);

      return bmi.toFixed(2);
    }
    return "____";
  };

  return (
    <ScrollView>
      <VStack alignItems="center" space="2.5" mt="4" px="4">
        <Button mt="2" shadow={1} w={"100%"} backgroundColor="light.100">
          <HStack alignItems="center">
            <MaterialCommunityIcons name="google" size={28} color={"#EA4335"} />
            <Text ml={4} color="coolGray.600">
              продолжить с Google
            </Text>
          </HStack>
        </Button>
        <HStack w={"100%"} justifyContent={"center"}>
          <Box
            borderRadius={100}
            bg={{
              linearGradient: {
                colors: ["indigo.500", "indigo.800"],
                start: [0, 0],
                end: [1, 0.5],
              },
            }}
            mr={2}
            mt={3}
            alignItems={"center"}
            justifyContent={"center"}
            w={32}
            h={32}>
            <Text
              color={"white"}
              fontSize={"md"}
              fontWeight={"bold"}
              textTransform={"uppercase"}>
              ИМТ
            </Text>

            <Text
              fontSize={"xl"}
              color={"white"}
              fontWeight={"semi-bold"}
              textTransform={"uppercase"}>
              {calculateBMI(parseFloat(weight), parseFloat(height))}
            </Text>
          </Box>
        </HStack>
        <Input
          variant="rounded"
          placeholder="Ваша почта"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          variant="rounded"
          placeholder="Ваше имя"
          value={name}
          onChangeText={setName}
        />
        <Select
          w={"100%"}
          variant="rounded"
          selectedValue={gender}
          placeholder="Пол"
          dropdownIcon={
            <Box mr={2}>
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color="#525252"
              />
            </Box>
          }
          _selectedItem={{
            bg: "indigo.100",
            endIcon: (
              <MaterialCommunityIcons name="check" size={24} color="black" />
            ),
          }}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Select.Item label="Мужской" value="male" />
          <Select.Item label="Женский" value="female" />
        </Select>
        <Stack
          w={"100%"}
          justifyContent={"flex-start"}
          direction="row"
          mb="2.5"
          mt="1.5"
          space={2}>
          <Input
            w={"50%"}
            variant="rounded"
            placeholder="Рост"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            rightElement={
              <Box
                borderLeftWidth={1}
                borderLeftColor={"muted.200"}
                p={2}
                children={"см"}
              />
            }
          />
          <Input
            w={"47.5%"}
            variant="rounded"
            placeholder="Вес"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            rightElement={
              <Box
                borderLeftWidth={1}
                borderLeftColor={"muted.200"}
                p={2}
                children={"кг"}
              />
            }
          />
        </Stack>

        <Stack w={64} direction="column" mb="2.5" mt="1.5" space={3}>
          <Button borderRadius={100} colorScheme="success">
            Сохранить
          </Button>

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
      </VStack>
    </ScrollView>
  );
};

export default Page;
