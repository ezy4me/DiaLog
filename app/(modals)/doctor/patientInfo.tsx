import useAuthStore from "@/app/store/authStore";
import useDoctorStore from "@/app/store/doctorStore";
import { CustomDatePicker } from "@/app/UI/CustomDatePicker";
import ConfirmAllert from "@/components/Allerts/ConfirmAllert";
import PatientBloodSugarList from "@/components/Doctor/BloodSugar/PatientBloodSugarList";
import PatientInsulinDosageList from "@/components/Doctor/InsulinDosage/PatientInsulinDosageList";
import PatientNutritionList from "@/components/Doctor/Nutrition/PatientNutritionList";
import convertToISODate from "@/utils/convertToISODate";
import getCurrentDate from "@/utils/getCurrentDate";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Button,
  Divider,
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
  const router = useRouter();

  const { user } = useAuthStore();

  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { patient, patientInfo, getPatientInfo, deletePatient } =
    useDoctorStore((state) => ({
      patient: state.patient,
      patientInfo: state.patientInfo,
      getPatientInfo: state.getPatientInfo,
      deletePatient: state.deletePatient,
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
  }, [selectedDate]);

  const navigateToPage = (route: any) => {
    router.push(route);
  };

  const onHandleDelete = async () => {
    setIsAlertOpen(true);
  };

  const onDeleteConfirmed = async () => {
    await deletePatient(user.id, patient.patientId);
    navigateToPage('(tabs)/patients')
    setIsAlertOpen(false);
  };

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" p="4">
        <Stack
          px={2}
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
            <FontAwesome
              name="user-circle"
              size={64}
              color={colorMode == "light" ? "#525252" : "white"}
            />
            <VStack space={2}>
              <Text>{patient.patient.profile.name}</Text>
              <Divider />
              <Text>{patient.patient.email}</Text>
            </VStack>
          </HStack>
          <Divider />
          <HStack
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Button
              w={20}
              p={2}
              colorScheme={"indigo"}
              onPress={() => navigateToPage("/(modals)/chat/chat")}
              borderRadius={100}
              rightIcon={
                <Ionicons name="chatbubble-ellipses" size={18} color="white" />
              }
              bg={"indigo.700"}
            />
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
            <Button
              onPress={() => onHandleDelete()}
              colorScheme={"red"}
              bg={"transparent"}
              borderRadius={100}
              py={1}
              leftIcon={
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color={"#ef4444"}
                />
              }
            />
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
      <ConfirmAllert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={onDeleteConfirmed}
      />
    </ScrollView>
  );
};

export default Page;
