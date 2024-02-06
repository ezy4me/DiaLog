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
  "indigo.200",
  "green.200",
  "violet.200",
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
        isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "transparent"
      }
      style={{
        transform: [
          {
            scale: isPressed ? 0.99 : 1,
          },
        ],
      }}
      borderRadius={16}>
      <Box overflow="hidden">
        <Box w="full" bg={colors[data.id - 1]} borderRadius={0}>
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
            bg="indigo.400"
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="2"
            left="2"
            py={2}
            px={4}
            borderRadius={100}>
            {data.id}
          </Center>
        </Box>
        <Stack borderTopLeftRadius={0} borderTopRightRadius={0} p="4" space={3}>
          <Stack space={2}>
            <Text fontSize={"lg"} fontWeight={"semibold"} ml="-1">
              {data.title}
            </Text>
            <Text
              fontSize="xs"
              _light={{
                color: "indigo.500",
              }}
              _dark={{
                color: "indigo.200",
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
