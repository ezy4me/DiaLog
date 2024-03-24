import { Box, VStack, useColorMode } from "native-base";
import { useState } from "react";
import CustomStepper from "../UI/CustomStepper";
import { MainScreen } from "@/components/StartUp/MainScreen";
import { LoginScreen } from "@/components/StartUp/LoginScreen";
import { BloodSugarScreen } from "@/components/StartUp/BloodSugarScreen";
import { NutritionScreen } from "@/components/StartUp/NutritionScreen";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <Box key={0}>
      <MainScreen />
    </Box>,
    <Box key={1}>
      <LoginScreen />
    </Box>,
    <Box key={2}>
      <BloodSugarScreen />
    </Box>,
    <Box key={3}>
      <NutritionScreen />
    </Box>,
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <VStack
      _light={{ bg: "light.100" }}
      _dark={{ bg: "coolGray.900" }}
      flex={1}
      py={8}
      px={4}
      borderRadius={0}
      alignItems={"center"}
      justifyContent={"space-between"}>
      <Box>{steps[currentStep]}</Box>
      <Box>
        <CustomStepper
          steps={steps}
          currentIndex={currentStep}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </Box>
    </VStack>
  );
};

export default Page;
