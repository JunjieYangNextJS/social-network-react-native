import React, { useLayoutEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import useUser from "../../react-query-hooks/useUser/useUser";
import { HeaderBackButton } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useNavStore from "../../store/useNavStore";
import {
  Swipeable,
  PanGestureHandler,
  GestureEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "OtherUser">;

export default function OtherUser({ route, navigation }: Props) {
  const { data: user } = useUser();
  const { username, photo } = route.params;

  const insets = useSafeAreaInsets();
  const { previousScreen, onSetPreviousScreen } = useNavStore();

  const navigateToPrevious = () => {
    if (!previousScreen) {
      navigation.goBack();
    } else {
      navigation.navigate(previousScreen);
      navigation.pop();

      onSetPreviousScreen("");
    }
  };

  useLayoutEffect(() => {
    const statusBarHeight = insets.top;

    const MyHeader = () => (
      <ImageBackground source={{ uri: photo }} style={{ height: 200 }}>
        <HeaderBackButton
          canGoBack={true}
          label="Back"
          onPress={() => navigateToPrevious()}
          style={{ marginTop: statusBarHeight }}
        />
      </ImageBackground>
    );

    navigation.setOptions({
      header: MyHeader,
    });
  }, [navigation, username]);

  return (
    <SafeAreaView>
      <Text>{username}</Text>
    </SafeAreaView>
  );
}
