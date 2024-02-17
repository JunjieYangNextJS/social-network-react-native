import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { getItemAsync } from 'expo-secure-store';
import { Post, PostFilterAbout, SortByValue } from '../../../types';

export function useMyFollowingPeoplePosts () {
  
    return useQuery({queryKey: ['myFollowingPeoplePosts'], queryFn: async () => {
        const token = await getItemAsync("token");

        return axios.get(`${baseUrl}/users/getMyFollowingPeoplePosts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => res.data.data.data as Post[])
    }
        
          
    })
}
