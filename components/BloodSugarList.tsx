import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Spacer,
  VStack,
  Text,
  Heading,
  FlatList,
  Box,
  HStack,
  Button,
} from "native-base";

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
    normal: "#4ade80",
    low: "#facc15",
    high: "#f43f5e",
  };

  return (
    <Box>
      <Button borderRadius={32} colorScheme={"indigo"}>
        Добавить
      </Button>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            borderColor="muted.200"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Box
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={100}
                  borderWidth={2}
                  p={4}
                  borderColor={colorStatusStack[item.status]}>
                  <Text fontSize={18} color="dark.100" fontWeight={"semibold"}>
                    {item.value}
                  </Text>
                  <Text fontSize={14} color="dark.100" fontWeight={"semibold"}>
                    mmol/l
                  </Text>
                </Box>
              </VStack>
              <Box w={48} alignItems={"center"} justifyContent={"center"}>
                <Text textAlign={"center"} color="gray.600">
                  {item.text}
                </Text>
                <Text fontWeight={"bold"} color="gray.700">
                  {item.date}
                </Text>
              </Box>
              <Box alignItems={"center"} justifyContent={"center"}>
                <Button
                  colorScheme={"gray"}
                  borderRadius={100}
                  bg={"muted.100"}
                  size={"md"}
                  py={1}
                  _text={{
                    color: "#404040",
                  }}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="circle-edit-outline"
                      size={24}
                      color="#404040"
                    />
                  }
                />
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
