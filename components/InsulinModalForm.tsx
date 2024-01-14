import CustomSwitch from "@/app/UI/CustomSwitch";
import {
  FontAwesome5,
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
} from "native-base";
import React, { useState } from "react";
import { Platform, TouchableWithoutFeedback } from "react-native";

import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";

export const InsulinModalForm = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSelectSwitch = (index: any) => {
    alert("Selected index: " + index);
  };

  return (
    <Box>
      <Button
        bg={"amber.500"}
        borderRadius={32}
        onPress={() => setModalVisible(true)}
        leftIcon={
          <MaterialCommunityIcons name="plus" size={32} color={"white"} />
        }>
        Инсулин
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
              bg={"amber.500"}
            />
            <Modal.Header>
              <HStack space={2} alignItems={"center"}>
                <FontAwesome5 name="syringe" size={24} color="black" />
                <Text fontWeight={"semibold"}>Инсулин</Text>
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <HStack justifyContent={"space-between"}>
                  <Box w={32} p={2} borderRadius={12} bg={"amber.500"}>
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontWeight={"semibold"}>
                      {getCurrentDate()}
                    </Text>
                  </Box>
                  <Box w={24} p={2} borderRadius={12} bg={"amber.500"}>
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontWeight={"semibold"}>
                      {getCurrentTime()}
                    </Text>
                  </Box>
                </HStack>

                <Box my={2} >
                  <CustomSwitch
                    selectionMode={1}
                    roundCorner={true}
                    option1={"Долгий"}
                    option2={"Быстрый"}
                    onSelectSwitch={onSelectSwitch}
                    selectionColor={"indigo"}
                  />
                </Box>

                <Input
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
                      children={"ml"}
                    />
                  }
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" borderRadius={32} bg={"amber.500"}>
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
