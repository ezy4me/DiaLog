import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Spinner,
  VStack,
  FlatList,
  Input,
  Pressable,
  Icon,
  useColorMode,
  Stack,
  Button,
} from "native-base";
import data from "products.json";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useNutritionStore from "../store/nutritionStore";

interface Food {
  id: number;
  name: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  energy: number;
}

const Page = () => {
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

  const renderItem = ({ item }: { item: Food }) => (
    <Box
      borderRadius={16}
      w="100%"
      bg={{
        linearGradient: {
          colors:
            colorMode == "light"
              ? ["white", "white"]
              : ["blueGray.800", "blueGray.900"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      px={2}
      py={2}
      mb={2}>
      <VStack>
        <HStack
          space={[2, 3]}
          justifyContent="space-between"
          alignItems={"center"}>
          <Box borderRadius={4} mt={2} p={2} alignItems={"flex-start"}>
            <Text
              px={4}
              py={2}
              w={48}
              borderRadius={16}
              fontSize={"md"}
              fontWeight={"semibold"}
              textTransform={"uppercase"}>
              {item.name}
            </Text>
            <VStack
              minW={12}
              borderRadius={4}
              mt={2}
              justifyContent={"center"}
              alignItems="flex-start">
              <HStack space={2}>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    Б
                  </Text>
                  <Box
                    borderRadius={100}
                    borderColor={"indigo.200"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.proteins}
                    </Text>
                  </Box>
                </Box>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    Ж
                  </Text>
                  <Box
                    borderRadius={100}
                    borderColor={"indigo.200"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.fats}
                    </Text>
                  </Box>
                </Box>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    У
                  </Text>
                  <Box
                    borderRadius={100}
                    borderColor={"indigo.200"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.carbohydrates}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Box
            borderRadius={100}
            borderColor={"indigo.300"}
            borderWidth={2}
            mt={2}
            mr={2}
            p={2}
            alignItems={"center"}
            justifyContent={"center"}
            w={20}
            h={20}>
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              textTransform={"uppercase"}>
              {item.energy}
            </Text>
            <Text textTransform={"uppercase"}>ккал</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <VStack
      _light={{ bg: "coolGray.50" }}
      _dark={{ bg: "coolGray.900" }}
      borderRadius={0}
      w="100%"
      minH={"100%"}
      alignItems="center"
      space="2.5"
      pt="4"
      px="4">
      <HStack w={"full"} space={"2"}>
        <Button
          colorScheme="indigo"
          borderBottomWidth={1}
          borderBottomColor={"indigo.500"}
          bg={"transparent"}
          _text={{
            color: colorMode == "light" ? "dark.100" : "light.100",
          }}
          rightIcon={<Ionicons name="nutrition" size={24} color="#ef4444" />}
          borderRadius={100}>
          Продукты
        </Button>
        <Button
          colorScheme="indigo"
          borderBottomWidth={1}
          borderBottomColor={"indigo.500"}
          bg={"transparent"}
          _text={{
            color: colorMode == "light" ? "dark.100" : "light.100",
          }}
          rightIcon={
            <Entypo
              name="bowl"
              size={24}
              color={colorMode == "light" ? "black" : "white"}
            />
          }
          borderRadius={100}>
          Блюда
        </Button>
      </HStack>
      <Input
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
          mb={16}
          w="100%"
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </VStack>
  );
};

export default Page;
