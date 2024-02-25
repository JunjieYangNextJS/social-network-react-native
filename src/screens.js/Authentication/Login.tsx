import React, { useEffect, useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  ThemeProvider,
} from "react-native-paper";
import * as yup from "yup";
import { Formik } from "formik";
import {
  useGuestLogin,
  useLogin,
} from "../../react-query-hooks/useAuth/useLogin";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "react-native-paper";
import * as Linking from "expo-linking";
import useUserTokenStore from "../../store/useUserTokenStore";

// import { useAppTheme } from "../../../App";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CommonActions } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const validationSchema = yup.object({
  username: yup.string().required("Name is required"),
  password: yup
    .string()

    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login({ navigation }: Props) {
  // const theme = useAppTheme();

  const setAuthenticated = useUserTokenStore((state) => state.setAuthenticated);

  const handleNavigation = () => setAuthenticated();

  const [hidePassword, setHidePassword] = useState(true);
  const { mutate: loginUser, status, data } = useLogin({ handleNavigation });
  const { mutate: loginGuest } = useGuestLogin({ handleNavigation });

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

  return (
    <View style={styles.LoginContainer}>
      <Text>Welcome Back!</Text>
      <Text>
        Do not have an account yet? <Text>Create account</Text>
      </Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          // console.log(values, "values");
          loginUser(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, handleBlur, handleChange, errors }) => (
          <View>
            <TextInput
              label="Username"
              value={values.username}
              onChangeText={handleChange("username")}
            />
            {/* <HelperText type="error" visible={!!errors.username}>
              Username is invalid
            </HelperText> */}
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry={hidePassword}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />
            <Button>Forgot password?</Button>
            <Button onPress={() => navigation.navigate("SignUp")}>
              Sign up?
            </Button>
            <Button onPress={() => loginGuest()}>Continue as guest</Button>
            <Button onPress={(e: GestureResponderEvent) => handleSubmit()}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </View>
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
