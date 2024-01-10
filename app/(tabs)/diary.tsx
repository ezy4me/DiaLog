import BloodSugarList from "@/components/BloodSugarList";
import { DiabetesChart } from "@/components/DiabetesChart";
import { Stack, VStack, Box } from "native-base";
import { Dimensions } from "react-native";

const Page = () => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <VStack bg={"white"} px="4">
      <Stack>
        <Box>
          <DiabetesChart />
        </Box>
        <Box h={screenHeight - 300}>
          <BloodSugarList />
        </Box>
      </Stack>
    </VStack>
  );
};

export default Page;
