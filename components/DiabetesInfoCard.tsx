import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Stack,
  Image,
  Text,
} from "native-base";

const colors = [
  "amber.200",
  "pink.200",
  "blue.200",
  "violet.200",
  "green.200",
  "yellow.200",
];

export function DiabetesInfoCard({
  isPressed,
  isHovered,
  isFocused,
  data,
}: any) {
  const imageSources = [
    require("../assets/images/about.png"),
    require("../assets/images/glucometer.png"),
    require("../assets/images/management.png"),
    require("../assets/images/food.png"),
    require("../assets/images/fitness.png"),
    require("../assets/images/blood-test.png"),
  ];

  return (
    <Box
      alignItems="center"
      bg={
        isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"
      }
      style={{
        transform: [
          {
            scale: isPressed ? 0.99 : 1,
          },
        ],
      }}
      rounded="8"
      shadow={3}
      borderColor="coolGray.300">
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1">
        <Box bg={colors[data.id - 1]}>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Center>
              <Image
                w={24}
                h={24}
                source={imageSources[data.id - 1]}
                alt="image"
              />
            </Center>
          </AspectRatio>
          <Center
            bg="violet.400"
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="2"
            left="2"
            px="3"
            borderRadius={100}
            py="1.5">
            {data.id}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {data.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {data.subtitle}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
