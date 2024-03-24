import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Box, Button, HStack, VStack, useColorMode } from "native-base";

const CustomStepper = ({ steps, currentIndex, onNext, onPrev }: any) => {
  const totalSteps = steps.length;
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <VStack space={4}>
      <HStack space={8}>
        <Button
          colorScheme={"indigo"}
          borderRadius={100}
          onPress={onPrev}
          isDisabled={currentIndex === 0}
          leftIcon={
            <AntDesign
              name="arrowleft"
              size={24}
              color={colorMode == "light" ? "black" : "white"}
            />
          }
        />

        <HStack alignItems={"center"} space={2}>
          {steps.map((step: any, index: number) => (
            <Box
              borderRadius={100}
              w={4}
              h={4}
              bg={index === currentIndex ? "indigo.400" : "indigo.100"}
              key={index}></Box>
          ))}
        </HStack>

        <Button
          colorScheme={"indigo"}
          borderRadius={100}
          onPress={onNext}
          isDisabled={currentIndex === totalSteps - 1}
          leftIcon={
            <AntDesign
              name="arrowright"
              size={24}
              color={colorMode == "light" ? "black" : "white"}
            />
          }
        />
      </HStack>
      {currentIndex === totalSteps - 1 ? (
        <Button
          borderRadius={100}
          colorScheme="indigo"
          onPress={() => router.push("/(modals)/login")}>
          Войти
        </Button>
      ) : null}
    </VStack>
  );
};

export default CustomStepper;
