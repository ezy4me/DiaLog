import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Modal,
  FormControl,
  Input,
  Text,
  HStack,
  KeyboardAvoidingView,
} from "native-base";
import React, { useState } from "react";
import { Platform, TouchableWithoutFeedback } from "react-native";
export const GlucoseModalForm = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const month = date
      .toLocaleString("ru", { month: "short" })
      .split("")
      .map((char, index) => (index == 0 ? char.toLocaleUpperCase() : char))
      .join('');
    const day = date.toLocaleString("ru", { day: "numeric" });
    const year = date.toLocaleString("ru", { year: "numeric" });

    return `${month} ${day}, ${year}`;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };
  
  return (
    <Box>
      <Button
        bg={"indigo.500"}
        borderRadius={32}
        onPress={() => setModalVisible(true)}
        leftIcon={
          <MaterialCommunityIcons name="plus" size={32} color={"white"} />
        }>
        Глюкоза
      </Button>
      {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}
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
              bg={"indigo.500"}
            />
            <Modal.Header>
              <HStack space={2} alignItems={"center"}>
                <Fontisto name="blood-drop" size={24} color="indigo" />
                <Text fontWeight={"semibold"}>Глюкоза</Text>
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <HStack justifyContent={"space-between"}>
                  <Box w={32} p={2} borderRadius={12} bg={"indigo.500"}>
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontWeight={"semibold"}>
                      {getCurrentDate()}
                    </Text>
                  </Box>
                  <Box w={24} p={2} borderRadius={12} bg={"indigo.500"}>
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
                  placeholder="Значение"
                  leftElement={
                    <Box ml={4}>
                      <Fontisto name="circle-o-notch" size={16} color="black" />
                    </Box>
                  }
                  rightElement={
                    <Box
                      borderLeftWidth={1}
                      borderLeftColor={"muted.200"}
                      p={2}
                      children={"mmol/l"}
                    />
                  }
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" borderRadius={32} bg={"indigo.500"}>
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
      {/* </TouchableWithoutFeedback> */}
    </Box>
  );
};
