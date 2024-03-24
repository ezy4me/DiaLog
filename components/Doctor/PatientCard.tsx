import {
  Text,
  Stack,
  Container,
  HStack,
  Badge,
  useColorMode,
  Box,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import useDoctorStore from "@/app/store/doctorStore";
import { useRouter } from "expo-router";

const PatientCard = ({ patient }: any) => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const { setPatient } = useDoctorStore((state) => ({
    setPatient: state.setPatient,
  }));

  const handlePatientId = async () => {
    await setPatient(patient);
    router.push("/(modals)/doctor/patientInfo");
  };

  return (
    <TouchableOpacity
      key={patient.id}
      style={{ width: "100%" }}
      onPress={handlePatientId}>
      <Stack
        direction="row"
        alignItems={"center"}
        space={3}
        p={4}
        borderRadius={16}>
        <Box
          borderColor={colorMode == "light" ? "#525252" : "white"}
          borderWidth={1}
          p={2}
          borderRadius={100}>
          <FontAwesome
            name="user-circle"
            size={32}
            color={colorMode == "light" ? "#525252" : "white"}
          />
        </Box>

        <Container bg="transparent" flexDirection={"column"} w={"4/5"}>
          <Text fontSize={"md"} mb={2}>
            {patient.patient.profile.name}
          </Text>
          <HStack flexWrap={"wrap"}>
            <Badge
              bg={"indigo.500"}
              variant={"solid"}
              mb={1}
              mr={1}
              px={2}
              key={"height"}>
              {patient.patient.profile.height + " см"}
            </Badge>
            <Badge
              bg={"indigo.500"}
              variant={"solid"}
              mb={1}
              mr={1}
              px={2}
              key={"weight"}>
              {patient.patient.profile.weight + " кг"}
            </Badge>
            {patient.patient.profile.diabetesType && (
              <Badge
                bg={"indigo.500"}
                variant={"solid"}
                mb={1}
                mr={1}
                px={2}
                key={patient.patient.profile.diabetesType.name}>
                {patient.patient.profile.diabetesType.name}
              </Badge>
            )}
          </HStack>
        </Container>
      </Stack>
    </TouchableOpacity>
  );
};

export default PatientCard;
