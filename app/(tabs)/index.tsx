import { useRouter } from "expo-router";
import { Text, VStack, Box, ScrollView, HStack, Heading } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

const Page = () => {
  const router = useRouter();

  const navigateToPage = (route: any) => {
    router.push(route);
  };
  
  return (
    <ScrollView bg={"white"}>
      <VStack space="2.5" mt="4" px="4">
        <Heading size={"sm"} p={4} bg={"blue.100"} borderRadius={16}>
          Последнее измерение
        </Heading>
        <Box
          mt={2}
          borderWidth={1}
          borderRadius={16}
          borderColor="muted.100"
          bg={{
            linearGradient: {
              colors: ["white", "blue.50"],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          p={4}>
          <HStack justifyContent={"space-between"}>
            <Text>5.6 mmol/l</Text>
            <Text fontWeight={"semibold"}>31.12</Text>
          </HStack>
        </Box>
        <Heading size={"sm"} p={4} bg={"blue.100"} borderRadius={16}>
          Норма сахара в крови
        </Heading>
        <ScrollView horizontal>
          <HStack space={3}>
            <Box
              borderWidth={1}
              borderColor="muted.100"
              borderRadius={16}
              bg={{
                linearGradient: {
                  colors: ["white", "indigo.50"],
                  start: [0, 0],
                  end: [1, 1],
                },
              }}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={6}
              px={4}>
              <Text w={72} textAlign={"center"} fontSize={"xl"}>
                Перед приемом пищи:
              </Text>
              <Text fontSize={18}>3,9-5,6 ммоль/л</Text>
            </Box>
            <Box
              borderWidth={1}
              borderColor="muted.100"
              borderRadius={16}
              bg={{
                linearGradient: {
                  colors: ["white", "indigo.50"],
                  start: [0, 0],
                  end: [1, 1],
                },
              }}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={6}
              px={4}>
              <Text w={72} textAlign={"center"} fontSize={"xl"}>
                После приема пищи (через 2 часа):
              </Text>
              <Text fontSize={18}>7,8 ммоль/л</Text>
            </Box>
            <Box
              borderWidth={1}
              borderColor="muted.100"
              borderRadius={16}
              bg={{
                linearGradient: {
                  colors: ["white", "indigo.50"],
                  start: [0, 0],
                  end: [1, 1],
                },
              }}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={6}
              px={4}>
              <Text w={72} textAlign={"center"} fontSize={"xl"}>
                Случайный показатель (в любое время дня):
              </Text>
              <Text fontSize={18}>7,0 ммоль/л</Text>
            </Box>
          </HStack>
        </ScrollView>
        <TouchableOpacity onPress={() => navigateToPage("/(modals)/aboutApp")}>
          <Text color={"blue.400"}>О приложении</Text>
        </TouchableOpacity>
      </VStack>
    </ScrollView>
  );
};

export default Page;
