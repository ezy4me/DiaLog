import useErrorStore from "@/app/store/errorStore";
import { MaterialIcons } from "@expo/vector-icons";
import {
  AlertDialog,
  Button,
  Center,
  HStack,
  Heading,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";

const ErrorAllert = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { error } = useErrorStore();

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if(error)
    setIsOpen(true);
  }, [error]);

  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <HStack alignItems={"center"} space={2}>
              <MaterialIcons name="error" size={24} color="#ef4444" />
              <Text fontSize={"lg"}>Error</Text>
            </HStack>
          </AlertDialog.Header>
          <AlertDialog.Body borderRadius={0}>{error}</AlertDialog.Body>
          <AlertDialog.Footer></AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default ErrorAllert;
