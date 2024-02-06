import React from "react";
import {
  Badge,
  Box,
  Container,
  HStack,
  Text,
  Stack,
  useColorMode,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ProfileNavigationCard = ({ id, icon, title, badges, route }: any) => {
  const router = useRouter();

  const { colorMode } = useColorMode();

  return (
    <TouchableOpacity
      style={{ width: "100%" }}
      onPress={() => router.push(route)}>
      <Stack
        direction="row"
        alignItems={"center"}
        space={3}
        p={4}
        borderRadius={16}>
        <Ionicons
          name={icon}
          size={32}
          color={colorMode == "light" ? "black" : "white"}
        />
        <Container bg="transparent" flexDirection={"column"} w={"4/5"}>
          <Text fontSize={"md"} mb={2}>
            {title}
          </Text>
          <HStack flexWrap={"wrap"}>
            {badges.map((i: string) => (
              <Badge
                bg={"indigo.500"}
                variant={"solid"}
                mb={1}
                mr={1}
                px={2}
                key={i}>
                {i}
              </Badge>
            ))}
          </HStack>
        </Container>
      </Stack>
    </TouchableOpacity>
  );
};

export default ProfileNavigationCard;
