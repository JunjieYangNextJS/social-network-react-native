import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
} from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../theme";
import * as yup from "yup";
import { Formik, FormikErrors, ErrorMessage } from "formik";
import { User } from "../../../types";

const validationSchema = yup.object({
  profileName: yup.string(),
  location: yup.string(),

  gender: yup.string(),

  sexuality: yup.string(),
  twitter: yup.string(),
  bio: yup.string(),
});

const EditProfileBottomSheet = ({ user }: { user: User }) => {
  const { profileName, location, gender, sexuality, twitter, bio } = user;

  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // renders
  return (
    <View>
      <Button onPress={handlePresentModalPress}>Edit</Button>
      <BottomSheetModal
        name="EditProfile"
        keyboardBehavior="interactive"
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
      >
        <View style={styles.contentContainer}>
          <Formik
            initialValues={{
              profileName,
              location,
              //   gender: "",
              //   sexuality: "",
              twitter,
              bio,
            }}
            onSubmit={(values) => {
              console.log(values, "values");

              //   SignUpUser(values);
            }}
            // validationSchema={validationSchema}
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
                <View style={styles.header}>
                  <Button onPress={() => dismiss("EditProfile")}>Cancel</Button>
                  <Text variant="titleMedium">Edit Profile</Text>
                  <Button
                    disabled={!dirty}
                    onPress={(e: GestureResponderEvent) => handleSubmit()}
                  >
                    Save
                  </Button>
                </View>
                <View style={styles.body}>
                  <View style={styles.inputLabelWrapper}>
                    <Text style={styles.label}>Profile Name</Text>
                    <TextInput
                      value={values.profileName}
                      onChangeText={handleChange("profileName")}
                      style={styles.input}
                      placeholderTextColor={"white"}
                    />
                  </View>
                  <View style={styles.inputLabelWrapper}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                      placeholder="Austin, TX"
                      style={styles.input}
                      value={values.location}
                      onChangeText={handleChange("location")}
                      placeholderTextColor={colors.placeholder}
                    />
                  </View>
                  <View style={styles.inputLabelWrapper}>
                    <Text style={styles.label}>Twitter</Text>
                    <TextInput
                      placeholder="Your twitter"
                      style={styles.input}
                      value={values.twitter}
                      onChangeText={handleChange("twitter")}
                      placeholderTextColor={colors.placeholder}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </BottomSheetModal>
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

export default EditProfileBottomSheet;
