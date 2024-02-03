import { create } from "zustand";



interface DialogStore {
   dialogIsOpen: boolean;
   onOpenDialog: (title: string, message: string, action: () => void) => void;
   onCloseDialog: () => void;
   title: string,
   message: string;
   action: () => void;

}

const useDialogStore = create<DialogStore>((set) => ({
    dialogIsOpen: false,
    onOpenDialog: (title, message, action) => set({dialogIsOpen: true, title, message, action}),
    onCloseDialog: () => set({dialogIsOpen: false, title: "", message: ""}),
    title: "",
    message: "",
    action: () => {}
}))

export default useDialogStore