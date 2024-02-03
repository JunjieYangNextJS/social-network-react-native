import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';

export default function usePatchPost(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  values =>
    axios
      .patch(`${baseUrl}/posts/${postId}`, values, {
        withCredentials: true,
 
      })
      .then(res => res.data.data),
    onSuccess: data => {
        queryClient.setQueryData(['post', postId], data);
      }
  }
    
  );
}

export function usePatchDraftToPost(postId: string) {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: values =>
    axios.patch(`${baseUrl}/posts/${postId}/update-draftToPost`, values, {
      withCredentials: true,
    
    })
  }
  );
}

export function usePatchPostVotes(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: {post: string, removeId: string, addId?: string}) => {
      const token = await getItemAsync("token");

      return axios
      .patch(`${baseUrl}/posts/update-postVotes`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.data.data)
    }
    ,
      
    onSuccess: data => {
          queryClient.setQueryData(['post', postId], data);
        }
      

      
  },
  
    
  
    // {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(["post", postId]);
    //   },
    // }
  );
}
