import { AlertDialog, Button, Center } from "native-base";
import React, { useEffect, useState } from "react";

interface ConfirmAllertProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  onConfirm: () => void;
}

const ConfirmAllert: React.FC<ConfirmAllertProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const cancelRef = React.useRef(null);

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => onClose(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Внимание</AlertDialog.Header>
          <AlertDialog.Body bg={"transparent"}>
            Вы уверены что хотите совершить это действие?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2} bg={"transparent"}>
              <Button
                borderRadius={100}
                colorScheme="danger"
                onPress={() => onClose(false)}
                ref={cancelRef}>
                Отмена
              </Button>
              <Button
                borderRadius={100}
                colorScheme="green"
                onPress={() => {
                  onClose(false);
                  onConfirm();
                }}>
                Да
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default ConfirmAllert;
