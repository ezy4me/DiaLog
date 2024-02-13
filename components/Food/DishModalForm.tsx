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
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

export const DishModalForm = ({
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

  useEffect(() => {
    if (isModalVisible) setModalVisible(true);
  }, [isModalVisible]);

  return (
    <Box>
      {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          onClose && onClose();
        }}
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
                <Text fontWeight={"semibold"}>{data.name}</Text>
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                {data.foodDishes.map((item: any) => (
                  <Box key={item.id}>
                    <FormControl.Label my={2}>
                      {item.food.name}
                    </FormControl.Label>
                    <Input
                      value={item.weight.toString()}
                      variant="rounded"
                      keyboardType="numeric"
                      placeholder="..."
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
                  </Box>
                ))}
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button
                colorScheme={"emerald"}
                flex="1"
                borderRadius={32}
                bg={"green.500"}>
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
