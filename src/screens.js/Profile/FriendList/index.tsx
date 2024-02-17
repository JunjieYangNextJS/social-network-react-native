import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import useUser from "../../../react-query-hooks/useUser/useUser";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Friend } from "../../../../types";
import { ProfileDrawerParamList } from "../../../navigators/ProfileStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import PressableAvatar from "../../../components/PressableAvatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<ProfileDrawerParamList, "FriendList">;

export default function FriendList({ navigation, route }: Props) {
  const { data: user } = useUser();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const parentNavigation = useNavigation().getParent();

  if (!user) {
    return <ActivityIndicator />;
  }

  const { friendList } = user;

  if (friendList.length < 1) {
    return <Text style={styles.noFriends}>You haven't added any friend.</Text>;
  }

  const renderPostItem = (itemData: any) => {
    const { username, profileName, _id, sexuality, gender, photo } =
      itemData.item as Friend;

    const navigateToUserPage = () => {
      // onSetPreviousScreen("Notifications");

      parentNavigation?.navigate("P_OtherUser", {
        username,
        profileImage: undefined,
      });
      // navigation.navigate("OtherUser", {
      //   username: sender.username,
      //   photo: user.photo,
      // });
    };

    return (
      <View>
        <PressableAvatar
          photo={photo}
          size={40}
          navigateToUserPage={navigateToUserPage}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ minHeight: height - top - bottom }}>
      <FlashList
        data={friendList}
        keyExtractor={(item: Friend) => item._id}
        renderItem={renderPostItem}
        estimatedItemSize={friendList.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noFriends: {
    fontSize: 20,
    margin: 30,
    marginTop: 60,
    marginLeft: 35,
    lineHeight: 30,
  },
});
