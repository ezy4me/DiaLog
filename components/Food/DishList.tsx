import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Spinner,
  FlatList,
  Input,
  Pressable,
  Icon,
  HStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useDishStore from "@/app/store/dishStore";
import DishItem from "./DishItem";
import { DishModalForm } from "./DishModalForm";

const DishList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { dishes, getDishes } = useDishStore((state) => ({
    dishes: state.dishesData || [],
    getDishes: state.getDishes,
  }));

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(dishes)) return [];
    return dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dishes, searchTerm]);

  const fetchData = useMemo(
    () => async () => {
      await getDishes();
    },
    [getDishes]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeModal = useMemo(
    () => () => {
      setIsAddOpen(false);
    },
    []
  );

  const handleAddDish = useMemo(
    () => () => {
      fetchData();
    },
    [fetchData]
  );

  const handleEditDish = useMemo(
    () => () => {
      fetchData();
    },
    [fetchData]
  );

  return (
    <Box mb={20} w={"full"}>
      <HStack
        mb={2}
        w={"full"}
        space={2}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Input
          w={72}
          InputRightElement={
            <Pressable onPress={() => setSearchTerm("")}>
              <Icon
                as={<MaterialCommunityIcons name="close" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          variant="rounded"
          placeholder="Поиск"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <DishModalForm
          callBack={handleAddDish}
          label={false}
          edit={false}
          isModalVisible={isAddOpen}
          onClose={closeModal}
        />
      </HStack>

      {dishes.length === 0 ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          mb={32}
          w="100%"
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DishItem callBack={handleEditDish} key={item.id} item={item} />
          )}
        />
      )}
    </Box>
  );
};

export default DishList;
