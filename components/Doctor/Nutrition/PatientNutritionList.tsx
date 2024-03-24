import { Box, Center, Heading, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PatientNutritionItem from "./PatientNutritionItem";

const PatientNutritionList = ({ data }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      {data && data.length === 0 ? (
        <Center h={"full"}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "black" : "white"}
          />
        </Center>
      ) : data ? (
        <Box>
          <Heading size={"sm"} p={4} borderRadius={16}>
            Питание
          </Heading>
          {data.map((item: any) => (
            <PatientNutritionItem key={item.id} item={item} />
          ))}
        </Box>
      ) : (
        <Center h={"full"}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "black" : "white"}
          />
        </Center>
      )}
    </Box>
  );
};
export default PatientNutritionList;
