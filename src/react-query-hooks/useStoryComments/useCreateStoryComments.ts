import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useCreateStoryComment(postId: string) {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) =>
      axios.post(`${baseUrl}/storyComments`, values, {
        withCredentials: true
      }).then((res) => res.data.data.data),

      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['story', postId], exact: true});
      }
  }
  )} 