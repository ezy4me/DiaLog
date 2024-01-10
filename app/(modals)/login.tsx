import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Page = () => {
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Привет
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Войди, если хочешь
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Войти
          </Button>
          <HStack mt="6" justifyContent="center" alignItems="center">
            <Box mr={2} borderColor={"light.300"} borderTopWidth={1} w={24} />
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}>
              или
            </Text>
            <Box ml={2} borderColor={"light.300"} borderTopWidth={1} w={24} />
          </HStack>
          <Button
            mt="2"
            borderWidth={1}
            borderColor="red.100"
            backgroundColor="light.100">
            <HStack alignItems="center">
              <MaterialCommunityIcons
                name="google"
                size={28}
                color={"#EA4335"}
              />
              <Text ml={4} color="coolGray.600">
                продолжить с Google
              </Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Page;
