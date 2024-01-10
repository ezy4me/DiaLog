import { Text, VStack, Box, ScrollView, HStack, Heading } from "native-base";
import React from "react";

const Page = () => {
  return (
    <ScrollView bg={"white"}>
      <VStack space="2.5" mt="4" px="4">
        <Heading>Последнее измерение</Heading>
        <Box
          mt={2}
          borderWidth={1}
          borderRadius={16}
          borderColor="muted.100"
          bg={{
            linearGradient: {
              colors: ["white", "light.50"],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          p={4}>
          <HStack justifyContent={'space-between'}>
            <Text>5.6 mmol/l</Text>
            <Text fontWeight={'semibold'}>31.12</Text>
          </HStack>
        </Box>
        <Heading>Норма сахара в крови</Heading>
        <ScrollView horizontal>
          <HStack space={3}>
            <Box
              bg={"indigo.100"}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={6}
              px={4}
              borderRadius={16}>
              <Text w={72} textAlign={"center"} fontSize={"xl"}>
                Перед приемом пищи:
              </Text>
              <Text fontSize={"md"}>3,9-5,6 ммоль/л</Text>
            </Box>
            <Box
              bg={"blue.100"}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={6}
              px={4}
              borderRadius={16}>
              <Text w={72} textAlign={"center"} fontSize={"xl"}>
                После приема пищи (через 2 часа):
              </Text>
              <Text fontSize={"md"}>7,8 ммоль/л</Text>
            </Box>
            <Box
              bg={"indigo.100"}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={6}
              px={4}
              borderRadius={16}>
              <Text w={72} textAlign={"center"} fontSize={"xl"}>
                Случайный показатель (в любое время дня):
              </Text>
              <Text fontSize={"md"}>7,0 ммоль/л</Text>
            </Box>
          </HStack>
        </ScrollView>
      </VStack>
    </ScrollView>
  );
};

export default Page;
