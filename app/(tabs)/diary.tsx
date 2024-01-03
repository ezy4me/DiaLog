import { DiabetesChart } from "@/components/DiabetesChart";
import { Stack, VStack, ScrollView, Box } from "native-base";

const Page = () => {
  return (
    <ScrollView bg={"white"}>
      <VStack space="2.5" mt="4" px="4">
        <Stack direction="column" mb="2.5" mt="1.5" space={3}>
          <DiabetesChart />
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
