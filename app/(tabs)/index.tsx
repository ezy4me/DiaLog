import { GlucoseModalForm } from "@/components/GlucoseModalForm";
import { InsulinModalForm } from "@/components/InsulinModalForm";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Text,
  VStack,
  Box,
  ScrollView,
  HStack,
  Heading,
  Stack,
  useColorMode,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

const Page = () => {
  const { colorMode } = useColorMode();

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" p="4">
        <Stack
          p={2}
          flexDirection={"row"}
          w={"100%"}
          borderRadius={16}
          justifyContent={"space-between"}>
          <VStack
            pl={1}
            w={24}
            space={2}
            bg={"blueGray.500"}
            justifyContent={"center"}>
            <HStack space={1}>
              <MaterialCommunityIcons name="cube" size={16} color="black" />
              <Text fontSize={"sm"}>Глюкоза</Text>
            </HStack>
            <HStack space={1}>
              <MaterialIcons name="donut-small" size={16} color="black" />
              <Text fontSize={"sm"}>0 mmol/l</Text>
            </HStack>
          </VStack>
          <Box
            borderRadius={100}
            bg={{
              linearGradient: {
                colors: ["indigo.500", "indigo.600"],
                start: [0, 0],
                end: [1, 1],
              },
            }}
            alignItems={"center"}
            justifyContent={"center"}
            w={32}
            h={32}>
            <FontAwesome name="question" size={48} color="white" />
          </Box>
          <VStack
            pl={1}
            w={24}
            bg={"blueGray.500"}
            space={2}
            justifyContent={"center"}>
            <HStack space={1}>
              <MaterialCommunityIcons
                name="nutrition"
                size={16}
                color="black"
              />
              <Text fontSize={"sm"}>Еда</Text>
            </HStack>
            <HStack space={1} flexWrap={"wrap"}>
              <MaterialIcons name="donut-small" size={16} color="black" />
              <Text fontSize={"sm"}> 0 kcal</Text>
            </HStack>
          </VStack>
        </Stack>

        <Heading size={"sm"} p={4} borderRadius={16}>
          Последние действия:
        </Heading>

        <Box
          bg={{
            linearGradient: {
              colors:
                colorMode == "light"
                  ? ["white", "blueGray.200"]
                  : ["blueGray.500", "blueGray.600"],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          p={4}>
          <HStack justifyContent={"space-between"}>
            <Fontisto name="blood-drop" size={24} color="black" />
            <Text>5.6 mmol/l</Text>
            <Text fontWeight={"semibold"}>31.12</Text>
          </HStack>
        </Box>
        <Box
          bg={{
            linearGradient: {
              colors:
                colorMode == "light"
                  ? ["white", "blueGray.200"]
                  : ["blueGray.500", "blueGray.600"],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          p={4}>
          <HStack justifyContent={"space-between"}>
            <FontAwesome5 name="syringe" size={24} color="black" />
            <Text>100 ml</Text>
            <Text fontWeight={"semibold"}>31.12</Text>
          </HStack>
        </Box>

        <GlucoseModalForm />
        <InsulinModalForm />
      </VStack>
    </ScrollView>
  );
};

export default Page;
