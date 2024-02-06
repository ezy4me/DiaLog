import { Box, Center, Text, Image, AspectRatio } from "native-base";

export const LoginScreen = () => {
  return (
    <Box>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Center>
          <Image
            w={"40"}
            h={"40"}
            source={require("../../assets/images/glasses-bear.png")}
            alt="image"
          />
        </Center>
      </AspectRatio>
      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>
        Экономь время!
      </Text>
      <Text textAlign={"center"} mt={4}  fontSize={"xl"}>
        Пройди регистрацию за 5 минут.
      </Text>
    </Box>
  );
};
