import {
  Stack,
  VStack,
  HStack,
  Pressable,
  ScrollView,
  Box,
  Text,
  Heading,
} from "native-base";

import { DiabetesInfoCard } from "@/components/DiabetesInfoCard";

import infoData from "infoData.json";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const data = infoData;
  const router = useRouter();

  const storeData = async (value: any) => {
    try {
      const stringValue = JSON.stringify(value);

      await AsyncStorage.setItem("bookInfo", stringValue);

      router.push("/(modals)/bookInfo");
    } catch (e) {
      // error
    }
  };

  const renderDiabetesInfoCards = () => {
    return data.map((item, index) => (
      <Pressable key={index} maxW={96} onPress={() => storeData(item)}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <DiabetesInfoCard
              key={item.id}
              isHovered={isHovered}
              isFocused={isFocused}
              isPressed={isPressed}
              data={item}
            />
          );
        }}
      </Pressable>
    ));
  };

  return (
    <ScrollView>
      <VStack space="2.5" pt="4" px="4">
        <Heading size={"sm"} p={4} borderRadius={16}>
          Норма сахара в крови:
        </Heading>
        <ScrollView horizontal>
          <HStack space={3}>
            <Stack
              borderRadius={16}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={2}>
              <Text w={72} textAlign={"center"} fontSize={"lg"}>
                Перед приемом пищи
              </Text>
              <Text fontSize={18}>3,9-5,6 ммоль/л</Text>
            </Stack>
            <Stack
              borderRadius={16}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={2}>
              <Text w={72} textAlign={"center"} fontSize={"lg"}>
                После приема пищи
              </Text>
              <Text fontSize={18}>7,8 ммоль/л</Text>
            </Stack>
            <Stack
              borderRadius={16}
              alignItems={"center"}
              justifyContent={"center"}
              py={2}
              px={2}>
              <Text w={72} textAlign={"center"} fontSize={"lg"}>
                Случайный показатель
              </Text>
              <Text fontSize={18}>7,0 ммоль/л</Text>
            </Stack>
          </HStack>
        </ScrollView>
        <VStack mb="2.5" mt="1.5" space={3}>
          {renderDiabetesInfoCards()}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
