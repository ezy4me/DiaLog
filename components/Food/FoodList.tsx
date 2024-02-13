import React, { useState, useEffect } from "react";
import {
  Box,
  Spinner,
  FlatList,
  Input,
  Pressable,
  Icon,
  useColorMode,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNutritionStore from "@/app/store/nutritionStore";
import FoodItem from "./FoodItem";

interface Food {
  id: number;
  name: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  energy: number;
}
const FoodList = () => {
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { food, getFood } = useNutritionStore((state) => ({
    food: state.food,
    getFood: state.getFood,
  }));

  useEffect(() => {
    getFood().then(() => setLoading(false));
  }, []);

  const filteredProducts = food?.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: any) => <FoodItem key={item.id} item={item} />}
        />
      )}
    </Box>
  );
};

export default FoodList;
