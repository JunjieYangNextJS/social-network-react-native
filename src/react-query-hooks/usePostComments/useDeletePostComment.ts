import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useDeletePostComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postCommentId: string) =>
      axios.patch(`${baseUrl}/postComments/deletion/${postCommentId}`,{post: postId}, {
        withCredentials: true
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['post', postId], exact: true});
      }
  }

  );
}