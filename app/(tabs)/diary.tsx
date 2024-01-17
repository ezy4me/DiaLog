import BloodSugarList from "@/components/BloodSugarList";
import { DiabetesChart } from "@/components/DiabetesChart";
import { Stack, VStack, Box } from "native-base";
import { Dimensions } from "react-native";

const Page = () => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <VStack>
      <Stack borderRadius={0}>
        <Box px="4">
          <DiabetesChart />
        </Box>
        <Box
          _light={{ bg: "light.100" }}
          _dark={{ bg: "coolGray.800" }}
          h={screenHeight - 340}>
          <BloodSugarList />
        </Box>
      </Stack>
    </VStack>
  );
};

export default Page;
