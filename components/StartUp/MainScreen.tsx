import { Box, Center, Text, Image, AspectRatio } from "native-base";

export const MainScreen = () => {
  return (
    <Box>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Center>
          <Image
            w={"40"}
            h={"40"}
            source={require("../../assets/images/hello-bear.png")}
            alt="image"
          />
        </Center>
      </AspectRatio>
      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"xl"}>
        Привет!
      </Text>
      <Text textAlign={"center"} mt={4} fontSize={"xl"}>
        Я Ваш личный ассистент для контроля сахара в крови.
      </Text>
      <Text textAlign={"center"} mt={4}  fontSize={"xl"}>
        Давай я покажу что умею!
      </Text>
    </Box>
  );
};
