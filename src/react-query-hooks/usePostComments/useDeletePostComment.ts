import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export default function useDeletePostComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    
    mutationFn: async (postCommentId: string) => {
      const token = await getItemAsync("token");
      return  axios.patch(`${baseUrl}/postComments/deletion/${postCommentId}`,{post: postId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    },
     
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["post", postId, "comments"]});
      }
  }

  );
}