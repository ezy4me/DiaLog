import useAuthStore from "@/app/store/authStore";
import useProfileStore from "@/app/store/profileStore";
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
  Spinner,
} from "native-base";
import { useState, useEffect } from "react";

const Page = () => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuthStore();
  const { profile, getProfile, updateProfile } = useProfileStore((state) => ({
    profile: state.profile,
    getProfile: state.getProfile,
    updateProfile: state.updateProfile,
  }));

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) {
        await getProfile(user.id);
      }
    };
    fetchData().then(() => setLoading(false));
  }, [profile]);

  useEffect(() => {
    if (profile) {
      setEmail(user.email);
      setName(profile.name);
      setWeight(profile.weight);
      setHeight(profile.height);
      setGender(profile.gender);
      setType(profile.diabetesTypeId?.toString());
    }
  }, [profile]);

  const handleHeightChange = (text: string) => {
    if (text === "") {
      setHeight(0);
    } else {
      setHeight(parseInt(text));
    }
  };

  const handleWeightChange = (text: string) => {
    if (text === "") {
      setWeight(0);
    } else {
      setWeight(parseInt(text));
    }
  };

  const onUpdateProfile = async () => {
    await updateProfile(user.id, name, gender, height, weight, parseInt(type));
  };

  return (
    <ScrollView maxH={"100%"}>
      {loading ? (
        <Spinner mt={4} size="lg" color={"indigo.500"} />
      ) : (
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
                {calculateBMI(weight, height)}
              </Text>
            </Box>
          </HStack>

          <Text px={2} fontWeight={"semibold"} fontSize={"md"}>
            Данные профиля
          </Text>

          <Input
            isDisabled
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
            <Select.Item borderRadius={16} label="Не указан" value="3" />
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
            <Select.Item borderRadius={16} label="Мужской" value="М" />
            <Select.Item borderRadius={16} label="Женский" value="Ж" />
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
              value={height?.toString()}
              onChangeText={handleHeightChange}
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
              value={weight?.toString()}
              onChangeText={handleWeightChange}
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
          <Button
            borderRadius={100}
            colorScheme="indigo"
            onPress={onUpdateProfile}>
            Сохранить
          </Button>
        </VStack>
      )}
    </ScrollView>
  );
};

export default Page;
