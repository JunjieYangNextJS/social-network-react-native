import { MD3DarkTheme, useTheme } from "react-native-paper";

const theme = {
    ...MD3DarkTheme,
  
    // Specify a custom property
  
    // Specify a custom property in nested object
    colors: {
      ...MD3DarkTheme.colors,
      darkGreen: "#232F34",
      warmGrey: "#D8D8D8",
      lightGreen: "#90A4AE",
      vibrantGreen: "#1DB954",
      orange: "#FF7900",
      black: "#000000",
      white: "#FFFFFF",
      liked: "#F22625",
      trash: "#ba0000",
      bookmarked: "#DBD33E",
      card: "#222"
    },
  };
  
  export type AppTheme = typeof theme;
  
  export const useAppTheme = () => useTheme<AppTheme>();

  export default theme