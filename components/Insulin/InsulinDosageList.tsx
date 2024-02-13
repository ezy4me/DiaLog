import { FlatList, Box, Spinner } from "native-base";
import { useEffect, useState } from "react";
import useInsulinDosageStore from "@/app/store/insulinDosageStore";
import useAuthStore from "@/app/store/authStore";
import InsulinDosageItem from "./InsulinDosageItem";

const InsulinDosageList = () => {
  const { user } = useAuthStore();
  const { data, getInsulinDosage } = useInsulinDosageStore((state) => ({
    data: state.insulinDosageData,
    getInsulinDosage: state.getInsulinDosage,
  }));

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await getInsulinDosage(user.id);
    };
    fetchData().then(() => setLoading(false));
  }, [data?.length]);

  return (
    <Box mb={20}>
      {loading && data?.length == 0 ? (
        <Spinner mt={4} size="lg" color={"amber.500"} />
      ) : (
        <FlatList
          px={4}
          data={data}
          renderItem={({ item }: any) => (
            <InsulinDosageItem key={item.id} item={item} />
          )}
          keyExtractor={(item: any) => item?.id}
        />
      )}
    </Box>
  );
};

export default InsulinDosageList;
