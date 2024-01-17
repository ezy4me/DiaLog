import getCurrentDate from "@/utils/getCurrentDate";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  VStack,
  Text,
  FlatList,
  Box,
  HStack,
  Button,
  Select,
  useColorMode,
} from "native-base";
import { useState } from "react";
import { GlucoseModalForm } from "./GlucoseModalForm";

const BloodSugarList = () => {
  const data = [
    {
      id: "1",
      date: "29.12",
      value: "4.2",
      status: "normal",
      text: "Уровень сахара в пределах нормы",
    },
    {
      id: "2",
      date: "30.12",
      value: "5.5",
      status: "high",
      text: "Высокий уровень сахара",
    },
    {
      id: "3",
      date: "31.12",
      value: "3.7",
      status: "low",
      text: "Низкий уровень сахара",
    },
    {
      id: "4",
      date: "1.1",
      value: "6.2",
      status: "high",
      text: "Высокий уровень сахара",
    },
    {
      id: "5",
      date: "2.1",
      value: "3.2",
      status: "low",
      text: "Низкий уровень сахара",
    },
  ];

  const colorStatusStack: any = {
    normal: ["#4ade80", "#4ade60"],
    low: ["#fbbf24", "#f59e0b"],
    high: ["#ef4444", "#dc2626"],
  };

  const router = useRouter();

  const navigateToPage = (route: any) => {
    router.push(route);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");

  const { colorMode } = useColorMode();


  return (
    <Box mb={20}>
      {/* <Button
        onPress={() => navigateToPage("/(modals)/addBloodSugar")}
        borderRadius={32}
        colorScheme={"indigo"}>
        Добавить
      </Button> */}
      <HStack
        px={4}
        py={1}
        w={"100%"}
        bg={"indigo.600"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Select
          w={32}
          py={1}
          variant="rounded"
          selectedValue={type}
          placeholder="Глюкоза"
          dropdownIcon={
            <Box mr={2}>
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color={colorMode == "light" ? "#525252" : "white"}
              />
            </Box>
          }
          _selectedItem={{
            endIcon: (
              <MaterialCommunityIcons name="check" size={24} color="black" />
            ),
          }}
          onValueChange={(itemValue) => setType(itemValue)}>
          <Select.Item borderRadius={16} label="Глюкоза" value="1" />
          <Select.Item borderRadius={16} label="Инсулин" value="2" />
        </Select>
        <GlucoseModalForm/>
        <Box w={32} p={2} borderRadius={12} bg={"indigo.500"}>
          <Text color={"white"} textAlign={"center"} fontWeight={"semibold"}>
            {getCurrentDate()}
          </Text>
        </Box>
      </HStack>

      <FlatList
        px={4}
        data={data}
        renderItem={({ item }) => (
          <Box
            mt={2}
            borderRadius={16}
            bg={{
              linearGradient: {
                colors:
                colorMode == "light"
                  ? ["blueGray.100", "blueGray.200"]
                  : ["blueGray.600", "blueGray.700"],
                start: [0, 0],
                end: [1, 1],
              },
            }}
            p={1}>
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack borderRadius={100}>
                <Box
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={100}
                  borderWidth={2}
                  borderColor={"transparent"}
                  p={4}
                  bg={{
                    linearGradient: {
                      colors: [...colorStatusStack[item.status]],
                      start: [0.2, 0.2],
                      end: [1, 0.5],
                    },
                  }}>
                  <Text fontSize={18} fontWeight={"semibold"}>
                    {item.value}
                  </Text>
                  <Text fontSize={14} fontWeight={"semibold"}>
                    mmol/l
                  </Text>
                </Box>
              </VStack>
              <Box w={48} alignItems={"center"} justifyContent={"center"}>
                <Text textAlign={"center"}>
                  {item.text}
                </Text>
              </Box>
              <Box alignItems={"center"} justifyContent={"center"}>
                <Button
                  colorScheme={""}
                  bg={"transparent"}
                  size={"md"}
                  py={1}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="circle-edit-outline"
                      size={24}
                      color={colorMode == 'light' ? 'black' : 'white'}
                    />
                  }
                />
                <Text mt={2} fontWeight={"bold"}>
                  {item.date}
                </Text>
              </Box>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default BloodSugarList;
