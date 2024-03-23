import { FlatList, Box, Spinner, Center, useColorMode } from "native-base";
import InsulinDosageItem from "./InsulinDosageItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const InsulinDosageList = ({ data }: any) => {
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
            <InsulinDosageItem key={item.id} item={item} />
          )}
          keyExtractor={(item: any) => item?.id}
        />
      )}
    </Box>
  );
};

export default InsulinDosageList;
