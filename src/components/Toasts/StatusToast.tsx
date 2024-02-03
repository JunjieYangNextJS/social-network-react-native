import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar, Text } from "react-native-paper";
import useToastStore from "../../store/useToastStore";

const StatusToast = () => {
  const { toastIsOpen, onCloseToast, message, status } = useToastStore(
    (state) => state
  );

  let textColor = "#232F34";

  let statusText: string;

  switch (status) {
    case "success":
      statusText = "Success! " + message;
      textColor = "green";
      break;
    case "loading":
      statusText = "Loading... " + message;
      textColor = "#232F34";
      break;
    case "error":
      statusText = "Something went wrong, please try again later! " + message;
      textColor = "#F22625";
      break;
    default:
      statusText = "";
      break;
  }

  const styles = StyleSheet.create({
    snackbar: {
      flex: 1,
      justifyContent: "space-between",
    },
    snackbarText: {
      color: textColor,
      fontWeight: "bold",
    },
  });

  return (
    <Snackbar
      visible={toastIsOpen}
      onDismiss={onCloseToast}
      action={{
        label: "Dismiss",
        onPress: () => onCloseToast(),
      }}
      duration={1000}
      style={styles.snackbar}
    >
      <Text style={styles.snackbarText}>{statusText}</Text>
    </Snackbar>
  );
};

export default StatusToast;
