import { create } from "zustand";
import { About, SortByValue } from "../../types";


interface PostsFilterStore {
   about: About;
   onSetAbout: (value: About) => void;
   sort: SortByValue;
   onSetSort: (sort: SortByValue) => void;
}

const usePostsFilterStore = create<PostsFilterStore>((set) => ({
    about: "General",
    sort: "-lastCommentedAt",
    onSetAbout: (about: About) => set({about}),
    onSetSort: (sort: SortByValue) => set({sort}),
}))

export default usePostsFilterStore