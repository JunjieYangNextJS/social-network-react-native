import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import * as SecureStore  from 'expo-secure-store';

export default function useDeletePostReply(postId: string, postComment: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postReplyId: string) => {
      const token = await SecureStore.getItemAsync('token');

      return axios.delete(`${baseUrl}/postReplies/${postReplyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    },
      
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [['post', postId, 'comments'], ['user'], ['postComment', postComment]], exact: true})
    },
    onError: () => {
      console.log('nah')
    }
  }
    
  );
}