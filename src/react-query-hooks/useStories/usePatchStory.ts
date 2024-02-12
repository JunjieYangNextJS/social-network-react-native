import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';


export default function usePatchStory(storyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  values =>
    axios
      .patch(`${baseUrl}/stories/${storyId}`, values, {
        withCredentials: true,
 
      })
      .then(res => res.data),
    onSuccess: data => {
        queryClient.invalidateQueries({queryKey: ['story', storyId]});
      }
  }
    
  );
};


export function useUpdateOpenComments(storyId: string) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
          const token = await getItemAsync('token');
          return axios
          .patch(
            `${baseUrl}/stories/${storyId}/updateOpenComments`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
         
            }
          )
          .then((res) => res.data)
        }
        
        //   ???????
        // onSuccess: () => {
        //     // window.location.reload(false); ??
        //   },
    },
      
      
        
      
    );
  }