import React, { useEffect, useState } from "react";
import { AntDesign, Fontisto } from "@expo/vector-icons";
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
  Pressable,
} from "native-base";
import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";
import { Platform } from "react-native";
import { CustomDatePicker } from "@/app/UI/CustomDatePicker";
import { CustomTimePicker } from "@/app/UI/CustomTimePicker";

export const GlucoseModalForm = ({ label }: { label?: boolean }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    setSelectedDate(getCurrentDate());
    setSelectedTime(getCurrentTime);
  }, [modalVisible]);

  const { colorMode } = useColorMode();

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(getCurrentDate(date));
  };

  const toggleTimePicker = () => {
    setTimePickerVisible(!timePickerVisible);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(getCurrentTime(time));
  };

  return (
    <Box>
      <Button
        colorScheme={"indigo"}
        borderRadius={100}
        onPress={() => setModalVisible(true)}
        leftIcon={<AntDesign name="pluscircle" size={32} color={"white"} />}>
        {label ? "Глюкоза" : null}
      </Button>
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
                <Fontisto
                  name="blood-drop"
                  size={24}
                  color={colorMode == "light" ? "black" : "white"}
                />
                <Text fontWeight={"semibold"}>Глюкоза</Text>
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <HStack justifyContent={"space-between"} space={4}>
                  <Button
                    colorScheme={"indigo"}
                    onPress={toggleDatePicker}
                    flex="1"
                    borderRadius={32}
                    bg={"indigo.500"}>
                    {selectedDate}
                  </Button>
                  <Button
                    colorScheme={"indigo"}
                    onPress={toggleTimePicker}
                    flex="1"
                    borderRadius={32}
                    bg={"indigo.500"}>
                    {selectedTime}
                  </Button>
                </HStack>
                {datePickerVisible && (
                  <CustomDatePicker
                    onClose={toggleDatePicker}
                    changeDate={handleDateChange}
                  />
                )}

                {timePickerVisible && (
                  <CustomTimePicker
                    onClose={toggleTimePicker}
                    changeTime={handleTimeChange}
                  />
                )}

                <Input
                  mt={4}
                  variant="rounded"
                  keyboardType="numeric"
                  placeholder="Значение"
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
    </Box>
  );
};
