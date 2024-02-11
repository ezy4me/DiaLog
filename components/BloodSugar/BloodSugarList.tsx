import { FlatList, Box, Spinner } from "native-base";
import { useEffect, useState } from "react";
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import useAuthStore from "@/app/store/authStore";
import BloodSugarItem from "./BloodSugarItem";

const BloodSugarList = () => {
  const { user } = useAuthStore();
  const { data, getBloodSugar } = useBloodSugarStore((state) => ({
    data: state.bloodSugarData,
    getBloodSugar: state.getBloodSugar,
  }));

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await getBloodSugar(user.id);
    };
    fetchData().then(() => setLoading(false));
  }, [data?.length]);

  return (
    <Box mb={20}>
      {loading && data?.length == 0 ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          px={4}
          data={data}
          renderItem={({ item }: any) => (
            <BloodSugarItem key={item.id} item={item} />
          )}
          keyExtractor={(item: any) => item?.id}
        />
      )}
    </Box>
  );
};

export default BloodSugarList;
