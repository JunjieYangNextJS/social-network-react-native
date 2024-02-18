import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, Avatar, Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground } from "expo-image";
import useUser from "../../react-query-hooks/useUser/useUser";
// import { H } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";
import OUProfileMenu from "../../components/Menus/OUProfileMenu";
import { DrawerToggleButton } from "@react-navigation/drawer";

import { useAppTheme } from "../../theme";
import { ProfileDrawerParamList } from "../../navigators/ProfileStackNavigator";
import MyIntroSection from "./MyIntroSection";
import EditProfileBottomSheet from "../../components/BottomSheets/EditProfileBottomSheet";
import MyFollowingPeoplePosts from "./MyFollowingPeoplePosts";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {
  const { data: user, isError } = useUser();

  const { top: statusBarHeight, bottom: bottomNavigatorHeight } =
    useSafeAreaInsets();
  const theme = useAppTheme();

  // useLayoutEffect(() => {
  //   const MyHeader = () => {
  //     if (isError) {
  //       return (
  //         <ImageBackground
  //           source={{
  //             uri: "https://s3.us-west-1.amazonaws.com/priders.net-images-bucket/bfc086cd-a2c4-41af-90b5-ec4b548af0c8.jpeg",
  //           }}
  //           style={{ height: 160 }}
  //         >
  //           <View
  //             style={{
  //               marginTop: statusBarHeight,
  //             }}
  //           >
  //             <DrawerToggleButton tintColor="#fff" />
  //           </View>
  //           <Avatar.Image
  //             size={100}
  //             source={() => (
  //               <Image
  //                 source={{
  //                   uri: "https://s3.us-west-1.amazonaws.com/priders.net-images-bucket/bfc086cd-a2c4-41af-90b5-ec4b548af0c8.jpeg",
  //                 }}
  //                 style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
  //               />
  //             )}
  //             style={styles.avatar}
  //           />
  //         </ImageBackground>
  //       );
  //     }

  //     return (
  //       <ImageBackground
  //         source={{
  //           uri: user?.profileImage,
  //         }}
  //         style={{ height: 160 }}
  //       >
  //         <View
  //           style={{
  //             // probably some styling needed
  //             marginTop: statusBarHeight,
  //             // borderWidth: 1,
  //             // padding: 5,
  //             // borderRadius: 100,
  //             // width: 50,
  //             // height: 50,
  //           }}
  //         >
  //           <DrawerToggleButton tintColor="#fff" />
  //         </View>

  //         <Avatar.Image
  //           size={100}
  //           source={() => (
  //             <Image
  //               source={{
  //                 uri: user?.photo,
  //               }}
  //               style={[{ flex: 1, borderRadius: 100, width: "100%" }]}
  //             />
  //           )}
  //           style={styles.avatar}
  //         />
  //       </ImageBackground>
  //     );
  //   };

  //   navigation.setOptions({
  //     header: MyHeader,
  //   });
  // }, [navigation, user, isError]);

  if (!user) {
    return <ActivityIndicator />;
  }

  const { profileName, username, id, bio, friendList } = user;

  return (
    <SafeAreaView style={styles.container}>
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
          <EditProfileBottomSheet user={user} />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <MyIntroSection user={user} />
          <MyFollowingPeoplePosts user={user} />
          <View style={{ height: bottomNavigatorHeight + 20 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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
