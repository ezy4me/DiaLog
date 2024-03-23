import useAuthStore from "@/app/store/authStore";
import useDishStore from "@/app/store/dishStore";
import useNutritionStore from "@/app/store/nutritionStore";
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
  Select,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

export const DishModalForm = React.memo(
  ({
    label,
    edit,
    data,
    isModalVisible,
    onClose,
    onSave,
    callBack,
  }: {
    label?: boolean;
    edit?: boolean;
    data?: any;
    isModalVisible?: boolean;
    onClose?: () => void;
    onSave?: (updatedData: any) => void;
    callBack?: () => void;
  }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { colorMode } = useColorMode();

    const products = useNutritionStore((state) => state.food);
    const [selectedProduct, setSelectedProduct] = useState<string>("");

    const user = useAuthStore((state) => state.user);

    const { addDish, updateDish, deleteDish } = useDishStore((state) => ({
      addDish: state.addDish,
      updateDish: state.updateDish,
      deleteDish: state.deleteDish,
    }));

    const [formData, setFormData] = useState<any>({ name: "", foodDishes: [] });

    useEffect(() => {
      if (data) {
        setFormData(data);
      } else {
        setFormData({ name: "", foodDishes: [] });
      }
    }, [data]);

    useEffect(() => {
      if (isModalVisible) setModalVisible(true);
    }, [isModalVisible]);

    const handleInputChange = (id: number, weight: string) => {
      const updatedData = formData.foodDishes.map((item: any) =>
        item.id === id ? { ...item, weight: weight } : item
      );
      setFormData((prevData: any) => ({
        ...prevData,
        foodDishes: updatedData,
      }));
    };

    const handleTitleChange = (title: string) => {
      setFormData((prevData: any) => ({ ...prevData, name: title }));
    };

    const handleAddProduct = () => {
      if (selectedProduct) {
        const productToAdd = products.find((p) => p.name === selectedProduct);

        if (productToAdd) {
          const newProduct = {
            id: formData.foodDishes.length + 1,
            food: productToAdd,
            weight: 0,
          };
          const updatedData = [...formData.foodDishes, newProduct];
          setFormData((prevData: any) => ({
            ...prevData,
            foodDishes: updatedData,
          }));
          setSelectedProduct("");
        }
      }
    };

    const onDeleteDish = async (id: number) => {
      console.log(id);
      
      await deleteDish(id);
      onClose && onClose();
      callBack && callBack();
      setModalVisible(false);
    };

    const handleSave = () => {
      if (
        !formData ||
        !formData.name ||
        !formData.foodDishes ||
        formData.foodDishes.length === 0
      ) {
        return;
      }

      if (!edit) {
        addDish({ ...formData, userId: user.id });
      } else {
        updateDish(data.id, { ...formData, userId: user.id });
      }

      onClose && onClose();
      callBack && callBack();
    };

    return (
      <Box>
        {!edit ? (
          <Button
            p={label ? "2.5" : 0}
            colorScheme={"indigo"}
            borderRadius={100}
            onPress={() => setModalVisible(true)}
            leftIcon={
              <AntDesign name="pluscircle" size={32} color={"white"} />
            }>
            {label ? "Блюдо" : null}
          </Button>
        ) : (
          <></>
        )}
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
                  <Text fontWeight={"semibold"}>{data?.name || "Блюдо"} </Text>
                </HStack>
              </Modal.Header>
              <Modal.Body>
                <HStack
                  my={2}
                  space={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}>
                  <Input
                    w={80}
                    variant="rounded"
                    placeholder="Название"
                    value={formData?.name || ""}
                    onChangeText={(text) => handleTitleChange(text)}
                  />
                  <Button
                    onPress={() => onDeleteDish(data.id)}
                    p={2}
                    colorScheme={"transparent"}
                    borderRadius={100}
                    leftIcon={
                      <AntDesign name="delete" size={20} color={"red"} />
                    }
                  />
                </HStack>

                <HStack
                  my={2}
                  space={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}>
                  <Text>Продукты:</Text>
                  <Button
                    onPress={handleAddProduct}
                    p={0}
                    colorScheme={"indigo"}
                    borderRadius={100}
                    leftIcon={
                      <AntDesign name="pluscircle" size={32} color={"white"} />
                    }
                  />
                </HStack>
                <Select
                  my={2}
                  w={"100%"}
                  variant="rounded"
                  selectedValue={selectedProduct}
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
                  onValueChange={(itemValue) => setSelectedProduct(itemValue)}>
                  {products.map((p) => (
                    <Select.Item
                      borderRadius={16}
                      key={p.id}
                      label={p.name}
                      value={p.name}
                    />
                  ))}
                </Select>
                <FormControl>
                  {formData?.foodDishes.map((item: any, index: number) => (
                    <Box key={index}>
                      <FormControl.Label my={2}>
                        {item.food.name}
                      </FormControl.Label>
                      <Input
                        value={item.weight.toString()}
                        variant="rounded"
                        keyboardType="numeric"
                        placeholder="..."
                        onChangeText={(text) =>
                          handleInputChange(item.id, text)
                        }
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
                  onPress={handleSave}
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
      </Box>
    );
  }
);
