import { Box, Center, Text, Image, AspectRatio } from "native-base";

export const BloodSugarScreen = () => {
  return (
    <Box>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Center>
          <Image
            w={"40"}
            h={"40"}
            source={require("../../assets/images/mocking-bear.png")}
            alt="image"
          />
        </Center>
      </AspectRatio>
      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>
        Уровень сахара в крови!
      </Text>
      <Text textAlign={"center"} mt={4}  fontSize={"xl"}>
        Веди дневник своих измерений.
      </Text>
      <Text textAlign={"center"} mt={4}  fontSize={"xl"}>
        Следи за изменениями.
      </Text>
    </Box>
  );
};
