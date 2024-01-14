import React from "react";
import { Badge, Box, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ProfileNavigationCard = ({ id, icon, title, badges, route }: any) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={{width: '100%'}} onPress={() => router.push(route)}>
      <HStack
        alignItems={"center"}
        space={3}
        p={4}
        borderRadius={16}
        bg={"blueGray.100"}>
        <Ionicons name={icon} size={32} color="black" />
        <Box flexDirection={"column"}>
          <Text fontSize={"md"} mb={2}>
            {title}
          </Text>
          <HStack flexWrap={"wrap"}>
            {badges.map((i: string) => (
              <Badge mb={1} mr={1} bg={"blueGray.200"} borderRadius={16} key={i}>
                {i}
              </Badge>
            ))}
          </HStack>
        </Box>
      </HStack>
    </TouchableOpacity>
  );
};

export default ProfileNavigationCard;
