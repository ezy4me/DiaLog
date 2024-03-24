import { Box, Center, Heading, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PatientInsulinListItem from "./PatientInsulinDosageItem";

const PatientInsulinDosageList = ({ data }: any) => {
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
      ) : (
        <Box>
          <Heading size={"sm"} p={4} borderRadius={16}>
            Инъекции инсулина
          </Heading>
          {data &&
            data.map((item: any) => (
              <PatientInsulinListItem key={item.id} item={item} />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default PatientInsulinDosageList;
