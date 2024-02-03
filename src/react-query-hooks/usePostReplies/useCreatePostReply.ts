import { useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export default function useCreatePostReply(postComment: string) {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: {content: string, postComment: string}) => {
      const token = await getItemAsync("token");

      

      return axios.post(`${baseUrl}/postReplies`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data.data.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postComment', postComment]})
    }
      

     
  }
  )} 