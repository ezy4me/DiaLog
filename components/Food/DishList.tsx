import React, { useState, useEffect } from "react";
import {
  Box,
  Spinner,
  FlatList,
  Input,
  Pressable,
  Icon,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useDishStore from "@/app/store/dishStore";
import DishItem from "./DishItem";

const DishList = () => {

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { dishes, getDishes } = useDishStore((state) => ({
    dishes: state.dishesData,
    getDishes: state.getDishes,
  }));

  useEffect(() => {
    getDishes().then(() => setLoading(false));
  }, []);

  const filteredProducts = dishes?.filter((dish: any) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box mb={20} w={"full"}>
      <Input
        mb={2}
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
      {loading ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          mb={32}
          w="100%"
          data={filteredProducts}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => <DishItem key={item.id} item={item} />}
        />
      )}
    </Box>
  );
};

export default DishList;
