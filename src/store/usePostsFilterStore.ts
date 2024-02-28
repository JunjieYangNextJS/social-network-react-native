import { create } from "zustand";

interface PostsFilterStore {
   postsFilterIsOpen: boolean;
   onOpenPostsFilter: () => void;
   onClosePostsFilter: () => void;


}

const usePostsFilterStore = create<PostsFilterStore>((set) => ({
    postsFilterIsOpen: false,
    onOpenPostsFilter: () => set({postsFilterIsOpen: true}),
    onClosePostsFilter: () => set({postsFilterIsOpen: false}),
 
}))

export default usePostsFilterStore