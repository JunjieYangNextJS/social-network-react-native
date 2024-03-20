import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Text, Button, HelperText } from "react-native-paper";

import { useAppTheme } from "../../theme";
import * as yup from "yup";
import { Formik } from "formik";
import PasswordInput from "../../components/PasswordInput";

import PridersNetText from "../../components/PridersNetText";
import {
  useGuestLogin,
  useLogin,
} from "../../react-query-hooks/useAuth/useLogin";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import * as Device from "expo-device";
import { RootStackParamList } from "../../navigators/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
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
});

const Login = ({ navigation }: Props) => {
  const { colors } = useAppTheme();

  const { mutate: loginUser, isPending, error } = useLogin();
  const {
    mutate: loginGuest,
    isPending: guestIsPending,
    // error: guestIsError,
  } = useGuestLogin();

  const handleLoginGuest = () => {
    const modelName = Device.modelName;
    const createdThrough = Device.osName;
    loginGuest({ modelName, createdThrough });
  };

  //   refs
  const ref_input2 = useRef<any>();

  // renders
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          loginUser(values);
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
          const isInvalid = values.password === "" || values.username === "";

          return (
            <View>
              <View style={styles.header}>
                <View>
                  <Text variant="titleMedium">
                    Welcome to <PridersNetText variant="titleMedium" />!
                  </Text>
                  <Text variant="titleSmall">Login your account here</Text>
                </View>

                <Button
                  onPress={(e: GestureResponderEvent) => handleSubmit()}
                  disabled={isPending || guestIsPending || isInvalid}
                >
                  Login
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
                    autoFocus={true}
                  />
                </View>
                <View style={styles.helperTextWrapper}>
                  <HelperText type="error" visible={submitCount > 0}>
                    {submitCount > 0 && errors.username}
                  </HelperText>
                </View>

                <View style={styles.inputLabelWrapper}>
                  <Text style={styles.label}>Password</Text>

                  <PasswordInput
                    placeholder="********"
                    defaultStyle={styles.input}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={handleChange("password")}
                    ref={ref_input2}
                  />
                </View>
                <View style={styles.helperTextWrapper}>
                  <HelperText type="error" visible={submitCount > 0}>
                    {submitCount > 0 && errors.password}
                  </HelperText>
                </View>
              </View>
              <View style={{ paddingHorizontal: 60 }}>
                <Button
                  onPress={handleLoginGuest}
                  disabled={isPending || guestIsPending}
                >
                  Continue as guest
                </Button>
                {/* <Button onPress={(e: GestureResponderEvent) => handleSubmit()}>
                  Submit
                </Button> */}

                <Button onPress={() => navigation.navigate("SignUp")}>
                  Sign up
                </Button>
                <Button onPress={() => navigation.navigate("ForgotMyPassword")}>
                  Forgot password?
                </Button>
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

export default Login;

// import React, { useEffect, useState } from "react";
// import { GestureResponderEvent, StyleSheet, View } from "react-native";
// import {
//   Button,
//   HelperText,
//   Text,
//   TextInput,
//   ThemeProvider,
// } from "react-native-paper";
// import * as yup from "yup";
// import { Formik } from "formik";
// import {
//   useGuestLogin,
//   useLogin,
// } from "../../react-query-hooks/useAuth/useLogin";
// import * as SecureStore from "expo-secure-store";
// import { useTheme } from "react-native-paper";

// import useUserTokenStore from "../../store/useUserTokenStore";

// // import { useAppTheme } from "../../../App";

// import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// import { CommonActions } from "@react-navigation/native";
// import { AuthStackParamList } from "../../navigators/AuthStackNavigator";

// type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

// const validationSchema = yup.object({
//   username: yup.string().required("Name is required"),
//   password: yup
//     .string()

//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });

// export default function Login({ navigation }: Props) {
//   // const theme = useAppTheme();

//   const setAuthenticated = useUserTokenStore((state) => state.setAuthenticated);

//   const handleNavigation = () => setAuthenticated();

//   const [hidePassword, setHidePassword] = useState(true);
//   const { mutate: loginUser, status, data } = useLogin({ handleNavigation });
//   const { mutate: loginGuest } = useGuestLogin({ handleNavigation });

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

//   return (
//     <View style={styles.LoginContainer}>
//       <Text>Welcome Back!</Text>
//       <Text>
//         Do not have an account yet? <Text>Create account</Text>
//       </Text>
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         onSubmit={(values) => {
//           // console.log(values, "values");
//           loginUser(values);
//         }}
//         validationSchema={validationSchema}
//       >
//         {({ handleSubmit, values, handleBlur, handleChange, errors }) => (
//           <View>
//             <TextInput
//               label="Username"
//               value={values.username}
//               onChangeText={handleChange("username")}
//             />
//             {/* <HelperText type="error" visible={!!errors.username}>
//               Username is invalid
//             </HelperText> */}
//             <TextInput
//               label="Password"
//               value={values.password}
//               onChangeText={handleChange("password")}
//               secureTextEntry={hidePassword}
//               right={
//                 <TextInput.Icon
//                   icon="eye"
//                   onPress={() => setHidePassword(!hidePassword)}
//                 />
//               }
//             />
//             <Button>Forgot password?</Button>
//             <Button onPress={() => navigation.navigate("Login")}>
//               Sign up?
//             </Button>
//             <Button onPress={() => loginGuest()}>Continue as guest</Button>
//             <Button onPress={(e: GestureResponderEvent) => handleSubmit()}>
//               Submit
//             </Button>
//           </View>
//         )}
//       </Formik>
//     </View>
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
