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
      borderRadius={16}
      w="100%"
      bg={{
        linearGradient: {
          colors: ["blueGray.100", "indigo.100"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      px={2}
      py={2}
      mb={2}>
      <VStack bg={"transparent"}>
        <HStack
          space={[2, 3]}
          justifyContent="space-between"
          alignItems={"center"}>
          <Box borderRadius={4} mt={2} p={2} alignItems={"flex-start"}>
            <Text
              bg={"white"}
              px={4}
              py={2}
              w={48}
              borderRadius={16}
              fontSize={"md"}
              textTransform={"uppercase"}>
              {item.name}
            </Text>
            <VStack
              bg={"transparent"}
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
                    borderColor={"indigo.100"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"white"}>
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
                    borderColor={"indigo.100"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"white"}>
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
                    borderColor={"indigo.100"}
                    borderWidth={2}
                    w={12}
                    h={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"white"}>
                    <Text fontSize={"md"} textTransform={"uppercase"}>
                      {item.bgu.split(",")[2]}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Box
            bg={"white"}
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
              {item.kcal}
            </Text>
            <Text textTransform={"uppercase"}>ккал</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <VStack
      bg={"white"}
      w="100%"
      minH={"100%"}
      alignItems="center"
      space="2.5"
      pt="4"
      px="4">
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
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </VStack>
  );
};

export default Page;
