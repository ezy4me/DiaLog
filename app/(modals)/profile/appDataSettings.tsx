import CustomSwitch from "@/app/UI/CustomSwitch";
import {
  View,
  Text,
  ScrollView,
  Box,
  VStack,
  HStack,
  useColorMode,
  Stack,
} from "native-base";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import {
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import useAppSettingsStore from "@/app/store/appSettingsStore";
import { colorModeManager } from "@/app/theme";

const Page = () => {

  const onSelectSwitch = (index: any) => {
    alert("Selected index: " + index);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  const onToggleSwitchTheme = (val?: any, index?: number) => {
    if (colorMode != val) {
      toggleColorMode();
    }
  };

  return (
    <ScrollView maxH={"100%"}>
      <VStack space="2.5" mt="4" px="4">
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Вид приложения
        </Text>
        <Stack
          p={2}
          direction={"row"}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={18}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text ml={2}>Тема</Text>
          </Box>
          <CustomSwitch
            selectionMode={colorMode}
            roundCorner={true}
            options={[
              { label: "Светлая", value: "light" },
              { label: "Темная", value: "dark" },
            ]}
            onSelectSwitch={onToggleSwitchTheme}
            selectionColor={Colors.primary}
          />
        </Stack>

        {/* <Text fontWeight={"semibold"} fontSize={"md"}>
          Единицы измерения
        </Text>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialCommunityIcons name="weight" size={18} color="black" />
            <Text ml={2}>Вес</Text>
          </Box>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"kg"}
            option2={"ibs"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={Colors.primary}
          />
        </HStack>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <MaterialIcons name="height" size={18} color="black" />
            <Text ml={2}>Рост</Text>
          </Box>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"cm"}
            option2={"inch"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={Colors.primary}
          />
        </HStack>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <Fontisto name="blood-drop" size={18} color="black" />
            <Text ml={2}>Глюкоза</Text>
          </Box>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"mmol/l"}
            option2={"mg/dl"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={Colors.primary}
          />
        </HStack>

        <Text fontWeight={"semibold"} fontSize={"md"}>
          Язык
        </Text>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <FontAwesome name="language" size={18} color="black" />
            <Text ml={2}>Выбор языка</Text>
          </Box>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"ru"}
            option2={"en"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={Colors.primary}
          />
        </HStack> */}
      </VStack>
    </ScrollView>
  );
};

export default Page;
