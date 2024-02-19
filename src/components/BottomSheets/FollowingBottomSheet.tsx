import React, { RefObject, useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TextInput,
  useWindowDimensions,
} from "react-native";
import {
  Text,
  Button,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import BottomSheet, {
  BottomSheetModalProps,
  BottomSheetModal,
  BottomSheetTextInput,
  useBottomSheetModal,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../../theme";

import { DisplayedFollowing, User } from "../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useGetFollowers,
  useGetFollowing,
} from "../../react-query-hooks/useOtherUsers/useOtherUser";
import UserInfoContainer from "../UserInfoContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import FollowButton from "../Buttons/FollowButton";

// interface ChildComponentProps {
//   bio?: string;
//   onChangeText: (field: string) => (e: string | React.ChangeEvent<any>) => void;
// }
// interface ChildComponentRef {
//   FollowingBottomSheetModalRef:
//     | React.RefObject<BottomSheetModalMethods>
//     | RefObject<ChildComponentRef>;
// }

interface IFollowingBottomSheet extends BottomSheetModalProps {
  username: string;
  title: string;
  userRoute?: "P_OtherUser";
  type: "Following" | "Followers";

  //   handleBioModalPress: () => void;
}

const FollowingBottomSheet = React.forwardRef<
  BottomSheetModal,
  IFollowingBottomSheet
>((props, ref) => {
  const { colors } = useAppTheme();
  const { dismiss } = useBottomSheetModal();
  const { height } = useWindowDimensions();
  const route = useRoute();
  const { top: statusBarHeight } = useSafeAreaInsets();
  const parentNavigation = useNavigation().getParent();

  // variables
  const snapPoints = useMemo(() => [height - statusBarHeight], []);

  // data
  const { data: followingData } = useGetFollowing(props.username, props.type);
  const { data: followersData } = useGetFollowers(props.username, props.type);

  const data = useMemo(() => {
    let data;
    if (props.type === "Followers") data = followersData;
    if (props.type === "Following") data = followingData;
    return data;
  }, [followingData, followersData, props.type]);

  const renderItem = ({ item }: { item: DisplayedFollowing }) => {
    const { photo, username, profileName, _id, bio } = item;

    const navigateToUserPage = () => {
      // onSetPreviousScreen("Notifications");
      dismiss(props.username + props.type);
      parentNavigation?.navigate(props.userRoute || route.name, {
        username,
        profileImage: undefined,
      });
      // navigation.navigate("OtherUser", {
      //   username: sender.username,
      //   photo: user.photo,
      // });
    };

    return (
      <View style={styles.itemContainer}>
        <UserInfoContainer
          photo={photo}
          username={username}
          profileName={profileName}
          navigateToUserPage={navigateToUserPage}
        />
        {bio && (
          <Text
            variant="bodyMedium"
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{ flex: 1, marginLeft: 20, maxWidth: 200 }}
          >
            {bio}
          </Text>
        )}
      </View>
    );
  };

  if (!data) {
    return <ActivityIndicator />;
  }

  // renders

  return (
    <View>
      {/* <Button onPress={handleBioModalPress}>Edit</Button> */}
      <BottomSheetModal
        name={props.username + props.type}
        keyboardBehavior="interactive"
        index={0}
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
      >
        <View style={styles.header}>
          <Text variant="titleMedium">{props.title}</Text>
        </View>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item: any) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    marginVertical: 25,
    marginHorizontal: 20,
    // alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    // flexWrap: "wrap",
  },
});

export default FollowingBottomSheet;
