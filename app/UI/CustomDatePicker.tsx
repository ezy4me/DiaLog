import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Box, Text, useColorMode, Modal } from "native-base";
import getCurrentDate from "@/utils/getCurrentDate";

export const CustomDatePicker = ({ onClose, changeDate }: any) => {
  const [date, setDate] = useState<any>(new Date().toISOString());
  const { colorMode } = useColorMode();

  const handleChange = (newDate: string) => {
    setDate(newDate);
    changeDate(newDate);
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
              mode="calendar"
              current={date}
              selected={date}
              onSelectedChange={handleChange}
              style={{ borderRadius: 10 }}
              options={{
                backgroundColor: "transparent",
                textHeaderColor: "#FFA25B",
                textDefaultColor: "#F6E7C1",
                selectedTextColor: "#fff",
                mainColor: "#F4722B",
                textSecondaryColor: "#D6C7A1",
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
