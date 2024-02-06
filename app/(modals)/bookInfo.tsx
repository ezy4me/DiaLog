import {
  VStack,
  Heading,
  Box,
  Text,
  AspectRatio,
  Center,
  Image,
  Spinner,
  ScrollView,
  Stack,
} from "native-base";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
const BookInfo = () => {
  const [data, setData]: any = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("bookInfo");
      if (value !== null) {
        setData(JSON.parse(value));
      }
    } catch (error) {
      // error
    }
  };

  const imageSources = [
    require("../../assets/images/about.png"),
    require("../../assets/images/glucometer.png"),
    require("../../assets/images/management.png"),
    require("../../assets/images/food.png"),
    require("../../assets/images/fitness.png"),
    require("../../assets/images/blood-test.png"),
  ];

  const colors = [
    "amber.200",
    "pink.200",
    "blue.200",
    "violet.200",
    "green.200",
    "yellow.200",
  ];

  if (!data || !data.title) {
    return (
      <VStack h={"100%"} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"lg"} color="indigo.500" />
      </VStack>
    );
  }

  return (
    <ScrollView>
      <VStack px={4} alignItems={"center"}>
        <Heading w={'full'} textAlign={'center'} py={1} my={4}>{data.title}</Heading>
        <Box bg={colors[data.id - 1]} borderRadius={16}>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Center>
              <Image
                w={24}
                h={24}
                source={imageSources[data.id - 1]}
                alt="image"
              />
            </Center>
          </AspectRatio>
        </Box>

        <Box>
          {data.text.map((item: any) => (
            <Box my={4} key={item.heading}>
              <Text fontWeight={"semibold"}>{item.heading}</Text>
              {item.value.map((value: any) => (
                <Text mt={2} key={value}>
                  {value}
                </Text>
              ))}
            </Box>
          ))}
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default BookInfo;
