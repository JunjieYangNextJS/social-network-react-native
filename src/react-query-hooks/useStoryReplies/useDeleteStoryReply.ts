import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';


export default function useDeleteStoryReply(storyId: string, storyComment: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (storyReplyId: string) =>
    axios.delete(`${baseUrl}/storyReplies/${storyReplyId}`, {
      withCredentials: true,

    }),

    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [['story', storyId, 'comments'], ['user']], exact: true});

        // if (storyComment)
        //   queryClient.invalidateQueries(['storyComment', storyComment]);
        // showSuccess('Your reply was successfully deleted.');
      }
  }
    

    
      
    
  );
}
