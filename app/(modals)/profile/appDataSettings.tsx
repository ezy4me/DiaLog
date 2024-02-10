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
  FontAwesome5,
  Fontisto,
  Ionicons,
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

        <Text fontWeight={"semibold"} fontSize={"md"}>
          Уведомления
        </Text>
        <Stack
          direction={"row"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <Ionicons
              name="cube"
              size={18}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text ml={2}>Сахар в крови</Text>
          </Box>
          <CustomSwitch
            selectionMode={"off"}
            roundCorner={true}
            option1={"ru"}
            option2={"en"}
            options={[
              { label: "вкл", value: "on" },
              { label: "выкл", value: "off" },
            ]}
            onSelectSwitch={onSelectSwitch}
            selectionColor={Colors.primary}
          />
        </Stack>
        <Stack
          direction={"row"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <FontAwesome5
              name="syringe"
              size={18}
              color={colorMode == "light" ? "black" : "white"}
            />
            <Text ml={2}>Инсулин</Text>
          </Box>
          <CustomSwitch
            selectionMode={"off"}
            roundCorner={true}
            option1={"ru"}
            option2={"en"}
            options={[
              { label: "вкл", value: "on" },
              { label: "выкл", value: "off" },
            ]}
            onSelectSwitch={onSelectSwitch}
            selectionColor={Colors.primary}
          />
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
