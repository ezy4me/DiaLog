import { FlatList, Box, Spinner } from "native-base";
import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/authStore";
import NutritionItem from "./NutritionItem";
import useNutritionStore from "@/app/store/nutritionStore";

const NutritionList = () => {
  const { user } = useAuthStore();
  const { data, getNutrition } = useNutritionStore((state) => ({
    data: state.nutrition,
    getNutrition: state.getNutrition,
  }));

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await getNutrition(user.id);
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
            <NutritionItem key={item.id} item={item} />
          )}
          keyExtractor={(item: any) => item?.id}
        />
      )}
    </Box>
  );
};

export default NutritionList;
