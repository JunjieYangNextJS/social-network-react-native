import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../../theme";
import * as yup from "yup";
import { Formik } from "formik";
import { User } from "../../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import useConvertGuestToUser from "../../../react-query-hooks/useAuth/useConvertGuestToUser";
import PasswordInput from "../../../components/PasswordInput";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(
      8,
      "Password should be of minimum 8 characters length and has an uppercase and an number"
    )
    .test("isValidPass", " is not valid", (value: any, context) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);

      if (hasUpperCase && hasNumber) {
        return true;
      }
      return false;
    })
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

const GuestSecurities = ({ user }: { user: User }) => {
  const { username, email } = user;

  const { colors } = useAppTheme();

  //   date
  const [inputDate, setInputDate] = useState<{
    birthYear?: number;
    birthMonth?: number;
    birthDay?: number;
  }>({
    birthYear: 1993,
    birthMonth: 2,
    birthDay: 1,
  });

  const { mutate, isPending, error } = useConvertGuestToUser();

  const setDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;

    if (type === "set") {
      setInputDate({
        birthYear: date?.getFullYear(),
        birthMonth:
          typeof date?.getMonth() === "number"
            ? date?.getMonth() + 1
            : date?.getMonth(),
        birthDay: date?.getDate(),
      });
    }
  };

  //   refs
  const ref_input2 = useRef<any>();
  const ref_input3 = useRef<any>();
  const ref_input4 = useRef<any>();

  // renders
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => {
          mutate({ ...values, ...inputDate });
        }}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          values,
          handleBlur,
          handleChange,
          errors,
          isSubmitting,
          submitCount,
          dirty,
        }) => {
          return (
            <View>
              <View style={styles.header}>
                <View>
                  <Text variant="titleSmall">No longer just a guest?</Text>
                  <Text variant="titleSmall">Update your account!</Text>
                </View>

                <Button
                  onPress={(e: GestureResponderEvent) => handleSubmit()}
                  disabled={isPending || !dirty}
                >
                  Save
                </Button>
              </View>

              {error && (
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text variant="titleSmall" style={{ color: colors.trash }}>
                    {error?.toString()}
                  </Text>
                </View>
              )}

              <View style={styles.body}>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Username</Text>

                  <TextInput
                    placeholder={username}
                    style={styles.input}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={handleChange("username")}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                  />
                </View>
                <View style={styles.helperTextWrapper}>
                  <HelperText type="error" visible={submitCount > 0}>
                    {submitCount > 0 && errors.username}
                  </HelperText>
                </View>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={email}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={handleChange("email")}
                    inputMode="email"
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input3.current.focus()}
                    ref={ref_input2}
                  />
                </View>
                <View style={styles.helperTextWrapper}>
                  <HelperText type="error" visible={submitCount > 0}>
                    {submitCount > 0 && errors.email}
                  </HelperText>
                </View>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Password</Text>

                  <PasswordInput
                    placeholder="********"
                    defaultStyle={styles.input}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={handleChange("password")}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input4.current.focus()}
                    ref={ref_input3}
                  />
                </View>
                <View style={styles.helperTextWrapper}>
                  <HelperText type="error" visible={submitCount > 0}>
                    {submitCount > 0 && errors.password}
                  </HelperText>
                </View>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <PasswordInput
                    placeholder="********"
                    defaultStyle={styles.input}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={handleChange("passwordConfirm")}
                    ref={ref_input4}
                  />
                </View>
                <View style={styles.helperTextWrapper}>
                  <HelperText type="error" visible={submitCount > 0}>
                    {submitCount > 0 && errors.passwordConfirm}
                  </HelperText>
                </View>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <View style={styles.datePicker}>
                    <DateTimePicker
                      mode="date"
                      value={new Date(1993, 1, 1)}
                      onChange={(
                        event: DateTimePickerEvent,
                        date: Date | undefined
                      ) => setDate(event, date)}
                      maximumDate={new Date()}
                      themeVariant="dark"
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 105,
  },

  inputLabelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    // marginTop: 10,
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

export default GuestSecurities;
