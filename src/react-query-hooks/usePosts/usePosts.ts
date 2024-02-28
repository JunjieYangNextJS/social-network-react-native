import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { About, Post, PostFilterAbout, SortByValue } from '../../../types';

export function usePosts (option: About ,sortByValue: SortByValue) {
  
    return useQuery({queryKey: ['posts', {sort: sortByValue, about: option}], queryFn: async () => {
        const token = await getItemAsync("token");

        return axios.get(`${baseUrl}/posts?about=${option}&sort=${sortByValue}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => res.data.data.data as Post[])
    }
        
          
    })
}
