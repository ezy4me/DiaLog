import { Box, Center, useColorMode, Heading } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PatientBloodSugarItem from "./PatientBloodSugarItem";

const PatientBloodSugarList = ({ data }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Heading size={"sm"} p={4} borderRadius={16}>
        Сахар в крови
      </Heading>
      {data && data.length === 0 ? (
        <Center py={2}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "#525252" : "white"}
          />
        </Center>
      ) : (
        <Box>
          {data &&
            data.map((item: any) => (
              <PatientBloodSugarItem key={item.id} item={item} />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default PatientBloodSugarList;
