import BloodSugarList from "@/components/BloodSugar/BloodSugarList";
import InsulinDosageList from "@/components/Insulin/InsulinDosageList";
import { BloodSugarChart } from "@/components/BloodSugar/BloodSugarChart";
import DiaryControls from "@/components/Diary/DiaryControls";
import { Stack, VStack, Box } from "native-base";
import { Dimensions } from "react-native";
import { useState } from "react";
import { InsulinDosageChart } from "@/components/Insulin/InsulinDosageChart";

const Page = () => {
  const screenHeight = Dimensions.get("window").height;
  const [dataType, setDataType] = useState("glucose");

  let dataListComponent;
  let chartComponent;

  switch (dataType) {
    case "glucose":
      dataListComponent = <BloodSugarList />;
      chartComponent = <BloodSugarChart/>
      break;
    case "insulin":
      dataListComponent = <InsulinDosageList />;
      chartComponent = <InsulinDosageChart/>
      break;
    case "food":
      // dataListComponent = <FoodList />;
      break;
    default:
      dataListComponent = null;
  }

  return (
    <VStack>
      <Stack
        borderRadius={0}
        _light={{ bg: "blueGray.200" }}
        _dark={{ bg: "coolGray.900" }}>
        <Box px="4">
          {chartComponent}
        </Box>
        <DiaryControls onDataTypeChange={setDataType} />
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
