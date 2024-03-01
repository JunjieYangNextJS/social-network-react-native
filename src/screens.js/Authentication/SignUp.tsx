import React, { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../theme";
import * as yup from "yup";
import { Formik } from "formik";
import { User } from "../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import useConvertGuestToUser from "../../react-query-hooks/useAuth/useConvertGuestToUser";
import PasswordInput from "../../components/PasswordInput";
import useSignUp from "../../react-query-hooks/useAuth/useSignUp";

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
    .test(
      "isValidPass",
      "Password should be of minimum 8 characters length and has an uppercase and an number",
      (value: any, context) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        if (hasUpperCase && hasNumber) {
          return true;
        }
        return false;
      }
    )
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

const SignUp = () => {
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

  const { mutate: createUser, isPending, error } = useSignUp();

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

  // const errorMessage = useMemo(() => {
  //   return (
  //     <View style={{ marginHorizontal: 20, marginTop: 5 }}>
  //       <Text variant="titleSmall" style={{ color: colors.liked }}>
  //         {error?.toString()}
  //       </Text>
  //     </View>
  //   );
  // }, [error]);

  // renders
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => {
          createUser({ ...values, profileName: values.username, ...inputDate });
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
                  <Text variant="titleMedium">Welcome to Priders.net!</Text>
                  <Text variant="titleSmall">Create your account here</Text>
                </View>

                <Button
                  onPress={(e: GestureResponderEvent) => handleSubmit()}
                  disabled={isPending || !dirty}
                >
                  Create
                </Button>
              </View>

              <View style={{ marginHorizontal: 20, marginTop: 5 }}>
                <Text variant="titleSmall" style={{ color: colors.liked }}>
                  {error?.toString()}
                </Text>
              </View>

              <View style={styles.body}>
                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Username</Text>

                  <TextInput
                    placeholder="Username"
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
                    placeholder="Email"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

export default SignUp;

// import React, { useEffect, useState } from "react";
// import {
//   GestureResponderEvent,
//   StyleSheet,
//   View,
//   SafeAreaView,
// } from "react-native";
// import {
//   Button,
//   HelperText,
//   Text,
//   TextInput,
//   ThemeProvider,
// } from "react-native-paper";
// import * as yup from "yup";
// import { Formik, FormikErrors, ErrorMessage } from "formik";
// import { useLogin } from "../../react-query-hooks/useAuth/useLogin";
// import * as SecureStore from "expo-secure-store";
// import { useTheme } from "react-native-paper";
// import axios, { AxiosError } from "axios";
// import baseUrl from "../../utils/baseUrl";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// import {
//   signUpValuesType,
//   useSignUp,
// } from "../../react-query-hooks/useAuth/useSignUp";
// import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
// // import { useAppTheme } from "../../../App";

// // const validationSchema = yup.object({
// //   username: yup.string().required("Name is required"),
// //   password: yup
// //     .string()

// //     .min(8, "Password should be of minimum 8 characters length")
// //     .required("Password is required"),
// // });

// const validationSchema = yup.object({
//   username: yup.string().required("Name is required"),
//   email: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .min(
//       8,
//       "Password should be of minimum 8 characters length and has an uppercase and an number"
//     )
//     .test("isValidPass", " is not valid", (value: any, context) => {
//       const hasUpperCase = /[A-Z]/.test(value);
//       const hasNumber = /[0-9]/.test(value);

//       if (hasUpperCase && hasNumber) {
//         return true;
//       }
//       return false;
//     })
//     .required("Password is required"),
//   passwordConfirm: yup
//     .string()
//     .oneOf([yup.ref("password")], { message: "Passwords must match" })
//     .required("Password is required"),
// });

// type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

// export default function SignUp({ navigation }: Props) {
//   // const theme = useAppTheme();

//   const [hidePassword, setHidePassword] = useState(true);
//   const { mutate: SignUpUser, status, data, error } = useSignUp();
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [responseError, setResponseError] = useState("");

//   useEffect(() => {
//     if (error && error instanceof AxiosError) {
//       if (error?.response?.status === 400) {
//         setResponseError("Your username or email is taken.");
//       } else if (error?.response?.status === 403) {
//         setResponseError("This username is not allowed");
//       } else {
//         setResponseError(
//           "Registration wasn't successful, please try another time"
//         );
//       }
//     }
//   }, [error]);

//   //   useEffect(() => {
//   //     async function getValueFor(key: string) {
//   //       let result = await SecureStore.getItemAsync(key);
//   //       if (result) {
//   //         alert("🔐 Here's your value 🔐 \n" + result);
//   //       } else {
//   //         alert("No values stored under that key.");
//   //       }
//   //     }

//   //     getValueFor("token");
//   //   }, []);

//   const createNewUser = async (values: signUpValuesType) => {
//     // try {
//     //   await axios.post(`${baseUrl}/users/signup`, values, {
//     //     withCredentials: true,
//     //   });
//     //   navigation.navigate("Login");
//     // } catch (err: any) {
//     //   // Handle Error Here
//     //   if (err.response.status === 400) {
//     //     setResponseError("Your username or email is taken.");
//     //   } else if (err.response.status === 401) {
//     //     setResponseError("Human verify failed");
//     //   } else if (err.response.status === 403) {
//     //     setResponseError("This username is not allowed");
//     //   } else {
//     //     setResponseError("Registration wasn't successful");
//     //   }
//     // }
//   };

//   return (
//     <SafeAreaView>
//       <Text>Welcome Back!</Text>
//       <Text>
//         Do not have an account yet? <Text>Create account</Text>
//       </Text>
//       <HelperText type="error" visible={!!responseError}>
//         {responseError}
//       </HelperText>
//       <Formik
//         initialValues={{
//           username: "",
//           password: "",
//           passwordConfirm: "",
//           email: "",
//         }}
//         onSubmit={(values) => {
//           console.log(values, "values");
//           setIsSubmitted(true);
//           //   SignUpUser(values);
//         }}
//         validationSchema={validationSchema}
//       >
//         {({
//           handleSubmit,
//           values,
//           handleBlur,
//           handleChange,
//           errors,
//           isSubmitting,
//           submitCount,
//         }) => (
//           <View>
//             <TextInput
//               label="Email"
//               value={values.email}
//               onChangeText={handleChange("email")}
//             />

//             <TextInput
//               label="Username"
//               value={values.username}
//               onChangeText={handleChange("username")}
//             />

//             <TextInput
//               label="Password"
//               value={values.password}
//               onChangeText={handleChange("password")}
//               secureTextEntry={hidePassword}
//               right={
//                 <TextInput.Icon
//                   icon={hidePassword ? "eye-off" : "eye"}
//                   onPress={() => setHidePassword(!hidePassword)}
//                 />
//               }
//             />
//             {/* <HelperText type="error" visible={!!errors.password}>
//               Password should be of minimum 8 characters length and has an
//               uppercase and an number
//             </HelperText> */}
//             <ErrorMessage name="password">
//               {(msg) => <HelperText type="error">{msg}</HelperText>}
//             </ErrorMessage>
//             <TextInput
//               label="Confirm your password"
//               value={values.passwordConfirm}
//               onChangeText={handleChange("passwordConfirm")}
//               secureTextEntry={hidePassword}
//               right={
//                 <TextInput.Icon
//                   icon={hidePassword ? "eye-off" : "eye"}
//                   onPress={() => setHidePassword(!hidePassword)}
//                 />
//               }
//             />
//             <Button onPress={(e: GestureResponderEvent) => handleSubmit()}>
//               Submit
//             </Button>
//           </View>
//         )}
//       </Formik>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   LoginContainer: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 50,
//     // backgroundColor: theme.colors.warmGrey,
//   },
// });
