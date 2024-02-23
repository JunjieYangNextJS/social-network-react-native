import React, { useCallback, useMemo, useRef } from "react";
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

  //   mutate

  //   ref
  const ref_input2 = useRef<any>();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // child refs
  const DateOfBirthBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleDateOfBirthModalPress = useCallback(() => {
    Keyboard.dismiss();
    DateOfBirthBottomSheetModalRef.current?.present();
  }, []);

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
        onSubmit={(values) => {
          console.log(values, "values");
          //   patchUser(values);

          //   SignUpUser(values);
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
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  placeholder={birthMonth + "/ " + birthDay + "/ " + birthYear}
                  style={styles.input}
                  // value=
                  // onChangeText={handleChange("dateOfBirth")}
                  placeholderTextColor={"white"}
                  // onPressIn={handleDateOfBirthModalPress}
                  // editable={false}
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
            </View>
            <>
              {/* <DateOfBirthBottomSheet
                  enablePanDownToClose={true}
                  dateOfBirth={values.dateOfBirth}
                  dateOfBirthFromData={dateOfBirth}
                  // handleDateOfBirthModalPress={handleDateOfBirthModalPress}
                  ref={DateOfBirthBottomSheetModalRef}
                >
                  <></>
                </DateOfBirthBottomSheet> */}
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
    marginTop: 10,
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 10,
  },
});

export default UserSecurities;
