import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useDeleteStoryComment(storyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storyCommentId: string) =>
      axios.patch(`${baseUrl}/storyComments/deletion/${storyCommentId}`,{story: storyId}, {
        withCredentials: true
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [['story', storyId], ["story", storyId, 'comments']], exact: true});
      }
  }

  );
}