import getCurrentDate from "@/utils/getCurrentDate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  VStack,
  Text,
  FlatList,
  Box,
  HStack,
  Button,
  Select,
  useColorMode,
  Spinner,
} from "native-base";
import { useEffect, useState } from "react";
import { GlucoseModalForm } from "./GlucoseModalForm";
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import useAuthStore from "@/app/store/authStore";
import getCurrentTime from "@/utils/getCurrentTime";

const BloodSugarList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState("");

  const { colorMode } = useColorMode();
  const { user } = useAuthStore();
  const { data, getBloodSugar, deleteBloodSugar } = useBloodSugarStore(
    (state) => ({
      data: state.bloodSugarData,
      getBloodSugar: state.getBloodSugar,
      deleteBloodSugar: state.deleteBloodSugar,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      await getBloodSugar(user.id);
    };
    fetchData().then(() => setLoading(false));
  }, [data?.length]);

  const getColorStatusStack = (value: number): string[] => {
    if (value >= 7.8) {
      return ["#ef4444", "#dc2626"];
    } else if (value <= 3.9) {
      return ["#fbbf24", "#f59e0b"];
    } else {
      return ["#4ade80", "#4ade60"];
    }
  };

  const getTextStatusStack = (value: number): string => {
    if (value >= 7.8) {
      return "Высокий уровень сахара";
    } else if (value <= 3.9) {
      return "Низкий уровень сахара";
    } else {
      return "Уровень сахара в пределах нормы";
    }
  };

  const onHadleDelete = async (id: number) => {
    await deleteBloodSugar(id);
  };

  return (
    <Box mb={20}>
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
        <GlucoseModalForm />
        <Box w={32} p={2} borderRadius={12} bg={"indigo.500"}>
          <Text color={"white"} textAlign={"center"} fontWeight={"semibold"}>
            {getCurrentDate()}
          </Text>
        </Box>
      </HStack>

      {loading && data?.length == 0 ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          px={4}
          mb={2}
          data={data}
          renderItem={({ item }: any) => (
            <Box
              mt={2}
              borderRadius={16}
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
              p={1}>
              <HStack space={[2, 3]} px={1} justifyContent="space-between">
                <VStack borderRadius={100}>
                  <Box
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={100}
                    borderWidth={2}
                    borderColor={getColorStatusStack(item.value)}
                    p={4}>
                    <Text fontSize={18} fontWeight={"semibold"}>
                      {item.value}
                    </Text>
                    <Text fontSize={14} fontWeight={"semibold"}>
                      mmol/l
                    </Text>
                  </Box>
                </VStack>
                <Box w={32} alignItems={"center"} justifyContent={"center"}>
                  <Text textAlign={"center"}>
                    {getTextStatusStack(item.value)}
                  </Text>
                </Box>
                <VStack alignItems={"center"} justifyContent={"center"}>
                  <Button
                    onPress={() => onHadleDelete(item.id)}
                    colorScheme={"red"}
                    bg={"transparent"}
                    size={"md"}
                    py={1}
                    leftIcon={
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color={'#ef4444'}
                      />
                    }
                  />
                  <Text mt={2}>{getCurrentDate(item.date)}</Text>
                  <Text mt={2}>{getCurrentTime(item.time)}</Text>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item: any) => item?.id}
        />
      )}
    </Box>
  );
};

export default BloodSugarList;
