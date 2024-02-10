import BloodSugarList from "@/components/BloodSugar/BloodSugarList";
import { DiabetesChart } from "@/components/BloodSugar/DiabetesChart";
import { Stack, VStack, Box } from "native-base";
import { Dimensions } from "react-native";

const Page = () => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <VStack>
      <Stack
        borderRadius={0}
        _light={{ bg: "blueGray.200" }}
        _dark={{ bg: "coolGray.900" }}>
        <Box px="4">
          <DiabetesChart />
        </Box>
        <Box
          _light={{ bg: "light.100" }}
          _dark={{ bg: "coolGray.900" }}
          h={screenHeight - 340}>
          <BloodSugarList />
        </Box>
      </Stack>
    </VStack>
  );
};

export default Page;
