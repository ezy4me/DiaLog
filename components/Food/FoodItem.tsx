import React from "react";
import { Box, Text, HStack, VStack, useColorMode } from "native-base";

interface Food {
  id: number;
  name: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  energy: number;
}

const FoodItem = ({ item }: { item: Food }) => {
  const { colorMode } = useColorMode();

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
      <VStack>
        <HStack justifyContent="space-between" alignItems={"center"}>
          <Box borderRadius={4} mt={2} p={2} alignItems={"flex-start"}>
            <Text
              px={4}
              w={64}
              borderRadius={16}
              fontSize={"md"}
              fontWeight={"semibold"}
              textTransform={"uppercase"}>
              {item.name}
            </Text>
            <VStack
              minW={12}
              borderRadius={4}
              my={2}
              justifyContent={"center"}
              alignItems="flex-start">
              <HStack space={2}>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    Б
                  </Text>
                  <Box
                    borderRadius={100}
                    borderColor={"indigo.200"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.proteins}
                    </Text>
                  </Box>
                </Box>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    Ж
                  </Text>
                  <Box
                    borderRadius={100}
                    borderColor={"indigo.200"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.fats}
                    </Text>
                  </Box>
                </Box>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    У
                  </Text>
                  <Box
                    borderRadius={100}
                    borderColor={"indigo.200"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.carbohydrates}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Box
            borderRadius={100}
            borderColor={"indigo.300"}
            borderWidth={2}
            mr={2}
            p={2}
            alignItems={"center"}
            justifyContent={"center"}
            w={20}
            h={20}>
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              textTransform={"uppercase"}>
              {item.energy}
            </Text>
            <Text textTransform={"uppercase"}>ккал</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FoodItem;
