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
  Button,
} from "native-base";
import { Entypo, Ionicons } from "@expo/vector-icons";

const NutritionControls = ({
  onDataTypeChange,
}: {
  onDataTypeChange: (dataType: string) => void;
}) => {
  const { colorMode } = useColorMode();
  const [type, setType] = useState<string>("food");

  const handleTypeChange = (dataType: string) => {
    onDataTypeChange(dataType);
    setType(dataType);
  };

  return (
    <HStack w={"full"} space={"2"} mt={2}>
      <Button
        onPress={() => handleTypeChange("food")}
        colorScheme="indigo"
        py={1}
        bg={"transparent"}
        borderColor={type == "food" ? "indigo.400" : "transparent"}
        borderBottomWidth={1}
        borderRadius={100}
        _text={{
          color: colorMode == "light" ? "dark.100" : "light.100",
        }}
        rightIcon={<Ionicons name="nutrition" size={24} color="#ef4444" />}>
        Продукты
      </Button>
      <Button
        onPress={() => handleTypeChange("dish")}
        colorScheme="indigo"
        bg={"transparent"}
        py={1}

        borderColor={type == "dish" ? "indigo.400" : "transparent"}
        borderBottomWidth={1}
        borderRadius={100}
        _text={{
          color: colorMode == "light" ? "dark.100" : "light.100",
        }}
        rightIcon={
          <Entypo
            name="bowl"
            size={24}
            color={colorMode == "light" ? "black" : "white"}
          />
        }>
        Блюда
      </Button>
    </HStack>
  );
};

export default NutritionControls;
