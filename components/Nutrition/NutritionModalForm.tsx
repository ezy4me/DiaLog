import useAuthStore from "@/app/store/authStore";
import useDishStore from "@/app/store/dishStore";
import useNutritionStore from "@/app/store/nutritionStore";
import getCurrentDate from "@/utils/getCurrentDate";
import getCurrentTime from "@/utils/getCurrentTime";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Modal,
  Text,
  HStack,
  KeyboardAvoidingView,
  useColorMode,
  Select,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

export const NutritionModalForm = ({
  label,
  edit,
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
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState<string>(getCurrentTime());
  const { dishes } = useDishStore((state) => ({
    dishes: state.dishesData,
  }));

  const user  = useAuthStore((state) => state.user);

  const { getDishes } = useDishStore((state) => ({
    getDishes: state.getDishes,
  }));

  const fetchData = async () => {
    await getDishes();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNutrition = useNutritionStore((state) => state.addNutrition);

  const onAddNutrition = async () => {
    if (!selectedType || !selectedDish) {
      return;
    }

    await addNutrition(user.id,{
      dishId: dishes.find((d: any) => d.name === selectedDish).id,
      nutritionTypeId: parseInt(selectedType),
      date: new Date(),
      time: new Date(),
    }).then(() => {
      setModalVisible(false);
      onClose && onClose();
    });
  };

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
              <Select
                my={2}
                w={"100%"}
                variant="rounded"
                selectedValue={selectedType}
                placeholder="Завтра | Обед | Ужин"
                dropdownIcon={
                  <Box mr={2}>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={24}
                      color={colorMode == "light" ? "#525252" : "white"}
                    />
                  </Box>
                }
                _selectedItem={{
                  endIcon: (
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color={colorMode == "light" ? "#525252" : "white"}
                    />
                  ),
                }}
                onValueChange={(itemValue) => setSelectedType(itemValue)}>
                <Select.Item borderRadius={16} label="Завтрак" value="1" />
                <Select.Item borderRadius={16} label="Обед" value="2" />
                <Select.Item borderRadius={16} label="Ужин" value="3" />
              </Select>
              <Select
                my={2}
                w={"100%"}
                variant="rounded"
                selectedValue={selectedDish}
                placeholder="..."
                dropdownIcon={
                  <Box mr={2}>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={24}
                      color={colorMode == "light" ? "#525252" : "white"}
                    />
                  </Box>
                }
                _selectedItem={{
                  endIcon: (
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color={colorMode == "light" ? "#525252" : "white"}
                    />
                  ),
                }}
                onValueChange={(itemValue) => setSelectedDish(itemValue)}>
                {dishes.map((d: any) => (
                  <Select.Item
                    borderRadius={16}
                    key={d.id}
                    label={d.name}
                    value={d.name}
                  />
                ))}
              </Select>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={onAddNutrition}
                flex="1"
                borderRadius={32}
                bg={"green.500"}>
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </Box>
  );
};
