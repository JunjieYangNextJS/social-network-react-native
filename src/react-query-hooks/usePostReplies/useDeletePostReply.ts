import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import * as SecureStore  from 'expo-secure-store';
import { PostComment } from '../../../types';

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
      
    onSuccess: (_,postReplyId) => {
      queryClient.setQueryData(['postComment', postComment], (prev: PostComment) => {
        return {
          ...prev,
          postReplies: prev.postReplies.filter((postReply) => postReply._id !== postReplyId)
        }
    })
    },
    // onError: () => {
    //   console.log('nah')
    // }
  }
    
  );
}