import {
  VStack,
  ScrollView,
  Button,
  Input,
  Box,
  useColorMode,
} from "native-base";
import useDoctorStore from "../store/doctorStore";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import PatientCard from "@/components/Doctor/PatientCard";
import { FontAwesome } from "@expo/vector-icons";

const Page = () => {
  const { colorMode } = useColorMode();

  const { user } = useAuthStore();
  const [token, setToken] = useState<string>("");

  const { patients, getPatients, addPatient } = useDoctorStore((state) => ({
    patients: state.patients,
    getPatients: state.getPatients,
    addPatient: state.addPatient,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getPatients(user?.id);
    };
    fetchData();
  }, [user]);

  const onAddPatient = async () => {
    await addPatient(user?.id, token);
    setToken("");
    await getPatients(user?.id);
  };

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" p="4">
        <Input
          variant="rounded"
          placeholder="access token"
          value={token}
          onChangeText={setToken}
          rightElement={
            <Box
              borderLeftWidth={1}
              borderLeftColor={"muted.200"}
              p={2}
              borderRadius={16}
              children={
                <FontAwesome
                  name="user-circle"
                  size={18}
                  color={colorMode == "light" ? "#525252" : "white"}
                />
              }
            />
          }
        />
        <Button borderRadius={100} colorScheme="indigo" onPress={onAddPatient}>
          Добавить
        </Button>
        {patients?.length > 0 &&
          patients.map((p: any) => <PatientCard key={p.id} patient={p} />)}
      </VStack>
    </ScrollView>
  );
};

export default Page;
