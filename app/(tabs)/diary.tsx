import BloodSugarList from "@/components/BloodSugarList";
import { DiabetesChart } from "@/components/DiabetesChart";
import { Stack, VStack, Box } from "native-base";
import { Dimensions } from "react-native";

const Page = () => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <VStack bg={"white"} >
      <Stack>
        <Box px="4">
          <DiabetesChart />
        </Box>
        <Box px="4"  bg={'indigo.300'} h={screenHeight - 340}>
          <BloodSugarList />
        </Box>
      </Stack>
    </VStack>
  );
};

export default Page;
