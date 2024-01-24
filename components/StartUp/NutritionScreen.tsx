import { Box, Center, Text, Image, AspectRatio } from "native-base";

export const NutritionScreen = () => {
  return (
    <Box>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Center>
          <Image
            w={"40"}
            h={"40"}
            source={require("../../assets/images/impressed-bear.png")}
            alt="image"
          />
        </Center>
      </AspectRatio>
      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>
        Рацион питания!
      </Text>
      <Text textAlign={"center"} mt={4}  fontSize={"xl"}>
        Сохраняй любимые блюда.
      </Text>
      <Text textAlign={"center"} mt={4}  fontSize={"xl"}>
        Добавляй новый прием пищи.
      </Text>
    </Box>
  );
};
