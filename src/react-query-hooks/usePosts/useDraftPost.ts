import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default function useDraftPost(postId: string) {
  
    return useQuery({queryKey: ['draftPost', postId], queryFn: async () => (
        axios.get(`${baseUrl}/posts/draft/${postId}`, {
            withCredentials: true,
        
          }).then(res => res.data.data.data)
          
    ),
        enabled: !!postId       
    })
}
