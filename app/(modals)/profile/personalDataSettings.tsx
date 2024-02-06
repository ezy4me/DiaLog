import calculateBMI from "@/utils/bmiCalculator";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Text,
  Box,
  ScrollView,
  Stack,
  Input,
  HStack,
  Select,
  VStack,
  Button,
  useColorMode,
} from "native-base";
import { useState } from "react";

const Page = () => {
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("190");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" mt="4" px="4">
        <HStack
          p={2}
          w={"100%"}
          bg={"indigo.400"}
          justifyContent={"center"}
          borderRadius={16}>
          <Box
            borderRadius={100}
            bg={{
              linearGradient: {
                colors: ["indigo.500", "indigo.600"],
                start: [0, 0],
                end: [1, 0.5],
              },
            }}
            mr={2}
            alignItems={"center"}
            justifyContent={"center"}
            w={32}
            h={32}>
            <Text
              color={"white"}
              fontSize={"md"}
              fontWeight={"bold"}
              textTransform={"uppercase"}>
              ИМТ
            </Text>

            <Text
              fontSize={"xl"}
              color={"white"}
              fontWeight={"semibold"}
              textTransform={"uppercase"}>
              {calculateBMI(parseFloat(weight), parseFloat(height))}
            </Text>
          </Box>
        </HStack>

        <Text px={2} fontWeight={"semibold"} fontSize={"md"}>
          Данные профиля
        </Text>

        <Input
          variant="rounded"
          placeholder="Ваша почта"
          value={email}
          onChangeText={setEmail}
          rightElement={
            <Box
              borderLeftWidth={1}
              borderLeftColor={"muted.200"}
              p={2}
              borderRadius={16}
              children={
                <Entypo
                  name="mail"
                  size={18}
                  color={colorMode == "light" ? "#525252" : "white"}
                />
              }
            />
          }
        />
        <Input
          variant="rounded"
          placeholder="Ваше имя"
          value={name}
          onChangeText={setName}
          rightElement={
            <Box
              borderLeftWidth={1}
              borderLeftColor={"muted.200"}
              p={2}
              borderRadius={16}
              children={
                <FontAwesome
                  name="user-circle"
                  size={18}
                  color={colorMode == "light" ? "#525252" : "white"}
                />
              }
            />
          }
        />

        <Text px={2} fontWeight={"semibold"} fontSize={"md"}>
          Данные пациента
        </Text>

        <Select
          w={"100%"}
          variant="rounded"
          selectedValue={type}
          placeholder="Тип диабета"
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
          onValueChange={(itemValue) => setType(itemValue)}>
          <Select.Item borderRadius={16} label="I тип" value="1" />
          <Select.Item borderRadius={16} label="II тип" value="2" />
        </Select>
        <Select
          w={"100%"}
          variant="rounded"
          selectedValue={gender}
          placeholder="Пол"
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
            bg: "indigo.100",
            endIcon: (
              <MaterialCommunityIcons
                name="check"
                size={24}
                color={colorMode == "light" ? "#525252" : "white"}
              />
            ),
          }}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Select.Item borderRadius={16} label="Мужской" value="male" />
          <Select.Item borderRadius={16} label="Женский" value="female" />
        </Select>
        <HStack
          w={"100%"}
          justifyContent={"flex-start"}
          mb="2.5"
          mt="1.5"
          space={2}>
          <Input
            w={"50%"}
            variant="rounded"
            placeholder="Рост"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            rightElement={
              <Box
                borderLeftWidth={1}
                borderLeftColor={"muted.200"}
                p={2}
                children={"см"}
              />
            }
          />
          <Input
            w={"47.5%"}
            variant="rounded"
            placeholder="Вес"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            rightElement={
              <Box
                borderLeftWidth={1}
                borderLeftColor={"muted.200"}
                p={2}
                children={"кг"}
              />
            }
          />
        </HStack>
        <Button borderRadius={100} colorScheme="indigo">
          Сохранить
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Page;
