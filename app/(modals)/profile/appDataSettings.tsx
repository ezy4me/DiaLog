import CustomSwitch from "@/app/UI/CustomSwitch";
import { View, Text, ScrollView, Box, VStack, HStack } from "native-base";
import React from "react";

const Page = () => {
  const onSelectSwitch = (index: any) => {
    alert("Selected index: " + index);
  };

  return (
    <ScrollView bg={"white"} maxH={"100%"}>
      <VStack space="2.5" mt="4" px="4">
        <Text fontWeight={"semibold"} fontSize={"md"}>
          Вид приложения
        </Text>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Text>Тема</Text>
          <CustomSwitch
            selectionMode={2}
            roundCorner={true}
            option1={"Темная"}
            option2={"Светлая"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={"indigo"}
          />
        </HStack>

        <Text fontWeight={"semibold"} fontSize={"md"}>
          Единицы измерения
        </Text>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Text>Вес</Text>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"kg"}
            option2={"ibs"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={"indigo"}
          />
        </HStack>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Text>Рост</Text>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"cm"}
            option2={"inch"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={"indigo"}
          />
        </HStack>
        <HStack
          bg={"blueGray.100"}
          p={2}
          borderRadius={16}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Text>Глюкоза</Text>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"mmol/l"}
            option2={"mg/dl"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={"indigo"}
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
          <Text>Выбор языка</Text>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={"ru"}
            option2={"en"}
            onSelectSwitch={onSelectSwitch}
            selectionColor={"indigo"}
          />
        </HStack>
        
      </VStack>
    </ScrollView>
  );
};

export default Page;
