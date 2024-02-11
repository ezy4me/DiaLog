import { GlucoseModalForm } from "@/components/BloodSugar/GlucoseModalForm";
import { InsulinModalForm } from "@/components/Insulin/InsulinModalForm";
import { FoodModalForm } from "@/components/Food/FoodModalForm";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
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
  Divider,
} from "native-base";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import useAuthStore from "../store/authStore";

const Page = () => {
  const { colorMode } = useColorMode();

  const { user } = useAuthStore();

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" p="4">
        <HStack
          flexDirection={"row"}
          w={"100%"}
          space={4}
          borderRadius={16}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <VStack
            p={4}
            flex={1}
            space={2}
            bg={colorMode == "light" ? "indigo.50" : "blueGray.800"}
            justifyContent={"center"}>
            <HStack space={1} alignItems={"center"}>
              <MaterialCommunityIcons name="star" size={16} color={"#fde047"} />
              <Text fontSize={"sm"}>{user?.email}</Text>
            </HStack>

            <Divider bg={colorMode == "light" ? "dark.100" : "light.100"} />

            <HStack space={1} alignItems={"center"}>
              <Ionicons
                name="cube"
                size={16}
                color={colorMode == "light" ? "black" : "white"}
              />
              <Text fontSize={"sm"}>Глюкоза</Text>
            </HStack>
            <HStack pl={4} space={1} alignItems={"center"}>
              <Entypo
                name="dot-single"
                size={16}
                color={colorMode == "light" ? "black" : "white"}
              />
              <Text fontSize={"sm"}>0 mmol/l</Text>
            </HStack>

            <Divider bg={colorMode == "light" ? "dark.100" : "light.100"} />

            <HStack space={1} alignItems={"center"}>
              <Entypo
                name="bowl"
                size={16}
                color={colorMode == "light" ? "black" : "white"}
              />
              <Text fontSize={"sm"}>Еда</Text>
            </HStack>
            <HStack pl={4} space={1} alignItems={"center"}>
              <Entypo
                name="dot-single"
                size={16}
                color={colorMode == "light" ? "black" : "white"}
              />
              <Text fontSize={"sm"}> 0 kcal</Text>
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
            <FontAwesome name="user" size={48} color={"white"} />
          </Box>
        </HStack>

        <Heading size={"sm"} p={4} borderRadius={16}>
          Последние действия
        </Heading>

        <Box
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
          p={4}>
          <HStack justifyContent={"space-between"}>
            <Fontisto
              name="blood-drop"
              size={24}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text>5.6 mmol/l</Text>
            <Text fontWeight={"semibold"}>31.12</Text>
          </HStack>
        </Box>
        <Box
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
          p={4}>
          <HStack justifyContent={"space-between"}>
            <FontAwesome5
              name="syringe"
              size={24}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text>100 ml</Text>
            <Text fontWeight={"semibold"}>31.12</Text>
          </HStack>
        </Box>

        <GlucoseModalForm label={true} />
        <InsulinModalForm label={true} />
        <FoodModalForm label={true} />
      </VStack>
    </ScrollView>
  );
};

export default Page;
