import { FlatList, Box, Spinner, Center, useColorMode } from "native-base";
import NutritionItem from "./NutritionItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NutritionList = ({ data }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box mb={20}>
      {data?.length == 0 ? (
        <Center h={"full"}>
          <MaterialCommunityIcons
            name="database-clock"
            size={48}
            color={colorMode == "light" ? "black" : "white"}
          />
        </Center>
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
