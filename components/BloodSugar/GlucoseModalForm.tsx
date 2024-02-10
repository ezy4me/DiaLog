import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
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
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import useAuthStore from "@/app/store/authStore";

export const GlucoseModalForm = ({
  label,
  edit,
  data,
  isModalVisible,
  onClose, // Добавляем колбэк onClose
}: {
  label?: boolean;
  edit?: boolean;
  data?: any;
  isModalVisible?: boolean;
  onClose?: () => void; // Типизируем колбэк onClose
}) => {
  const { addBloodSugar, updateBloodSugar } = useBloodSugarStore();
  const { user } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [value, setValue] = useState<number>(data?.value || 0);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState<string>(getCurrentTime());

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (isModalVisible) setModalVisible(true);
  }, [isModalVisible]);

  useEffect(() => {
    if (modalVisible) {
      setSelectedDate(getCurrentDate());
      setSelectedTime(getCurrentTime());
    }
  }, [modalVisible]);

  useEffect(() => {
    if (data !== undefined) {
      setValue(data.value);
    }
  }, [data]);

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

  const onAddBloodSugar = async () => {
    await addBloodSugar(user.id, value, selectedDate, selectedTime).then(() => {
      setModalVisible(false);
      onClose && onClose(); // Вызываем onClose при закрытии модального окна
    });
  };

  const onUpdateBloodSugar = async () => {
    await updateBloodSugar(
      data.id,
      user.id,
      value,
      selectedDate,
      selectedTime
    ).then(() => {
      setModalVisible(false);
      onClose && onClose(); // Вызываем onClose при закрытии модального окна
    });
  };

  const handleInputChange = (event: any) => {
    const newValue = event.nativeEvent.text;
    setValue(newValue === "" ? 0 : parseFloat(newValue));
  };

  return (
    <Box>
      {!edit ? (
        <Button
          colorScheme={"indigo"}
          borderRadius={100}
          onPress={() => setModalVisible(true)}
          leftIcon={<AntDesign name="pluscircle" size={32} color={"white"} />}>
          {label ? "Глюкоза" : null}
        </Button>
      ) : (
        <></>
      )}

      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          onClose && onClose(); // Вызываем onClose при закрытии модального окна
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
                    rightIcon={
                      <Entypo
                        name="calendar"
                        size={18}
                        color={colorMode == "light" ? "black" : "white"}
                      />
                    }
                    bg={"indigo.500"}>
                    {selectedDate}
                  </Button>
                  <Button
                    colorScheme={"indigo"}
                    onPress={toggleTimePicker}
                    flex="1"
                    borderRadius={32}
                    rightIcon={
                      <Entypo
                        name="clock"
                        size={18}
                        color={colorMode == "light" ? "black" : "white"}
                      />
                    }
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
                  value={value.toString()}
                  onChange={handleInputChange}
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
              <Button
                onPress={edit ? onUpdateBloodSugar : onAddBloodSugar}
                flex="1"
                borderRadius={32}
                bg={"indigo.500"}>
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </Box>
  );
};

export default GlucoseModalForm;
