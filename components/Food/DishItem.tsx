import React from "react";
import { Box, Text, HStack, VStack, useColorMode, Badge } from "native-base";

const DishItem = ({ item }: { item: any }) => {
  const { colorMode } = useColorMode();

  const totalCalories = (item: any) => {
    const total = item.foodDishes.reduce(
      (total: any, dish: any) => total + (dish.food.energy * dish.weight) / 100,
      0
    );
    return total.toFixed(0);
  };

  const totalWeight = (item: any) => {
    return item.foodDishes.reduce(
      (total: any, dish: any) => total + dish.weight,
      0
    );
  };

  return (
    <Box
      borderRadius={16}
      w="100%"
      bg={{
        linearGradient: {
          colors:
            colorMode == "light"
              ? ["white", "white"]
              : ["blueGray.800", "blueGray.900"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      px={2}
      mb={2}>
      <VStack space={2} py={2} px={2}>
        <HStack justifyContent="space-between" alignItems={"center"}>
          <VStack>
            <Box borderRadius={4} mt={2} alignItems={"flex-start"}>
              <Text
                w={64}
                borderRadius={16}
                fontSize={"md"}
                fontWeight={"semibold"}
                textTransform={"uppercase"}>
                {item.name}
              </Text>
            </Box>
            <Text fontSize={"md"} fontWeight={"bold"}>
              {totalWeight(item)} гр.
            </Text>
          </VStack>
          <Box
            borderRadius={100}
            borderColor={"indigo.300"}
            borderWidth={2}
            p={2}
            alignItems={"center"}
            justifyContent={"center"}
            w={20}
            h={20}>
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              textTransform={"uppercase"}>
              {totalCalories(item)}
            </Text>
            <Text textTransform={"uppercase"}>ккал</Text>
          </Box>
        </HStack>
        <HStack w={64} flexWrap={"wrap"}>
          {item.foodDishes.map((i: any) => (
            <Badge
              bg={"indigo.500"}
              variant={"solid"}
              mb={1}
              mr={1}
              px={2}
              key={i.id}>
              {i.food.name}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default DishItem;
