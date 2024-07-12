import React, { useState } from "react";
import axios from "axios";
import { useForgotPassword } from "../../react-query-hooks/useAuth/usePassword";
import { useInterval } from "../../hooks/useInterval";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import PridersNetText from "../../components/PridersNetText";
import { useAppTheme } from "../../theme";

export default function ForgotMyPassword() {
  const { colors } = useAppTheme();

  const [value, setValue] = useState("");

  const [disable, setDisable] = useState(false);
  const { mutate, isPending, error } = useForgotPassword();

  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  useDidUpdate(() => {
    if (seconds === 0) {
      interval.stop();

      setSeconds(60);
      setDisable(false);
    }
  }, [seconds]);

  const handlePostEmail = () => {
    setDisable(true);
    interval.start();
    mutate({ email: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Text variant="titleMedium">
              Welcome to <PridersNetText variant="titleMedium" />!
            </Text>
            <Text variant="titleSmall">
              Enter your email to get a reset link
            </Text>
          </View>

          <Button
            onPress={handlePostEmail}
            disabled={isPending || disable || value === ""}
          >
            Send
          </Button>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 5 }}>
          <Text variant="titleSmall" style={{ color: colors.liked }}>
            {error?.toString()}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              onChangeText={(text) => setValue(text)}
              value={value}
              inputMode="email"
            />
          </View>
          {seconds !== 60 && (
            <Text style={{ fontSize: 14, marginTop: 10, marginHorizontal: 30 }}>
              A link will been sent to your email shortly, you can try again in{" "}
              {seconds} seconds
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
    // <Container size={460} my={30} sx={{ paddingTop: 100 }}>
    //   <Title className={classes.title} align="center">
    //     Forgot your password?
    //   </Title>
    //   <Text color="dimmed" size="sm" align="center">
    //     Enter your email to get a reset link
    //   </Text>

    //   <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
    //     <TextInput
    //       label="Your email"
    //       placeholder="me@priders.net"
    //       required
    //       value={value}
    //       onChange={(event) => setValue(event.currentTarget.value)}
    //     />
    //     {seconds !== 60 && (
    //       <Text sx={{ fontSize: 14, paddingTop: 5 }}>
    //         A link will been sent to your email shortly, you can try again in{" "}
    //         {seconds} seconds
    //       </Text>
    //     )}

    //     <Group position="apart" mt="lg" className={classes.controls}>
    //       <Anchor
    //         color="dimmed"
    //         size="sm"
    //         className={classes.control}
    //         component={Link}
    //         to="/login"
    //       >
    //         <Center inline>
    //           <ArrowLeft size={12} />
    //           <Box ml={5}>Back to login page</Box>
    //         </Center>
    //       </Anchor>
    //       <Button
    //         className={classes.control}
    //         onClick={() => handlePostEmail()}
    //         disabled={disable}
    //       >
    //         Reset password
    //       </Button>
    //     </Group>
    //   </Paper>
    // </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight || 0 : 0,
    // padding: 24,
    // justifyContent: "center",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginTop: 20,
  },

  body: {
    marginTop: 15,
    paddingHorizontal: 10,
  },

  input: {
    // marginBottom: 10,
    borderRadius: 5,
    fontSize: 17,
    lineHeight: 20,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#141414",
    color: "white",
    flex: 1,
    height: 40,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    width: 60,
  },

  inputLabelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  helperTextWrapper: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: -5,
  },

  datePicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
});
