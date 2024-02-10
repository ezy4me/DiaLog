import { Button, VStack, Box, HStack, useColorMode, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import ConfirmAllert from "../Allerts/ConfirmAllert";

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

const BloodSugarItem = ({ item }: { item: any }) => {
  const { colorMode } = useColorMode();
  const { deleteBloodSugar } = useBloodSugarStore((state) => ({
    deleteBloodSugar: state.deleteBloodSugar,
  }));
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const onHandleDelete = async () => {
    setIsAlertOpen(true);
  };

  const onDeleteConfirmed = async () => {
    await deleteBloodSugar(item.id);
    setIsAlertOpen(false);
  };

  return (
    <>
      <Box
        mt={2}
        borderRadius={16}
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
        p={1}>
        <HStack space={[2, 3]} px={1} justifyContent="space-between">
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
            <Button
              onPress={() => onHandleDelete()}
              colorScheme={"red"}
              bg={"transparent"}
              size={"md"}
              py={1}
              leftIcon={
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color={"#ef4444"}
                />
              }
            />
            <Text mt={2}>{getCurrentDate(item.date)}</Text>
            <Text mt={2}>{getCurrentTime(item.time)}</Text>
          </VStack>
        </HStack>
      </Box>
      <ConfirmAllert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={onDeleteConfirmed}
      />
    </>
  );
};

export default BloodSugarItem;
