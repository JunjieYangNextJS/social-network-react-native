import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post } from '../../../types';

export default function useDraftPost(postId: string) {
  
    return useQuery({queryKey: ['draftPost', postId], queryFn: async () => {
        const token = await getItemAsync("token");
        return  axios.get(`${baseUrl}/posts/draft/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        
          }).then(res => res.data.data.data as Post)
    },
        enabled: !!postId       
    })
}
