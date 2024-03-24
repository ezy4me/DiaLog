import { Button, VStack, Box, HStack, useColorMode, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";

const getColorStatusStack = (value: number): string[] => {
  if (value >= 7.8) {
    return ["#ef4444", "#dc2626"];
  } else if (value <= 3.9) {
    return ["#fbbf24", "#f59e0b"];
  } else {
    return ["#4ade80", "#4ade60"];
  }
};

const getTextStatusStack = (value: number): string => {
  if (value >= 7.8) {
    return "Высокий уровень сахара";
  } else if (value <= 3.9) {
    return "Низкий уровень сахара";
  } else {
    return "Уровень сахара в пределах нормы";
  }
};

const PatientBloodSugarItem = ({ item }: { item: any }) => {
  const { colorMode } = useColorMode();

  return (
    <HStack
      bg={{
        linearGradient: {
          colors:
            colorMode == "light"
              ? ["white", "white"]
              : ["blueGray.700", "blueGray.800"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      space={[2, 3]}
      p={2}
      mt={2}
      alignItems={"center"}
      justifyContent="space-between">
      <VStack borderRadius={100}>
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={100}
          borderWidth={2}
          borderColor={getColorStatusStack(item.value)}
          p={4}>
          <Text fontSize={18} fontWeight={"semibold"}>
            {item.value}
          </Text>
          <Text fontSize={14} fontWeight={"semibold"}>
            mmol/l
          </Text>
        </Box>
      </VStack>
      <Box w={32} alignItems={"center"} justifyContent={"center"}>
        <Text textAlign={"center"}>{getTextStatusStack(item.value)}</Text>
      </Box>
      <VStack alignItems={"center"} justifyContent={"center"}>
        <Text mt={2}>{getCurrentDate(item.date)}</Text>
        <Text mt={2}>{getCurrentTime(item.time)}</Text>
      </VStack>
    </HStack>
  );
};

export default PatientBloodSugarItem;
