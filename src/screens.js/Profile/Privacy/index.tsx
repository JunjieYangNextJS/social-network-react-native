import {
  View,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Icon,
  Switch,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import OpenChatBottomSheet from "./OpenChatBottomSheet";
import useUser from "../../../react-query-hooks/useUser/useUser";
import OpenPostsBottomSheet from "./OpenPostsBottomSheet";
import { usePatchUserPrivacy } from "../../../react-query-hooks/useUser/usePatchUser";

export default function Privacy() {
  const { data: user } = useUser();
  // mutation
  const { mutate: handleFollowing, isPending: isFollowingPending } =
    usePatchUserPrivacy();
  const { mutate: handleFriending, isPending: isFriendingPending } =
    usePatchUserPrivacy();

  const whoCanMessageMeLabel = useMemo(() => {
    let value: string;
    switch (user?.whoCanMessageMe) {
      case "anyone":
        value = "Everyone";
        break;
      case "friendsOnly":
        value = "Friends Only";
        break;
      case "none":
        value = "None";
        break;
      default:
        value = "Everyone";
        break;
    }
    return value;
  }, [user]);

  const postsExposedToLabel = useMemo(() => {
    let value: string;
    switch (user?.postsExposedTo) {
      case "public":
        value = "Everyone";
        break;
      case "friendsOnly":
        value = "Friends Only";
        break;
      case "friendsAndFollowersOnly":
        value = "Friends and followers";
        break;
      case "private":
        value = "Myself only";
        break;
      default:
        value = "Everyone";
        break;
    }
    return value;
  }, [user]);

  if (!user) {
    return <ActivityIndicator />;
  }

  const { whoCanMessageMe, postsExposedTo, allowFollowing, allowFriending } =
    user;

  // switches
  const [isFollowingAllowed, setIsFollowingAllowed] = useState(allowFollowing);

  const [isFriendingAllowed, setIsFriendingAllowed] = useState(allowFriending);

  const onToggleFollowingAllowed = () => {
    handleFollowing({ allowFollowing: !isFollowingAllowed });
    setIsFollowingAllowed((prev) => !prev);
  };

  const onToggleFriendingAllowed = () => {
    handleFriending({ allowFriending: !isFriendingAllowed });
    setIsFriendingAllowed((prev) => !prev);
  };

  // refs
  const OpenChatBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const OpenChatBottomSheetModalPress = useCallback(() => {
    OpenChatBottomSheetModalRef.current?.present();
  }, []);

  const OpenPostsBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const OpenPostsBottomSheetModalPress = useCallback(() => {
    OpenPostsBottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsWrapper}>
        <View style={styles.item}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Open chat to</Text>
          </View>
          <TouchableRipple onPress={OpenChatBottomSheetModalPress}>
            <View style={styles.optionWrapper}>
              <Text style={styles.option}>{whoCanMessageMeLabel} </Text>
              <View>
                <Icon source="chevron-down" size={24} />
              </View>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.item}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              Open non-private posts listed in my profile to
            </Text>
          </View>
          <TouchableRipple onPress={OpenPostsBottomSheetModalPress}>
            <View style={styles.optionWrapper}>
              <Text style={styles.option}>{postsExposedToLabel} </Text>
              <View>
                <Icon source="chevron-down" size={24} color="#b3b3b3" />
              </View>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.item}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Allow new followers</Text>
          </View>
          <View style={styles.optionWrapper}>
            <Switch
              value={isFollowingAllowed}
              onValueChange={onToggleFollowingAllowed}
              disabled={isFollowingPending}
            />
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Allow new friend requests</Text>
          </View>
          <View style={styles.optionWrapper}>
            <Switch
              value={isFriendingAllowed}
              onValueChange={onToggleFriendingAllowed}
              disabled={isFriendingPending}
            />
          </View>
        </View>
      </View>
      <OpenChatBottomSheet
        enablePanDownToClose={true}
        whoCanMessageMe={whoCanMessageMe}
        ref={OpenChatBottomSheetModalRef}
      >
        <></>
      </OpenChatBottomSheet>
      <OpenPostsBottomSheet
        enablePanDownToClose={true}
        postsExposedTo={postsExposedTo}
        ref={OpenPostsBottomSheetModalRef}
      >
        <></>
      </OpenPostsBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemsWrapper: { padding: 30 },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
  },
  titleWrapper: {
    maxWidth: 200,
    // display: "flex",
    // flexDirection: "row",
  },
  title: {
    fontSize: 16,

    fontWeight: "500",
  },
  description: {},
  optionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  option: {
    fontSize: 16,
    color: "#b3b3b3",
  },
  optionIcon: {},
});
