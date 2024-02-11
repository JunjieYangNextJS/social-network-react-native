import * as React from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

interface IGeneralModal {
  text: string;
  opened: boolean;

  onClose: () => void;
}

const GeneralModal = ({ text, opened, onClose }: IGeneralModal) => {
  const containerStyle = {
    backgroundColor: "black",
    padding: 20,
  };

  return (
    <Portal>
      <Modal
        visible={opened}
        onDismiss={onClose}
        contentContainerStyle={containerStyle}
        style={{
          maxWidth: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{text}</Text>
      </Modal>
    </Portal>
  );
};

export default GeneralModal;
