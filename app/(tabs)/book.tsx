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

import { DiabetesInfoCard } from "@/components/Book/DiabetesInfoCard";

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
        <VStack mb="2.5" mt="1.5" space={3}>
          {renderDiabetesInfoCards()}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
