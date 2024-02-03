import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';

export default function usePatchPostReply(postReplyId: string, postId: string) {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn:  values =>
    axios
      .patch(`${baseUrl}/postReplies/${postReplyId}`, values, {
        withCredentials: true,
 
      })
      .then(res => res.data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["post", postId, "comments"]})
    }
  
  }
    
  );
}