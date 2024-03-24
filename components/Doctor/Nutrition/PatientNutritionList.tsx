import { Box, Center, Heading, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PatientNutritionItem from "./PatientNutritionItem";

const PatientNutritionList = ({ data }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Heading size={"sm"} p={4} borderRadius={16}>
        Питание
      </Heading>
      {data && data.length === 0 ? (
        <Center py={2}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "#525252" : "white"}
          />
        </Center>
      ) : data ? (
        <Box>
          {data.map((item: any) => (
            <PatientNutritionItem key={item.id} item={item} />
          ))}
        </Box>
      ) : (
        <Center py={2}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "#525252" : "white"}
          />
        </Center>
      )}
    </Box>
  );
};
export default PatientNutritionList;
