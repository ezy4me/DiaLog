import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
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
} from "native-base";
import data from "products.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Product {
  id: string;
  name: string;
  bgu: string;
  kcal: string;
}

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setProducts(data as Product[]);
      setLoading(false);
    }, 2000);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <Box
      borderRadius={4}
      w="100%"
      borderWidth={1}
      borderColor="muted.200"
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
              bg={"violet.200"}
              px={4}
              py={2}
              w={48}
              borderRadius={16}
              fontSize={"md"}
              textTransform={"uppercase"}>
              {item.name}
            </Text>
            <VStack
              minW={12}
              borderRadius={4}
              mt={2}
              bg="muted.100"
              justifyContent={"center"}
              alignItems="flex-start">
              <HStack space={2}>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    Б
                  </Text>
                  <Box
                    borderRadius={100}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"indigo.200"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.bgu.split(",")[0]}
                    </Text>
                  </Box>
                </Box>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    Ж
                  </Text>
                  <Box
                    borderRadius={100}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"amber.200"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.bgu.split(",")[1]}
                    </Text>
                  </Box>
                </Box>
                <Box alignItems={"center"}>
                  <Text mb={2} textTransform={"uppercase"}>
                    У
                  </Text>
                  <Box
                    borderRadius={100}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"green.200"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.bgu.split(",")[2]}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Box
            borderRadius={100}
            borderColor={"blue.300"}
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
              {item.kcal}
            </Text>
            <Text textTransform={"uppercase"}>ккал</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <VStack w="100%" alignItems="center" space="2.5" mt="4" px="4">
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
        <Spinner mt={4} size="lg" />
      ) : (
        <FlatList
          mb={16}
          w="100%"
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </VStack>
  );
};

export default Page;
