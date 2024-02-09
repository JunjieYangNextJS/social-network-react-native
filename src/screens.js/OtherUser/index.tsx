import React, { useCallback, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground } from "expo-image";
import useUser from "../../react-query-hooks/useUser/useUser";
import { HeaderBackButton } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useOtherUser from "../../react-query-hooks/useOtherUsers/useOtherUser";
import { useFocusEffect } from "@react-navigation/native";
import OUProfileMenu from "../../components/Menus/OUProfileMenu";
import OtherUserIntroSection from "./OtherUserIntroSection";
import { useAppTheme } from "../../theme";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OtherUser" | "N_OtherUser"
>;

export default function OtherUser({ route, navigation }: Props) {
  const { data: user } = useUser();
  const { username: ouUsername, profileImage } = route.params;

  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  const {
    data: otherUser,
    status,
    error,
    refetch,
    isError,
  } = useOtherUser(ouUsername);

  useLayoutEffect(() => {
    const statusBarHeight = insets.top;

    const MyHeader = () => {
      if (isError) {
        return (
          <ImageBackground
            source={{
              uri: "https://s3.us-west-1.amazonaws.com/priders.net-images-bucket/bfc086cd-a2c4-41af-90b5-ec4b548af0c8.jpeg",
            }}
            style={{ height: 160 }}
          >
            <HeaderBackButton
              canGoBack={true}
              label="Back"
              onPress={() => navigation.goBack()}
              style={{ marginTop: statusBarHeight }}
            />
            <Avatar.Image
              size={100}
              source={() => (
                <Image
                  source={{
                    uri: "https://s3.us-west-1.amazonaws.com/priders.net-images-bucket/bfc086cd-a2c4-41af-90b5-ec4b548af0c8.jpeg",
                  }}
                  style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
                />
              )}
              style={styles.avatar}
            />
          </ImageBackground>
        );
      }

      return (
        <ImageBackground
          source={{
            uri: profileImage || otherUser?.profileImage,
          }}
          style={{ height: 160 }}
        >
          <HeaderBackButton
            canGoBack={true}
            label="Back"
            onPress={() => navigation.goBack()}
            style={{ marginTop: statusBarHeight }}
          />
          <Avatar.Image
            size={100}
            source={() => (
              <Image
                source={{
                  uri: otherUser?.photo,
                }}
                style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
              />
            )}
            style={styles.avatar}
          />
        </ImageBackground>
      );
    };

    navigation.setOptions({
      header: MyHeader,
    });
  }, [navigation, otherUser, isError]);

  if (error) {
    return <Text style={styles.error}>{error?.toString()}</Text>;
  }

  if (!otherUser || !user) {
    return <ActivityIndicator />;
  }

  const { profileName, username, id, bio, friendList } = otherUser;

  return (
    <SafeAreaView>
      <View>
        <View style={styles.nameMenuWrapper}>
          <View>
            <Text
              style={{ fontSize: 20, marginBottom: 2, color: "white" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {profileName}
            </Text>
            <Text
              style={{ color: theme.colors.dimmed }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              @{username}
            </Text>
          </View>

          <OUProfileMenu
            me={user}
            username={username}
            id={id}
            bio={bio}
            friendList={friendList}
          />
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, marginHorizontal: 15 }}
        >
          <OtherUserIntroSection otherUser={otherUser} user={user} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: 20,
    margin: 30,
    marginTop: 60,
    marginLeft: 35,
    lineHeight: 30,
  },
  avatar: {
    position: "absolute",
    marginTop: 110,
    marginLeft: 10,
  },
  nameMenuWrapper: {
    marginLeft: 120,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
  },
  nameWrapper: {},
});
