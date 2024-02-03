import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';

export default function usePatchUnderstatedStoryComment(storyCommentId: string, storyId: string) {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
    axios
      .patch(`${baseUrl}/storyComments/${storyCommentId}/update-understated`, {}, {
        withCredentials: true,
 
      }).then((res) => res.data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["story", storyId, "comments"]});
        // queryClient.invalidateQueries("user");
      },
    
  }
    
  );
}