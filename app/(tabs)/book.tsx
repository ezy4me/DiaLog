import { Stack, VStack, Pressable, ScrollView } from "native-base";

import { DiabetesInfoCard } from "@/components/DiabetesInfoCard";

import infoData from "infoData.json";

export default function Page() {
  const data = infoData;
  const renderDiabetesInfoCards = () => {

    return data.map((item, index) => (
      <Pressable key={index} maxW={96}>
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
