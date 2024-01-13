import { GlucoseModalForm } from "@/components/GlucoseModalForm";
import { InsulinModalForm } from "@/components/InsulinModalForm";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Text,
  VStack,
  Box,
  ScrollView,
  HStack,
  Heading,
  Button,
  Modal,
  FormControl,
  Input,
  View,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

const Page = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);

  const navigateToPage = (route: any) => {
    router.push(route);
  };

  return (
    <ScrollView bg={"white"} maxH={"100%"}>
      <VStack space="2.5" mt="4" px="4">
        <HStack
          p={2}
          w={"100%"}
          bg={"indigo.400"}
          borderRadius={16}
          justifyContent={"space-between"}>
          <VStack
            pl={1}
            w={24}
            space={2}
            bg={"indigo.300"}
            justifyContent={"center"}>
            <HStack space={2}>
              <MaterialCommunityIcons name="cube" size={16} color="black" />
              <Text fontSize={"sm"}>Глюкоза</Text>
            </HStack>
            <HStack space={2}>
              <MaterialIcons name="donut-small" size={16} color="black" />
              <Text fontSize={"sm"}>mmol/l</Text>
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
            bg={"indigo.300"}
            space={2}
            justifyContent={"center"}>
            <HStack space={2}>
              <MaterialCommunityIcons
                name="nutrition"
                size={16}
                color="black"
              />
              <Text fontSize={"sm"}>Еда</Text>
            </HStack>
            <HStack space={2}>
              <MaterialIcons name="donut-small" size={16} color="black" />
              <Text fontSize={"sm"}>kcal</Text>
            </HStack>
          </VStack>
        </HStack>

        <Heading size={"sm"} p={4} bg={"indigo.100"} borderRadius={16}>
          Последние действия
        </Heading>

        <Box
          borderWidth={1}
          borderRadius={16}
          borderColor="muted.100"
          bg={{
            linearGradient: {
              colors: ["white", "indigo.50"],
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
          borderWidth={1}
          borderRadius={16}
          borderColor="muted.100"
          bg={{
            linearGradient: {
              colors: ["white", "indigo.50"],
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

        <TouchableOpacity onPress={() => navigateToPage("/(modals)/aboutApp")}>
          <Text color={"indigo.400"}>О приложении</Text>
        </TouchableOpacity>
      </VStack>
    </ScrollView>
  );
};

export default Page;
