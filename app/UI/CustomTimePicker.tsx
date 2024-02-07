import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Box, Text, useColorMode, Modal } from "native-base";
import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";

export const CustomTimePicker = ({ onClose, changeTime }: any) => {
  const [time, setTime] = useState(getCurrentTime);
  const { colorMode } = useColorMode();

  const handleChange = (newTime: string) => {
    setTime(newTime)
    changeTime(newTime);
  };

  const handleConfirm = () => {
    onClose();
  };
  return (
    <Modal size="full" animationPreset="slide" isOpen={true}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
        behavior={Platform.OS === "android" ? "padding" : "position"}>
        <Modal.Content>
          <Modal.Body>
            <DatePicker
              mode="time"
              minuteInterval={3}
              onTimeChange={handleChange}
              options={{
                backgroundColor: "transparent",
                textHeaderColor: colorMode == 'light' ? "#27272a" : "#FFA25B",
                textDefaultColor: colorMode == 'light' ? "#FFA25B" : "#F6E7C1",
                selectedTextColor: "#fff",
                mainColor: "#F4722B",
                textSecondaryColor: colorMode == 'light' ?  "#27272a": "#D6C7A1",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />
            <Pressable onPress={handleConfirm}>
              <Box bg="indigo.500" rounded="full" p={2} mt={4}>
                <Text color="white" textAlign="center">
                  Закрыть
                </Text>
              </Box>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};
