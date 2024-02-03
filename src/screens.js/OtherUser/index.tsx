import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import useUser from "../../react-query-hooks/useUser/useUser";

type Props = NativeStackScreenProps<RootStackParamList, "OtherUser">;

export default function OtherUser({ route, navigation }: Props) {
  const { data: user } = useUser();
  const { username, photo } = route.params || user;

  useLayoutEffect(() => {
    const MyHeader = () => (
      <ImageBackground source={{ uri: photo }} style={{ paddingTop: 200 }}>
        <Text style={{ color: "#fff" }}>My Header Title</Text>
      </ImageBackground>
    );

    navigation.setOptions({
      header: MyHeader,
    });
  }, [navigation, username]);

  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
}
