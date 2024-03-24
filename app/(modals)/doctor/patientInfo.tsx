import useAuthStore from "@/app/store/authStore";
import useDoctorStore from "@/app/store/doctorStore";
import { CustomDatePicker } from "@/app/UI/CustomDatePicker";
import PatientBloodSugarList from "@/components/Doctor/BloodSugar/PatientBloodSugarList";
import PatientInsulinDosageList from "@/components/Doctor/InsulinDosage/PatientInsulinDosageList";
import PatientNutritionList from "@/components/Doctor/Nutrition/PatientNutritionList";
import convertToISODate from "@/utils/convertToISODate";
import getCurrentDate from "@/utils/getCurrentDate";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  Button,
  HStack,
  ScrollView,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";

const Page = () => {
  const { colorMode } = useColorMode();

  const { user } = useAuthStore();
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  const { patient, patientInfo, getPatientInfo } = useDoctorStore((state) => ({
    patient: state.patient,
    patientInfo: state.patientInfo,
    getPatientInfo: state.getPatientInfo,
  }));

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleDateChange = (date: string) => {
    if (date) {
      setSelectedDate(getCurrentDate(date));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPatientInfo(
        patient.patientId,
        convertToISODate(selectedDate, "00:00:00")
      );
    };
    fetchData();
    console.log(patientInfo);
  }, [selectedDate]);

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" p="4">
        <Stack
          px={4}
          py={2}
          w={"100%"}
          space={2}
          alignItems={"center"}
          direction={"column"}
          justifyContent={"space-between"}>
          <HStack
            w={"full"}
            space={2}
            alignItems={"center"}
            justifyContent={"start"}>
            <Ionicons
              name={"person"}
              size={64}
              color={colorMode == "light" ? "black" : "white"}
            />
            <VStack space={2}>
              <Text>{patient.patient.profile.name}</Text>
              <Text>{patient.patient.email}</Text>
            </VStack>
          </HStack>
          <HStack w={"full"} alignItems={"center"} justifyContent={"flex-end"}>
            <Button
              w={40}
              p={2}
              colorScheme={"indigo"}
              onPress={toggleDatePicker}
              borderRadius={100}
              rightIcon={<Entypo name="calendar" size={18} color={"white"} />}
              bg={"indigo.700"}>
              {selectedDate}
            </Button>
          </HStack>
        </Stack>
        {patientInfo && (
          <>
            <PatientBloodSugarList data={patientInfo?.bloodSugar} />
            <PatientInsulinDosageList data={patientInfo?.insulinDosage} />
            <PatientNutritionList data={patientInfo?.nutrition} />
          </>
        )}
        {datePickerVisible && (
          <CustomDatePicker
            isOpen={datePickerVisible}
            onClose={toggleDatePicker}
            changeDate={handleDateChange}
          />
        )}
      </VStack>
    </ScrollView>
  );
};

export default Page;
