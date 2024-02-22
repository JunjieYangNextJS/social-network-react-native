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

const UserSettings = ({ user }: { user: User }) => {
  const { username, email, birthDay, birthMonth, birthYear } = user;

  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const { top: statusBarHeight } = useSafeAreaInsets();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // child refs
  const DateOfBirthBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleDateOfBirthModalPress = useCallback(() => {
    Keyboard.dismiss();
    DateOfBirthBottomSheetModalRef.current?.present();
  }, []);

  const SexualityBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSexualityModalPress = useCallback(() => {
    Keyboard.dismiss();
    SexualityBottomSheetModalRef.current?.present();
  }, []);

  const BioBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleBioModalPress = useCallback(() => {
    Keyboard.dismiss();
    BioBottomSheetModalRef.current?.present();
  }, []);

  // renders
  return (
    <View>
      <View style={styles.contentContainer}>
        <Formik
          initialValues={{
            username,
            email,
            birthYear: birthYear?.toString() || "",
            birthMonth: birthMonth?.toString() || "",
            birthDay: birthDay?.toString() || "",
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
                    onChangeText={handleChange("username")}
                    style={styles.input}
                    placeholderTextColor={"white"}
                  />
                </View>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    placeholder="Your email"
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholderTextColor={colors.placeholder}
                  />
                </View>

                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TextInput
                    placeholder="07/08/1997"
                    style={styles.input}
                    value={
                      values.birthMonth +
                      "/" +
                      values.birthDay +
                      "/" +
                      values.birthYear
                    }
                    // onChangeText={handleChange("dateOfBirth")}
                    placeholderTextColor={colors.placeholder}
                    onPressIn={handleDateOfBirthModalPress}
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
                    onPressIn={handleSexualityModalPress}
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
                </DateOfBirthBottomSheet>
                <SexualityBottomSheet
                  enablePanDownToClose={true}
                  sexuality={values.sexuality}
                  sexualityFromData={sexuality}
                  // handleDateOfBirthModalPress={handleDateOfBirthModalPress}
                  ref={SexualityBottomSheetModalRef}
                >
                  <></>
                </SexualityBottomSheet> */}
              </>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  body: {
    marginTop: 10,
  },

  input: {
    // marginBottom: 10,
    borderRadius: 5,
    fontSize: 17,
    lineHeight: 20,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#1C1C1E",
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

export default UserSettings;
