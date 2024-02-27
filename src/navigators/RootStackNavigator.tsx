import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  // Post stack
  Posts: any;
  Post: { postId: string };
  PostComment: { postCommentId: string; postTitle?: string };
  PostCreate: any;
  PostDraft: { postId: string };
  PostsSearch: any;
  C_ChatRoom: { chatRoomId: string; username: string; otherUserId: string };
  // Profile: any;
  Security: any;
  P_Drawer: any;

  P_Post: { postId: string };
  P_PostComment: { postCommentId: string; postTitle?: string };
  P_OtherUser: { username: string; profileImage?: string };
  P_ChatRoom: { chatRoomId: string; username: string; otherUserId: string };

  // Noti stack
  Notifications: any;
  N_OtherUser: { username: string; profileImage?: string };
  N_Post: { postId: string };
  N_PostComment: { postCommentId: string; postTitle?: string };
  N_ChatRoom: { chatRoomId: string; username: string; otherUserId: string };

  Chat: any;
  ChatRoom: { chatRoomId: string; username: string; otherUserId: string };
  OtherUser: { username: string; profileImage?: string };

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
