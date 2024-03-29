import { adaptNavigationTheme } from "react-native-paper";
import ActionDialog from "./components/Dialogs/ActionDialog";
import StatusToast from "./components/Toasts/StatusToast";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
// import PostsAuthStackNavigator from "./navigators/PostsAuthStackNavigator";
import useUserTokenStore from "./store/useUserTokenStore";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import BottomTabNavigator from "./navigators/BottomTabNavigator";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendRequestDialog from "./components/Dialogs/FriendRequestDialog";
import * as Linking from "expo-linking";
import { Stack } from "./navigators/RootStackNavigator";

function Navigation({
  onLayoutRootView,
}: {
  onLayoutRootView: () => Promise<void>;
}) {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const authenticated = useUserTokenStore((state) => state.authenticated);

  const [linkingData, setLinkingData] = useState<any>(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ProfileStackNavigator: {
          screens: {
            Security: "Security",
          },
        },
      },
    },
  };

  const handleDeepLink = (event: any) => {
    let data = Linking.parse(event.url);
    setLinkingData(data);
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer
      onReady={onLayoutRootView}
      theme={DarkTheme}
      linking={linking as any}
    >
      {/* <AuthStackNavigator /> */}
      {authenticated ? <BottomTabNavigator /> : <AuthStackNavigator />}
      {/* <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
        ) : (
          <Stack.Screen
            name="AuthStackNavigator"
            component={AuthStackNavigator}
          />
        )}
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const prefix = Linking.createURL("/");

export default function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const userToken = useUserTokenStore((state) => state.userToken);
  // const onSetUserToken = useUserTokenStore((state) => state.onSetUserToken);
  const setAuthenticated = useUserTokenStore((state) => state.setAuthenticated);

  useEffect(() => {
    async function fetchStoredToken() {
      try {
        const token = await getItemAsync("token");

        if (token) setAuthenticated();
      } catch (error) {
        console.warn(error);
      } finally {
        // await SecureStore.deleteItemAsync("token");
        setAppIsReady(true);
      }
    }

    fetchStoredToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <Navigation onLayoutRootView={onLayoutRootView} />
      <StatusToast />
      <ActionDialog />
      <FriendRequestDialog />
    </>
  );
}
