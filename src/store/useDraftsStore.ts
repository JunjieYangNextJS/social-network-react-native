import { create } from "zustand";

interface DraftsStore {
   draftsIsOpen: boolean;
   onOpenDrafts: () => void;
   onCloseDrafts: () => void;


}

const useDraftsStore = create<DraftsStore>((set) => ({
    draftsIsOpen: false,
    onOpenDrafts: () => set({draftsIsOpen: true}),
    onCloseDrafts: () => set({draftsIsOpen: false}),
 
}))

export default useDraftsStore