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
import ConfirmAllert from "../Allerts/ConfirmAllert";
import { NutritionModalForm } from "./NutritionModalForm";
import useNutritionStore from "@/app/store/nutritionStore";
import useAuthStore from "@/app/store/authStore";

const NutritionItem = ({ item }: { item: any }) => {
  const { colorMode } = useColorMode();
  const { deleteNutrition } = useNutritionStore((state) => ({
    deleteNutrition: state.deleteNutrition,
  }));
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const onHandleDelete = async () => {
    setIsAlertOpen(true);
  };

  const onDeleteConfirmed = async () => {
    await deleteNutrition(user.id, item.id);
    setIsAlertOpen(false);
  };

  const totalCalories = (item: any) => {
    const total = item.dish.foodDishes.reduce(
      (total: any, dish: any) => total + (dish.food.energy * dish.weight) / 100,
      0
    );
    return total.toFixed(0);
  };

  const totalWeight = (item: any) => {
    return item.dish.foodDishes.reduce(
      (total: any, dish: any) => total + dish.weight,
      0
    );
  };

  return (
    <>
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
            borderColor={"emerald.400"}
            p={4}>
            <Text fontSize={18} fontWeight={"semibold"}>
              {totalCalories(item)}
            </Text>
            <Text fontSize={14} fontWeight={"semibold"}>
              kkal
            </Text>
          </Box>
        </VStack>
        <Box w={32} alignItems={"center"} justifyContent={"center"}>
          <Text textAlign={"center"}>{item.nutritionType.name}</Text>
          <Text textAlign={"center"}>{totalWeight(item)} гр.</Text>
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
      <ConfirmAllert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={onDeleteConfirmed}
      />
    </>
  );
};

export default NutritionItem;
