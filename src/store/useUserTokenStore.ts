import { create } from "zustand";

interface UserTokenStore {
    // userToken: string,
    // onSetUserToken: (userToken: string) => void;
    authenticated: boolean,
    setAuthenticated: () => void;
    setLogout: () => void;
}

const useUserTokenStore = create<UserTokenStore>((set) => ({
    // userToken: "",
    // onSetUserToken: (userToken) => set({userToken}),
    authenticated: false,
    setAuthenticated: () => set(({authenticated: true})),
    setLogout: () => set(({authenticated: false}))
}))

export default useUserTokenStore