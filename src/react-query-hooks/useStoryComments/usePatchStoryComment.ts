import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';

export default function usePatchStoryComment(storyCommentId: string) {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn:  values =>
    axios
      .patch(`${baseUrl}/storyComments/${storyCommentId}`, values, {
        withCredentials: true,
 
      }),
    // onSuccess: () => {
    //     queryClient.invalidateQueries({queryKey: ["story", storyId, "comments"]});
    //     // queryClient.invalidateQueries("user");
    //   },
    
  }
    
  );
}