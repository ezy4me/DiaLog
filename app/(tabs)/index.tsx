import { Text, VStack, Box, ScrollView, HStack } from "native-base";
import React from "react";

const Page = () => {
  return (
    <ScrollView>
      <VStack alignItems="center" space="2.5" mt="4" px="4">
        <ScrollView horizontal>
          <HStack space={3}>
            <Box
              bg={"blue.100"}
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
              bg={"amber.100"}
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
              bg={"green.100"}
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
/* <Box borderRadius={8} py={4} px={16} bg="indigo.500">
        <Link style={{ color: "white" }} href={"/(modals)/login"}>
          Войти
        </Link>
      </Box>
      <Box borderRadius={8} py={4} px={16} bg="indigo.500">
        <Link style={{ color: "white" }} href={"/(modals)/diary"}>
          Мой дневник
        </Link>
      </Box>
      <Box borderRadius={8} py={4} px={16} bg="indigo.500">
        <Link style={{ color: "white" }} href={"/(modals)/bookInfo"}>
          Про диабет
        </Link>
      </Box> */
