import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useDeletePost() {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (storyId: string) =>
      axios.delete(`${baseUrl}/stories/${storyId}`, {
        withCredentials: true
      }).then((res) => res.data.data.data),
    
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['stories'], exact: true})
        }
    
  }
   
  );
}