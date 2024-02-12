import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post, PostFilterAbout, SortByValue } from '../../../types';

export function useOtherUserPosts (id: string) {
  
    return useQuery({queryKey: ['otherUserPosts', id], queryFn: async () => {
        const token = await getItemAsync("token");

        return axios.get(`${baseUrl}/posts/poster/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => res.data.data.data as Post[])
    }
        
          
    })
}