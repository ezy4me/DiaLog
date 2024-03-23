import BloodSugarList from "@/components/BloodSugar/BloodSugarList";
import InsulinDosageList from "@/components/Insulin/InsulinDosageList";
import { BloodSugarChart } from "@/components/BloodSugar/BloodSugarChart";
import DiaryControls from "@/components/Diary/DiaryControls";
import { Stack, VStack, Box, View } from "native-base";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { InsulinDosageChart } from "@/components/Insulin/InsulinDosageChart";
import NutritionList from "@/components/Nutrition/NutritionList";
import { NutritionChart } from "@/components/Nutrition/NutritionChart";
import useBloodSugarStore from "../store/bloodSugarStore";
import useInsulinDosageStore from "../store/insulinDosageStore";
import useAuthStore from "../store/authStore";
import useNutritionStore from "../store/nutritionStore";
import convertToISODate from "@/utils/convertToISODate";
import getCurrentDate from "@/utils/getCurrentDate";

const Page = () => {
  const screenHeight = Dimensions.get("window").height;
  const [dataType, setDataType] = useState("glucose");
  const user = useAuthStore((state) => state.user);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  const [loading, setLoading] = useState<boolean>(true);

  const { bloodSugarData, getBloodSugar } = useBloodSugarStore((state) => ({
    bloodSugarData: state.bloodSugarData,
    getBloodSugar: state.getBloodSugar,
  }));

  const { insulinDosageData, getInsulinDosage } = useInsulinDosageStore(
    (state) => ({
      insulinDosageData: state.insulinDosageData,
      getInsulinDosage: state.getInsulinDosage,
    })
  );

  const { data: nutritionData, getNutrition } = useNutritionStore((state) => ({
    data: state.nutrition,
    getNutrition: state.getNutrition,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let date = convertToISODate(selectedDate, "00:00:00");
      await getBloodSugar(user.id, date);
      await getInsulinDosage(user.id, date);
      await getNutrition(user.id, date);

      setLoading(false);
    };
    fetchData();
  }, []);

  let dataListComponent;
  let chartComponent;

  switch (dataType) {
    case "glucose":
      dataListComponent = <BloodSugarList data={bloodSugarData} />;
      chartComponent = <BloodSugarChart data={bloodSugarData} />;
      break;
    case "insulin":
      dataListComponent = <InsulinDosageList data={insulinDosageData} />;
      chartComponent = <InsulinDosageChart data={insulinDosageData} />;
      break;
    case "food":
      dataListComponent = <NutritionList data={nutritionData} />;
      chartComponent = <NutritionChart data={nutritionData} />;
      break;
    default:
      dataListComponent = null;
  }

  const onDateChange = async (date: any) => {
    if (dataType === "glucose")
      await getBloodSugar(
        user.id,
        convertToISODate(getCurrentDate(date), "00:00:00")
      );
    if (dataType === "insulin")
      await getInsulinDosage(
        user.id,
        convertToISODate(getCurrentDate(date), "00:00:00")
      );
    if (dataType === "food")
      await getNutrition(
        user.id,
        convertToISODate(getCurrentDate(date), "00:00:00")
      );
    setSelectedDate(getCurrentDate(date));
  };

  return (
    <VStack>
      <Stack
        borderRadius={0}
        _light={{ bg: "blueGray.200" }}
        _dark={{ bg: "coolGray.900" }}>
        {!loading ? (
          <Box px="4">{chartComponent}</Box>
        ) : (
          <View style={{ width: "100%", height: 255 }} />
        )}
        <DiaryControls
          onSelectedDateChange={onDateChange}
          onDataTypeChange={setDataType}
        />
        <Box
          _light={{ bg: "light.100" }}
          _dark={{ bg: "coolGray.900" }}
          h={screenHeight - 340}>
          {dataListComponent}
        </Box>
      </Stack>
    </VStack>
  );
};

export default Page;
