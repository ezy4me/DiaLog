import React, { useState } from "react";
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
  ScrollView,
  Stack,
  useColorMode,
} from "native-base";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const Page = () => {
  const [email, setEmail] = useState("");
  const { colorMode } = useColorMode();

  return (
    <ScrollView h={"full"}>
      <VStack mt={8} alignItems={"center"} justifyContent={"center"}>
        <Box safeArea p="2" w="90%" maxW="290">
          <Heading bg={'transparent'} size="lg" fontWeight="600">
            Привет
          </Heading>
          <Heading bg={'transparent'} mt="1" fontWeight="medium" size="xs">
            Войди, если хочешь
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email:</FormControl.Label>
              <Input
                variant="rounded"
                placeholder="Ваша почта"
                value={email}
                onChangeText={setEmail}
                rightElement={
                  <Box
                    borderLeftWidth={1}
                    borderLeftColor={"muted.200"}
                    p={2}
                    borderRadius={16}
                    children={
                      <Entypo
                        name="mail"
                        size={18}
                        color={colorMode == "light" ? "#525252" : "white"}
                      />
                    }
                  />
                }
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" borderRadius={100}>
              Войти
            </Button>
            <HStack mt="6" justifyContent="center" alignItems="center">
              <Box mr={2} borderColor={"light.300"} borderTopWidth={1} w={24} />
              <Text fontSize="sm">или</Text>
              <Box ml={2} borderColor={"light.300"} borderTopWidth={1} w={24} />
            </HStack>
            <Button shadow={1} w={"100%"} bg={"light.100"} borderRadius={100}>
              <HStack alignItems="center">
                <MaterialCommunityIcons
                  name="google"
                  size={20}
                  color={"#EA4335"}
                />
                <Text ml={4} color="coolGray.600">
                  продолжить с Google
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default Page;
