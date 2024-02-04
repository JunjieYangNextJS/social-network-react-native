import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post } from '../../../types';

export default function useDraftPosts () {
  
    return useQuery({queryKey: ['draftPosts'], queryFn: async () => {
        const token = await getItemAsync("token");
        return  axios.get(`${baseUrl}/posts/draft`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }).then(res => res.data.data.data as Post[])
    }   
    })
}
