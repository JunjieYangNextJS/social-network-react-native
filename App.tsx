import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import theme from "./src/theme";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import Root from "./src/Root";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Root />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </QueryClientProvider>
    </>
  );
}
