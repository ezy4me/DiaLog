import { Box, Spinner, Center, useColorMode, Heading } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PatientBloodSugarItem from "./PatientBloodSugarItem";

const PatientBloodSugarList = ({ data }: any) => {
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
            Сахар в крови
          </Heading>
          {data && data.map((item: any) => (
            <PatientBloodSugarItem key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PatientBloodSugarList;
