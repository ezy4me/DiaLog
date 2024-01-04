import { Box, Stack, VStack, Pressable, ScrollView } from "native-base";

import { DiabetesInfoCard } from "@/components/DiabetesInfoCard";

import infoData from "infoData.json";
import { useNavigation, useRouter } from "expo-router";
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
      <Pressable maxW={96} onPress={() => storeData(item)}>
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
      <VStack space="2.5" mt="4" px="4">
        <Stack direction="column" mb="2.5" mt="1.5" space={3}>
          {renderDiabetesInfoCards()}
        </Stack>
      </VStack>
    </ScrollView>
  );
}
