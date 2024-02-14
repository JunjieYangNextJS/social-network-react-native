import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  ThemeProvider,
} from "react-native-paper";
import * as yup from "yup";
import { Formik, FormikErrors, ErrorMessage } from "formik";
import { useLogin } from "../../react-query-hooks/useAuth/useLogin";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "react-native-paper";
import axios, { AxiosError } from "axios";
import baseUrl from "../../utils/baseUrl";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  signUpValuesType,
  useSignUp,
} from "../../react-query-hooks/useAuth/useSignUp";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
// import { useAppTheme } from "../../../App";

// const validationSchema = yup.object({
//   username: yup.string().required("Name is required"),
//   password: yup
//     .string()

//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
// });

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

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export default function SignUp({ navigation }: Props) {
  // const theme = useAppTheme();

  const [hidePassword, setHidePassword] = useState(true);
  const { mutate: SignUpUser, status, data, error } = useSignUp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    if (error && error instanceof AxiosError) {
      if (error?.response?.status === 400) {
        setResponseError("Your username or email is taken.");
      } else if (error?.response?.status === 401) {
        setResponseError("Human verify failed");
      } else if (error?.response?.status === 403) {
        setResponseError("This username is not allowed");
      } else {
        setResponseError("Registration wasn't successful");
      }
    }
  }, [error]);

  //   useEffect(() => {
  //     async function getValueFor(key: string) {
  //       let result = await SecureStore.getItemAsync(key);
  //       if (result) {
  //         alert("🔐 Here's your value 🔐 \n" + result);
  //       } else {
  //         alert("No values stored under that key.");
  //       }
  //     }

  //     getValueFor("token");
  //   }, []);

  const createNewUser = async (values: signUpValuesType) => {
    // try {
    //   await axios.post(`${baseUrl}/users/signup`, values, {
    //     withCredentials: true,
    //   });
    //   navigation.navigate("Login");
    // } catch (err: any) {
    //   // Handle Error Here
    //   if (err.response.status === 400) {
    //     setResponseError("Your username or email is taken.");
    //   } else if (err.response.status === 401) {
    //     setResponseError("Human verify failed");
    //   } else if (err.response.status === 403) {
    //     setResponseError("This username is not allowed");
    //   } else {
    //     setResponseError("Registration wasn't successful");
    //   }
    // }
  };

  return (
    <SafeAreaView>
      <Text>Welcome Back!</Text>
      <Text>
        Do not have an account yet? <Text>Create account</Text>
      </Text>
      <HelperText type="error" visible={!!responseError}>
        {responseError}
      </HelperText>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirm: "",
          email: "",
        }}
        onSubmit={(values) => {
          console.log(values, "values");
          setIsSubmitted(true);
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
        }) => (
          <View>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />

            <TextInput
              label="Username"
              value={values.username}
              onChangeText={handleChange("username")}
            />

            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry={hidePassword}
              right={
                <TextInput.Icon
                  icon={hidePassword ? "eye-off" : "eye"}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />
            {/* <HelperText type="error" visible={!!errors.password}>
              Password should be of minimum 8 characters length and has an
              uppercase and an number
            </HelperText> */}
            <ErrorMessage name="password">
              {(msg) => <HelperText type="error">{msg}</HelperText>}
            </ErrorMessage>
            <TextInput
              label="Confirm your password"
              value={values.passwordConfirm}
              onChangeText={handleChange("passwordConfirm")}
              secureTextEntry={hidePassword}
              right={
                <TextInput.Icon
                  icon={hidePassword ? "eye-off" : "eye"}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />
            <Button onPress={(e: GestureResponderEvent) => handleSubmit()}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 50,
    // backgroundColor: theme.colors.warmGrey,
  },
});
