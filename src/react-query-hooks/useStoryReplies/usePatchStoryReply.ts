import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseUrl from "../../utils/baseUrl";

export default function usePatchStoryReply(storyReplyId: string, storyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
    axios
      .patch(`${baseUrl}/storyReplies/${storyReplyId}`, values, {
        withCredentials: true,

      })
      .then((res) => res.data),


    // onError: () => {
    //     showError("Something went wrong");
    //   },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["story", storyId, "comments"], exact: true});
        // queryClient.invalidateQueries("user");
      },
  }
    
  );
}
