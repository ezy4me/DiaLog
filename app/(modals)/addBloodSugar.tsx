import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Box, Stack, Slider, Icon, Button } from "native-base";
import React from "react";

const Page = () => {
  const [onChangeValue, setOnChangeValue] = React.useState(5);
  const [onChangeEndValue, setOnChangeEndValue] = React.useState(5);

  const getSugarLevelLabel = (value: any) => {
    if (value < 4.0) {
      return "Низкий уровень сахара";
    } else if (value >= 4.0 && value <= 7.5) {
      return "Нормальный уровень сахара";
    } else {
      return "Высокий уровень сахара";
    }
  };

  return (
    <Box alignItems="center" w="100%">
      <Stack space={4} alignItems="center" w="100%" maxW="300">
        <Box py={8}>
          <Text textAlign="center" color="gray.500">
            {getSugarLevelLabel(onChangeEndValue)}
          </Text>
          <Text my={4} fontSize={"4xl"} textAlign="center">
            {onChangeValue}
          </Text>
          <Text textAlign="center">Новое значение </Text>
          <Text textAlign="center">{onChangeEndValue} mmol/l</Text>
        </Box>

        <Slider
          step={0.1}
          size="lg"
          maxValue={15}
          defaultValue={5}
          colorScheme="gray"
          onChange={(v) => {
            setOnChangeValue(v);
          }}
          onChangeEnd={(v) => {
            v && setOnChangeEndValue(v);
          }}>
          <Slider.Track bg="muted.200">
            <Slider.FilledTrack bg="red.400" />
          </Slider.Track>
          <Slider.Thumb borderWidth="0" bg="red.400">
            <Icon
              m={1}
              as={MaterialCommunityIcons}
              name="cube-outline"
              color="white"
              size="lg"
            />
          </Slider.Thumb>
        </Slider>
        <Box w={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
          <Text>0</Text>
          <Text>7.5</Text>
          <Text>15</Text>
        </Box>
        <Button w={"100%"} mt={4} borderRadius={32} colorScheme={"indigo"}>
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
};

export default Page;
