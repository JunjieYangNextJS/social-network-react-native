import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Posts: any;
  Post: { postId: string };
  PostComment: { postCommentId: string; postTitle?: string };
  PostCreate: any;
  PostsSearch: any;
  Profile: any;
  Notifications: any;
  Chat: any;
  OtherUser: { username: string; photo: string };
  ProfileStackNavigator: any;
  NotificationsStackNavigator: any;
  PostsStackNavigator: any;
};

export type RootStackParamParent =
  | "Posts"
  | "Post"
  | "PostComment"
  | "Profile"
  | "Notifications"
  | "Chat"
  | "OtherUser";
