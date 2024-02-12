import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import useToastStore from '../../store/useToastStore';

export default function useCreatePostComment(postId: string) {
    const queryClient = useQueryClient();
    const {onOpenToast} = useToastStore()

  return useMutation({
    mutationFn: async (values: {content: string, post: string, poster:string}) => {
      const token = await getItemAsync("token");

      return axios.post(`${baseUrl}/postComments`, values, {
        
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }).then((res) => res.data.data.data)

    },

    onSuccess: () => {
      onOpenToast("success", "Your comment has been posted!")
        queryClient.invalidateQueries({queryKey: ['post', postId], exact: true});
        queryClient.invalidateQueries({queryKey: ["post", postId, "comments"]});
      }
  }
  )} 