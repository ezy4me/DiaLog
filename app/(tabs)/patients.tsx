import { VStack, ScrollView } from "native-base";
import useDoctorStore from "../store/doctorStore";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import PatientCard from "@/components/Doctor/PatientCard";

const Page = () => {
  const { user } = useAuthStore();

  const { patients, getPatients } = useDoctorStore((state) => ({
    patients: state.patients,
    getPatients: state.getPatients,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getPatients(user?.id);
    };
    
    fetchData();
  }, [user]);

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" p="4">
        {patients?.length > 0 &&
          patients.map((p: any) => <PatientCard key={p.id} patient={p} />)}
      </VStack>
    </ScrollView>
  );
};

export default Page;
