import { create } from "zustand";



interface ReplyBottomSheetStore {
   replyTo: string,
   willReply: boolean,
   setReplyTo: (replyTo: string) => void;
   resetReplyTo: () => void;
   setWillReply: (willReply: boolean) => void;
}

const useReplyBottomSheetStore = create<ReplyBottomSheetStore>((set) => ({
    replyTo: "",
    willReply: false,
    setReplyTo: (replyTo: string) => set({replyTo: `<u>@${replyTo}</u> `}),
    resetReplyTo: () => set({replyTo: ''}),
    setWillReply: (willReply: boolean) => set({willReply}),
}))

export default useReplyBottomSheetStore