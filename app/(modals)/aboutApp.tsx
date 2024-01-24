import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  AspectRatio,
  Image,
  Box,
  Center,
  ScrollView,
  Text,
  VStack,
  Stack,
  Button,
} from "native-base";
import useAppSettingsStore from "../store/appSettingsStore";

const Page = () => {
  const { startUp, setStartUp } = useAppSettingsStore((state) => ({
    startUp: state.startUp,
    setStartUp: state.setStartUp,
  }));

  return (
    <ScrollView>
      <VStack space={3} p={4}>
        <Box bg={"indigo.400"} borderRadius={16}>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Center>
              <Image
                w={24}
                h={24}
                source={require("../../assets/images/icon.png")}
                alt="image"
              />
            </Center>
          </AspectRatio>
        </Box>
        <Text>
          Добро пожаловать в наше приложение – вашего надежного помощника в
          управлении диабетом! Наш дневник специально разработан для облегчения
          повседневной жизни диабетика, предоставляя удобные инструменты для
          отслеживания уровня сахара в крови.
        </Text>
        <Text>
          Следите за своим здоровьем, легко вводя измерения и анализируя
          динамику в удобном формате. Наше приложение предоставляет также
          персонализированные рекомендации по корректировке питания, помогая вам
          лучше управлять своим заболеванием.
        </Text>
        <Text>
          Помните, что наше приложение является всего лишь инструментом
          поддержки и контроля за диабетом. Оно не заменяет консультации с
          профессиональными медицинскими специалистами, но создает удобную среду
          для вас, чтобы сделать ваш путь к здоровью более простым и
          эффективным.
        </Text>
        <Text>
          Заботьтесь о своем здоровье с нашим приложением – вашим верным
          спутником в борьбе с диабетом!
        </Text>
        <Button
          borderRadius={100}
          colorScheme={"indigo"}
          onPress={() => setStartUp("true")}>
          Сброс
        </Button>
        <Stack alignItems={"center"}>
          <Text>
            Copyright with{" "}
            <MaterialCommunityIcons color={"red"} size={18} name="heart" />
          </Text>
          <Text fontWeight={"semibold"}>by miliash, 2024</Text>
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
