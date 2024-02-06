import { FontAwesome } from "@expo/vector-icons";
import { View, Text, ScrollView, VStack } from "native-base";
import React from "react";

const Page = () => {
  return (
    <ScrollView>
      <VStack mt={48} alignItems={"center"} justifyContent={"center"}>
        <FontAwesome name="code" size={32} color="black" />
        <Text my={4}>В разработке...</Text>
      </VStack>
    </ScrollView>
  );
};

export default Page;
