import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseUrl from "../../utils/baseUrl";

export default function useCreateStoryReply() {

  return useMutation({
    mutationFn: (values) =>
    axios.post(`${baseUrl}/storyReplies`, values, {
      withCredentials: true,
      // credentials: "include",
    })
  }
  );
}
