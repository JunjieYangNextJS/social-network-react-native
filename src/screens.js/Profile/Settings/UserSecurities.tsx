import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../../theme";
import * as yup from "yup";
import { Formik, FormikErrors, ErrorMessage } from "formik";
import { User } from "../../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDidUpdate } from "../../../hooks/useDidUpdate";
import PasswordBottomSheet from "./PasswordBottomSheet";
import { useChangeEmailOrUsername } from "../../../react-query-hooks/useAuth/useChangeEmailOrUsername";
import UsernameBottomSheet from "./UsernameBottomSheet";
import EmailBottomSheet from "./EmailBottomSheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useChangeBirthday } from "../../../react-query-hooks/useAuth/useChangeBirthday";
import DateTimePickerWrapper from "../../../components/DateTimePickerWrapper";

const validationSchema = yup.object({
  username: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
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
    .oneOf([yup.ref("password")], { message: "Passwords must match" })
    .required("Password is required"),
});

const UserSecurities = ({ user }: { user: User }) => {
  const { username, email, birthDay, birthMonth, birthYear } = user;

  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();

  //   date
  const [inputDate, setInputDate] = useState({
    birthYear,
    birthMonth,
    birthDay,
  });

  const { mutate: changeBirthDay, isPending } = useChangeBirthday();

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

  const birthdayHasNotChanged =
    inputDate.birthDay === birthDay &&
    inputDate.birthMonth === birthMonth &&
    inputDate.birthYear === birthYear;

  const cannotSaveBirthdayNow =
    !inputDate.birthYear ||
    !inputDate.birthMonth ||
    !inputDate.birthDay ||
    birthdayHasNotChanged ||
    isPending;

  const handleSaveBirthday = () => {
    if (cannotSaveBirthdayNow) return;
    changeBirthDay(inputDate);
  };

  // child refs

  const PasswordBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePasswordModalPress = useCallback(() => {
    Keyboard.dismiss();
    PasswordBottomSheetModalRef.current?.present();
  }, []);

  const UsernameBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleUsernameModalPress = useCallback(() => {
    Keyboard.dismiss();
    UsernameBottomSheetModalRef.current?.present();
  }, []);

  const EmailBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleEmailModalPress = useCallback(() => {
    Keyboard.dismiss();
    EmailBottomSheetModalRef.current?.present();
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username,
          email,

          passwordCurrent: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => {}}
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
        }) => (
          <View>
            {/* <Button
                    disabled={!dirty}
                    onPress={(e: GestureResponderEvent) => handleSubmit()}
                  >
                    Save
                  </Button> */}

            <View style={styles.body}>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  value={values.username}
                  style={styles.input}
                  placeholderTextColor={"white"}
                  onPressIn={handleUsernameModalPress}
                  editable={false}
                />
              </View>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Your email"
                  style={styles.input}
                  value={values.email}
                  onPressIn={handleEmailModalPress}
                  placeholderTextColor={colors.placeholder}
                  editable={false}
                />
              </View>

              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="********"
                  style={styles.input}
                  value={""}
                  placeholderTextColor={colors.placeholder}
                  onPressIn={handlePasswordModalPress}
                  editable={false}
                />
              </View>
              <View style={styles.inputLabelWrapper}>
                <Text style={styles.label}>Date of Birth</Text>
                <View style={styles.datePicker}>
                  {/* <DateTimePicker
                    mode="date"
                    value={
                      birthYear && birthMonth && birthDay
                        ? new Date(birthYear, birthMonth - 1, birthDay)
                        : new Date()
                    }
                    onChange={(
                      event: DateTimePickerEvent,
                      date: Date | undefined
                    ) => setDate(event, date)}
                    maximumDate={new Date()}
                    themeVariant="dark"
                  /> */}
                  <DateTimePickerWrapper
                    setDate={setDate}
                    inputDate={inputDate}
                  />
                  <Button
                    onPress={handleSaveBirthday}
                    disabled={cannotSaveBirthdayNow}
                  >
                    Save
                  </Button>
                </View>
              </View>
            </View>

            <>
              <PasswordBottomSheet
                enablePanDownToClose={true}
                password={values.password}
                passwordCurrent={values.passwordCurrent}
                passwordConfirm={values.passwordConfirm}
                // handleDateOfBirthModalPress={handleDateOfBirthModalPress}
                ref={PasswordBottomSheetModalRef}
              >
                <></>
              </PasswordBottomSheet>
              <UsernameBottomSheet
                enablePanDownToClose={true}
                username={values.username}
                passwordCurrent={values.passwordCurrent}
                ref={UsernameBottomSheetModalRef}
                usernameCurrent={user.username}
              >
                <></>
              </UsernameBottomSheet>
              <EmailBottomSheet
                enablePanDownToClose={true}
                email={values.email}
                emailCurrent={user.email}
                passwordCurrent={values.passwordCurrent}
                ref={EmailBottomSheetModalRef}
              >
                <></>
              </EmailBottomSheet>
            </>
          </View>
        )}
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
    marginTop: 10,
  },

  datePicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserSecurities;
