import CustomSwitch from "@/app/UI/CustomSwitch";
import {
  AntDesign,
  Entypo,
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
  useColorMode,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Platform, TouchableWithoutFeedback } from "react-native";

import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";
import Colors from "@/constants/Colors";
import useAuthStore from "@/app/store/authStore";
import useBloodSugarStore from "@/app/store/bloodSugarStore";
import { CustomDatePicker } from "@/app/UI/CustomDatePicker";
import { CustomTimePicker } from "@/app/UI/CustomTimePicker";

export const InsulinModalForm = ({
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
  const { colorMode } = useColorMode();
  const { addBloodSugar, updateBloodSugar } = useBloodSugarStore();
  const { user } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [value, setValue] = useState<number>(data?.value || 0);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState<string>(getCurrentTime());

  const onSelectSwitch = (index: any) => {
    alert("Selected index: " + index);
  };

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

  const handleInputChange = (event: any) => {
    const newValue = event.nativeEvent.text;
    setValue(newValue === "" ? 0 : parseFloat(newValue));
  };

  const onAddBloodSugar = async () => {
    await addBloodSugar(user.id, value, selectedDate, selectedTime).then(() => {
      setModalVisible(false);
      onClose && onClose();
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
      onClose && onClose();
    });
  };

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

  return (
    <Box>
      {!edit ? (
        <Button
          p={label ? "2.5" : 0}
          colorScheme={"amber"}
          borderRadius={100}
          onPress={() => setModalVisible(true)}
          leftIcon={<AntDesign name="pluscircle" size={32} color={"white"} />}>
          {label ? "Инсулин" : null}
        </Button>
      ) : (
        <></>
      )}
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
              bg={"amber.500"}
            />
            <Modal.Header>
              <HStack space={2} alignItems={"center"}>
                <FontAwesome5
                  name="syringe"
                  size={24}
                  color={colorMode == "light" ? "black" : "white"}
                />
                <Text fontWeight={"semibold"}>Инсулин</Text>
              </HStack>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <HStack justifyContent={"space-between"} space={4}>
                  <Button
                    colorScheme={"amber"}
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
                    bg={"amber.500"}>
                    {selectedDate}
                  </Button>
                  <Button
                    colorScheme={"amber"}
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
                    bg={"amber.500"}>
                    {selectedTime}
                  </Button>
                </HStack>

                {datePickerVisible && (
                  <CustomDatePicker
                    isOpen={datePickerVisible}
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

                <Box my={4}>
                  <CustomSwitch
                    selectionMode={"long"}
                    roundCorner={true}
                    options={[
                      { label: "Короткий", value: "short" },
                      { label: "Долгий", value: "long" },
                    ]}
                    onSelectSwitch={onSelectSwitch}
                    selectionColor={Colors.primary}
                  />
                </Box>

                <Input
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
                      children={"ml"}
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
                bg={"amber.500"}>
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
