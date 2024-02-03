import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post } from '../../../types';

export default function usePost (postId: string) {
  
    return useQuery({queryKey: ['post', postId], queryFn: async () => 
    {
        const token = await getItemAsync("token");
        return axios.get(`${baseUrl}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        
          }).then(res => res.data.data.data as Post)
    }
        
          
    ,
        enabled: !!postId       
    })
}
