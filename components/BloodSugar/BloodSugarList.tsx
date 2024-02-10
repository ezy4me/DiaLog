import getCurrentDate from "@/utils/getCurrentDate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  FlatList,
  Box,
  HStack,
  Select,
  useColorMode,
  Spinner,
} from "native-base";
import { useEffect, useState } from "react";
import { GlucoseModalForm } from "./GlucoseModalForm";
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import useAuthStore from "@/app/store/authStore";
import BloodSugarItem from "./BloodSugarItem";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";

const BloodSugarList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState("");

  const { colorMode } = useColorMode();
  const { user } = useAuthStore();
  const { data, getBloodSugar } = useBloodSugarStore((state) => ({
    data: state.bloodSugarData,
    getBloodSugar: state.getBloodSugar,
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getBloodSugar(user.id);
    };
    fetchData().then(() => setLoading(false));
  }, [data?.length]);

  return (
    <Box mb={20}>
      <HStack
        px={4}
        py={1}
        w={"100%"}
        bg={"indigo.600"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Select
          w={32}
          py={1}
          variant="rounded"
          selectedValue={type}
          placeholder="Глюкоза"
          dropdownIcon={
            <Box mr={2}>
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color={colorMode == "light" ? "#525252" : "white"}
              />
            </Box>
          }
          _selectedItem={{
            endIcon: (
              <MaterialCommunityIcons name="check" size={24} color="black" />
            ),
          }}
          onValueChange={(itemValue) => setType(itemValue)}>
          <Select.Item borderRadius={16} label="Глюкоза" value="1" />
          <Select.Item borderRadius={16} label="Инсулин" value="2" />
        </Select>
        <GlucoseModalForm />
        <Box w={32} p={2} borderRadius={12} bg={"indigo.500"}>
          <Text color={"white"} textAlign={"center"} fontWeight={"semibold"}>
            {getCurrentDate()}
          </Text>
        </Box>
      </HStack>

      {loading && data?.length == 0 ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          px={4}
          mb={2}
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
