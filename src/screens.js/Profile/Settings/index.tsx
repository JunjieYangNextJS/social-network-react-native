import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import useUser from "../../../react-query-hooks/useUser/useUser";
import { ActivityIndicator } from "react-native-paper";
import GuestSettings from "./GuestSettings";
import UserSettings from "./UserSettings";

export default function Settings() {
  const { data: user } = useUser();

  if (!user) return <ActivityIndicator />;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      {user.createdBy === "guest" ? (
        <GuestSettings />
      ) : (
        <UserSettings user={user} />
      )}
    </SafeAreaView>
  );
}
