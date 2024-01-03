import {
  Text,
  Button,
  Box,
  ScrollView,
  VStack,
  Stack,
  Input,
  HStack,
} from "native-base";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();
  return (
    <ScrollView>
      <VStack alignItems="center" space="2.5" mt="4" px="4">
        <MaterialCommunityIcons
          name="account-circle"
          size={128}
          color={Colors.grey}
        />
        <Input
          shadow={2}
          bg={"muted.100"}
          _hover={{
            bg: "amber.100",
          }}
          _focus={{
            bg: "muted.100",
            borderColor: "indigo.300",
          }}
          variant="rounded"
          placeholder="Ваша почта"
        />
        <Input
          shadow={2}
          bg={"muted.100"}
          _hover={{
            bg: "amber.100",
          }}
          _focus={{
            bg: "muted.100",
            borderColor: "indigo.300",
          }}
          variant="rounded"
          placeholder="Ваше имя"
        />

        <Stack direction="row" mb="2.5" mt="1.5" space={2}>
          <Input
            w={24}
            shadow={2}
            bg={"muted.100"}
            _hover={{
              bg: "amber.100",
            }}
            _focus={{
              bg: "muted.100",
              borderColor: "indigo.300",
            }}
            variant="rounded"
            placeholder="Рост"
          />
          <Input
            w={24}
            shadow={2}
            bg={"muted.100"}
            _hover={{
              bg: "amber.100",
            }}
            _focus={{
              bg: "muted.100",
              borderColor: "indigo.300",
            }}
            variant="rounded"
            placeholder="Вес"
          />
          <Input
            w={24}
            shadow={2}
            bg={"muted.100"}
            _hover={{
              bg: "amber.100",
            }}
            _focus={{
              bg: "muted.100",
              borderColor: "indigo.300",
            }}
            variant="rounded"
            placeholder="Пол"
          />
        </Stack>

        <Stack w={64} direction="column" mb="2.5" mt="1.5" space={3}>
          {!isSignedIn && (
            <Button borderRadius={100} shadow={2} colorScheme="danger" onPress={() => signOut()}>
              Выйти
            </Button>
          )}

          {!isSignedIn && (
            <Button
              borderRadius={100}
              colorScheme="indigo"
              onPress={() => router.push("/(modals)/login")}>
              Войти
            </Button>
          )}
        </Stack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
