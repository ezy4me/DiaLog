import {
  Button,
  VStack,
  Box,
  HStack,
  useColorMode,
  Text,
  Pressable,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";
import useInsulinDosageStore from "@/app/store/insulinDosageStore";
import ConfirmAllert from "../Allerts/ConfirmAllert";
import { InsulinModalForm } from "./InsulinModalForm";

const getColorStatusStack = (value: number): string[] => {
  if (value >= 7.8) {
    return ["#ef4444", "#dc2626"];
  } else if (value <= 3.9) {
    return ["#fbbf24", "#f59e0b"];
  } else {
    return ["#4ade80", "#4ade60"];
  }
};

const getTextStatusStack = (type: number): string => {
 return type == 1 ? "Короткий" : "Долгий"
};

const InsulinListItem = ({ item }: { item: any }) => {
  const { colorMode } = useColorMode();
  const { deleteInsulinDosage } = useInsulinDosageStore((state) => ({
    deleteInsulinDosage: state.deleteInsulinDosage,
  }));
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onHandleDelete = async () => {
    setIsAlertOpen(true);
  };

  const onDeleteConfirmed = async () => {
    await deleteInsulinDosage(item.id);
    setIsAlertOpen(false);
  };

  const closeModal = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <Pressable borderRadius={16} onPress={() => setIsEditOpen(true)}>
        {({ isHovered, isFocused, isPressed }) => {
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
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.98 : 1,
                  },
                ],
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
                    ME
                  </Text>
                </Box>
              </VStack>
              <Box w={32} alignItems={"center"} justifyContent={"center"}>
                <Text textAlign={"center"}>
                  {getTextStatusStack(item.insulinTypeId)}
                </Text>
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
          );
        }}
      </Pressable>
      <ConfirmAllert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={onDeleteConfirmed}
      />
      {isEditOpen && (
        <InsulinModalForm
          edit={true}
          data={item}
          isModalVisible={isEditOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default InsulinListItem;
