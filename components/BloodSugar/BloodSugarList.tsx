import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  Box,
  HStack,
  Select,
  useColorMode,
  Spinner,
  Button,
} from "native-base";
import { useEffect, useState } from "react";
import { GlucoseModalForm } from "./GlucoseModalForm";
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import useAuthStore from "@/app/store/authStore";
import BloodSugarItem from "./BloodSugarItem";
import { CustomDatePicker } from "@/app/UI/CustomDatePicker";
import getCurrentDate from "@/utils/getCurrentDate";

const BloodSugarList = () => {
  const { colorMode } = useColorMode();
  const { user } = useAuthStore();
  const { data, getBloodSugar } = useBloodSugarStore((state) => ({
    data: state.bloodSugarData,
    getBloodSugar: state.getBloodSugar,
  }));

  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("");
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleDateChange = (date: string) => {
    if (date) setSelectedDate(getCurrentDate(date));
  };

  useEffect(() => {
    const fetchData = async () => {
      await getBloodSugar(user.id);
    };
    fetchData().then(() => setLoading(false));
  }, [data?.length]);

  return (
    <Box mb={20}>
      <HStack
        px={4}
        py={2}
        w={"100%"}
        bg={"indigo.600"}
        space={2}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Select
          w={40}
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

        <Button
          w={40}
          p={2}
          colorScheme={"indigo"}
          onPress={toggleDatePicker}
          borderRadius={100}
          rightIcon={<Entypo name="calendar" size={18} color={"white"} />}
          bg={"indigo.500"}>
          {selectedDate}
        </Button>
      </HStack>

      {loading && data?.length == 0 ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          px={4}
          data={data}
          renderItem={({ item }: any) => (
            <BloodSugarItem key={item.id} item={item} />
          )}
          keyExtractor={(item: any) => item?.id}
        />
      )}

      {datePickerVisible && (
        <CustomDatePicker
          isOpen={datePickerVisible}
          onClose={toggleDatePicker}
          changeDate={handleDateChange}
        />
      )}
    </Box>
  );
};

export default BloodSugarList;
