import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Spinner,
  FlatList,
  Input,
  Pressable,
  Icon,
  useColorMode,
  HStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNutritionStore from "@/app/store/nutritionStore";
import FoodItem from "./FoodItem";

const FoodList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const { food, getFood } = useNutritionStore((state) => ({
    food: state.food,
    getFood: state.getFood,
  }));

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(food)) return [];
    return food.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [food, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await getFood();
    } catch (error) {
      console.error("Error fetching food:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <Box mb={20} w="full">
      <HStack
        mb={2}
        w="full"
        space={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Input
          w={72}
          InputRightElement={
            <Pressable onPress={handleClearSearchTerm}>
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
          onChangeText={setSearchTerm}
        />
      </HStack>
      {loading ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
        <FlatList
          mb={32}
          w="100%"
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FoodItem key={item.id} item={item} />}
        />
      )}
    </Box>
  );
};

export default FoodList;
