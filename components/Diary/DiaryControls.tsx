import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Button, HStack, Select, useColorMode } from "native-base";
import GlucoseModalForm from "../BloodSugar/GlucoseModalForm";
import { useState } from "react";
import getCurrentDate from "@/utils/getCurrentDate";
import { CustomDatePicker } from "@/app/UI/CustomDatePicker";
import { InsulinModalForm } from "../Insulin/InsulinModalForm";
import { NutritionModalForm } from "../Nutrition/NutritionModalForm";

const DiaryControls = ({
  onDataTypeChange,
}: {
  onDataTypeChange: (dataType: string) => void;
}) => {
  const { colorMode } = useColorMode();

  const [type, setType] = useState<string>("glucose");
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleDateChange = (date: string) => {
    if (date) setSelectedDate(getCurrentDate(date));
  };

  const handleTypeChange = (type: string) => {
    setType(type);
    onDataTypeChange(type);
  };

  return (
    <>
      <HStack
        px={4}
        py={2}
        w={"100%"}
        bg={
          type == "glucose"
            ? "indigo.600"
            : type == "insulin"
            ? "amber.500"
            : "emerald.500"
        }
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
          onValueChange={(itemValue) => handleTypeChange(itemValue)}>
          <Select.Item borderRadius={16} label="Глюкоза" value="glucose" />
          <Select.Item borderRadius={16} label="Инсулин" value="insulin" />
          <Select.Item borderRadius={16} label="Питание" value="food" />
        </Select>

        {type === "glucose" && <GlucoseModalForm />}
        {type === "insulin" && <InsulinModalForm />}
        {type === "food" && <NutritionModalForm />}

        <Button
          w={40}
          p={2}
          colorScheme={
            type == "glucose"
              ? "indigo"
              : type == "insulin"
              ? "amber"
              : "emerald"
          }
          onPress={toggleDatePicker}
          borderRadius={100}
          rightIcon={<Entypo name="calendar" size={18} color={"white"} />}
          bg={
            type == "glucose"
              ? "indigo.700"
              : type == "insulin"
              ? "amber.600"
              : "emerald.600"
          }>
          {selectedDate}
        </Button>
      </HStack>
      {datePickerVisible && (
        <CustomDatePicker
          isOpen={datePickerVisible}
          onClose={toggleDatePicker}
          changeDate={handleDateChange}
        />
      )}
    </>
  );
};

export default DiaryControls;
