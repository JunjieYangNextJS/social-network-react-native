import { create } from "zustand";

type Status = "success" | "loading" | "error" | "idle";

interface ToastStore {
   toastIsOpen: boolean;
   onOpenToast: (status: Status, message?: string) => void;
   onCloseToast: () => void;
   status: Status,
   message: string;
}

const useToastStore = create<ToastStore>((set) => ({
    toastIsOpen: false,
    onOpenToast: (status, message) => set({toastIsOpen: true, status, message}),
    onCloseToast: () => set({toastIsOpen: false}),
    status: "idle",
    message: ""
}))

export default useToastStore