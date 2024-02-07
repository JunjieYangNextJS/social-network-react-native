import { create } from "zustand";

type ScreenName = "" | "Profile" | "Notifications";

interface NavigationStore {
    previousScreen: ScreenName 
    onSetPreviousScreen: (screenName: ScreenName ) => void;
}

const useNavStore = create<NavigationStore>((set) => ({
    previousScreen: "",
    onSetPreviousScreen: (screenName: ScreenName ) => set({previousScreen: screenName}),
    
 
}))

export default useNavStore