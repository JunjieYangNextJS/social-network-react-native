import axios from 'axios';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import baseUrl from '../../utils/baseUrl';

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
        mutationFn: () =>
        axios
          .patch(
            `${baseUrl}/stories/${storyId}/updateOpenComments`,
            {},
            {
              withCredentials: true,
         
            }
          )
          .then((res) => res.data),
        //   ???????
        // onSuccess: () => {
        //     // window.location.reload(false); ??
        //   },
    },
      
      
        
      
    );
  }