import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  ScrollView,
  HStack,
  Button,
  Text,
  useColorMode,
  Divider,
  Stack,
  VStack,
} from "native-base";
import io from "socket.io-client";
import useAuthStore from "@/app/store/authStore";
import useDoctorStore from "@/app/store/doctorStore";
import useChatStore from "@/app/store/chatStore";
import { Feather, FontAwesome } from "@expo/vector-icons";
import getCurrentDate from "@/utils/getCurrentDate";

const SERVER_URL = process.env.EXPO_PUBLIC_API_URL;

const Chat = () => {
  const { colorMode } = useColorMode();
  const scrollViewRef = useRef<any>(null);

  const [message, setMessage] = useState("");
  const { user } = useAuthStore();

  const { patient } = useDoctorStore((state) => ({
    patient: state.patient,
  }));

  const { messages, chat, getUserChat, getMessages } = useChatStore(
    (state) => ({
      messages: state.messages,
      chat: state.chat,
      getUserChat: state.getUserChat,
      getMessages: state.getMessages,
    })
  );

  const socket = io(`${SERVER_URL}`);

  useEffect(() => {
    const handleNewMessage = (msg: any) => {
      getMessages(user.id, patient.patient.id);
    };

    socket.on("recMessage", handleNewMessage);
    return () => {
      socket.off("recMessage", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getUserChat(user.id, patient.patient.id);
      await getMessages(user.id, patient.patient.id);
      if (scrollViewRef.current)
        scrollViewRef.current.scrollToEnd({ animated: true });
    };
    fetchData();
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", {
        text: message,
        userId: user.id,
        chatId: chat[0].id,
      });
      setMessage("");
    }
  };

  return (
    <VStack flex={1}>
      <ScrollView
        p={4}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {messages.map((msg: any, index: any) => (
          <Box
            key={index}
            bg={
              user.id === msg.message.userId
                ? colorMode === "light"
                  ? "blue.200"
                  : "blue.700"
                : colorMode === "light"
                ? "indigo.200"
                : "indigo.700"
            }
            p={2}
            borderRadius={8}
            alignSelf={
              user.id === msg.message.userId ? "flex-end" : "flex-start"
            }
            maxWidth="70%"
            mb={2}>
            <HStack
              py={1}
              borderBottomWidth={1}
              borderBottomColor={"dark.500"}
              alignItems={"center"}
              space={2}>
              <FontAwesome
                name="user-circle"
                size={16}
                color={colorMode == "light" ? "#525252" : "white"}
              />
              <Text fontSize={12}>{msg.message.user.profile.name}</Text>
            </HStack>
            <Text py={2}>{msg.message.text}</Text>
            <HStack
              alignItems={"center"}
              justifyContent={
                user.id === msg.message.userId ? "flex-end" : "flex-start"
              }>
              <Text fontSize={12}>{getCurrentDate(msg.message.dateTime)}</Text>
            </HStack>
          </Box>
        ))}
      </ScrollView>
      <Stack borderRadius={0} px={4} py={2}>
        <HStack space={2} alignItems="center">
          <Input
            borderRadius={16}
            multiline={true}
            flex={1}
            placeholder="Введите сообщение..."
            value={message}
            onChangeText={setMessage}
          />
          <Button variant="unstyled" onPress={sendMessage} p={4}>
            <Feather
              name="send"
              size={24}
              color={colorMode == "light" ? "#525252" : "white"}
            />
          </Button>
        </HStack>
      </Stack>
    </VStack>
  );
};

export default Chat;
