import { View, Text } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

export default function PostsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
}
