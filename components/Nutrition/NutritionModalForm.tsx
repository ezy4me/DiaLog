import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Button,
  Modal,
  FormControl,
  Input,
  Text,
  HStack,
  KeyboardAvoidingView,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import { Platform } from "react-native";

import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";

export const NutritionModalForm = ({
  label,
  edit,
  data,
  isModalVisible,
  onClose,
}: {
  label?: boolean;
  edit?: boolean;
  data?: any;
  isModalVisible?: boolean;
  onClose?: () => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <Box>
     {!edit ? (
        <Button
          p={label ? "2.5" : 0}
          colorScheme={"emerald"}
          borderRadius={100}
          onPress={() => setModalVisible(true)}
          leftIcon={<AntDesign name="pluscircle" size={32} color={"white"} />}>
          {label ? "Питание" : null}
        </Button>
      ) : (
        <></>
      )}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard={false}
        bottom="0"
        justifyContent="flex-end"
        animationPreset="slide"
        size="full">
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
          behavior={Platform.OS === "android" ? "padding" : "position"}>
          <Modal.Content>
            <Modal.CloseButton
              _icon={{ color: "light.100" }}
              borderRadius={100}
              bg={"green.500"}
            />
            <Modal.Header>
              <HStack space={2} alignItems={"center"}>
                <MaterialCommunityIcons
                  name="food-apple"
                  size={24}
                  color={colorMode == "light" ? "black" : "white"}
                />
                <Text fontWeight={"semibold"}>Питание</Text>
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <HStack justifyContent={"space-between"}>
                  <Box w={32} p={2} borderRadius={12} bg={"green.500"}>
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontWeight={"semibold"}>
                      {getCurrentDate()}
                    </Text>
                  </Box>
                  <Box w={24} p={2} borderRadius={12} bg={"green.500"}>
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontWeight={"semibold"}>
                      {getCurrentTime()}
                    </Text>
                  </Box>
                </HStack>

                <Input
                  mt={4}
                  variant="rounded"
                  keyboardType="numeric"
                  placeholder="Белки"
                  leftElement={
                    <Box ml={4}>
                      <Fontisto
                        name="circle-o-notch"
                        size={16}
                        color={colorMode == "light" ? "black" : "white"}
                      />
                    </Box>
                  }
                  rightElement={
                    <Box
                      borderLeftWidth={1}
                      borderLeftColor={"muted.200"}
                      p={2}
                      children={"g"}
                    />
                  }
                />

                <Input
                  mt={4}
                  variant="rounded"
                  keyboardType="numeric"
                  placeholder="Жиры"
                  leftElement={
                    <Box ml={4}>
                      <Fontisto
                        name="circle-o-notch"
                        size={16}
                        color={colorMode == "light" ? "black" : "white"}
                      />
                    </Box>
                  }
                  rightElement={
                    <Box
                      borderLeftWidth={1}
                      borderLeftColor={"muted.200"}
                      p={2}
                      children={"g"}
                    />
                  }
                />

                <Input
                  mt={4}
                  variant="rounded"
                  keyboardType="numeric"
                  placeholder="Углеводы"
                  leftElement={
                    <Box ml={4}>
                      <Fontisto
                        name="circle-o-notch"
                        size={16}
                        color={colorMode == "light" ? "black" : "white"}
                      />
                    </Box>
                  }
                  rightElement={
                    <Box
                      borderLeftWidth={1}
                      borderLeftColor={"muted.200"}
                      p={2}
                      children={"g"}
                    />
                  }
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" borderRadius={32} bg={"green.500"}>
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </Box>
  );
};
